import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ListService } from '../list.service';

export interface DialogData {
  listName: string;
  email: string;
  isPrivate: boolean;
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.less']
})
export class DialogOverviewExampleDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public lists: ListService,
    private authService: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadImage() {

  }

  ngOnInit(): void {
  }

  create(listName: string, isPrivate: boolean) {
    let userUUID = this.authService.getUserUUID();
    console.log('userUUID: ', userUUID);
    this.lists.createList(listName, isPrivate, userUUID);
  }

}
