import { Component, Input, OnInit , Inject} from '@angular/core';
import { ListService } from '../list.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';

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

  constructor(public lists: ListService, private router: Router, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '550px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit(): void {
    this.lists.getLists();
    this.lists.userLists$.pipe(takeUntil(this.destroyed)).subscribe((list) => {
      this.list = list.lists;
      this.sharedLists = list.sharedLists;
      console.log(this.list);
      console.log(this.sharedLists);
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
