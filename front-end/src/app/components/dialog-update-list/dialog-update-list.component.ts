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
  selector: 'app-dialog-update-list',
  templateUrl: './dialog-update-list.component.html',
  styleUrls: ['./dialog-update-list.component.less']
})
export class DialogUpdateListComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateListComponent>,
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

  update(listName: string, isPrivate: boolean) {
    let userUUID = this.authService.getUserUUID();
  }

}
