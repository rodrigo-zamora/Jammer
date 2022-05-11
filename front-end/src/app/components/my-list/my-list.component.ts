import { Component, Input, OnInit , Inject} from '@angular/core';
import { ListService } from '../list.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.less']
})
export class MyListComponent implements OnInit {

  animal: string | undefined;
  name: string | undefined;

  list: any;
  sharedLists: any
  
  destroyed = new ReplaySubject<void>(1);

  constructor(private snackbbar: MatSnackBar, public lists: ListService, private router: Router, public dialog: MatDialog, private authService: AuthService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.lists.getLists();
      this.lists.userLists$.pipe(takeUntil(this.destroyed)).subscribe((list) => {
        console.log(list)
        this.list = list.lists;
        this.sharedLists = list.sharedLists;
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '550px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  ngOnInit(): void {
    this.authService.verifyLogin();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  createList(listName: string, isPrivate: boolean) {
    let userUUID = this.authService.getUserUUID();
    this.lists.createList(listName, isPrivate, userUUID);
  }

  canSeeLists(): boolean {
    return this.authService.hasSubscription();
  }

}
