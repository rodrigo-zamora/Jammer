import { Component, OnInit, Inject } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ListService } from '../list.service';

export interface DialogData {
  listName: string;
  email: string[];
  isPrivate: boolean;
}

@Component({
  selector: 'app- dialog-create-list',
  templateUrl: './dialog-create-list.component.html',
  styleUrls: ['./dialog-create-list.component.less']
})
export class DialogCreateListComponent implements OnInit {

  isPrivate = true;
  isHidden = true;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateListComponent>,
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

  onChange(event: MatCheckboxChange) {
    this.isPrivate = event.checked;
  }

  toggle(){
    this.isHidden=!this.isHidden;
    let emails = document.getElementById("emails");
    if (emails) emails.hidden = this.isHidden;
  }

  create(listName: string, emails: string[]) {
    let userUUID = this.authService.getUserUUID();
    this.lists.createList(listName, this.isPrivate, userUUID);
  }

}
