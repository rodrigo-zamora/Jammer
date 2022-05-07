import { Component, Input, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';


@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.less']
})
export class ListCardComponent implements OnInit {

  @Input() list: any;

  constructor(public lists: ListService, public dialog: MatDialog) { }

  animal: string | undefined;
  name: string | undefined;

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
  }

  deleteList(listUUID: string) {
    this.lists.deleteList(listUUID);
  }

}
