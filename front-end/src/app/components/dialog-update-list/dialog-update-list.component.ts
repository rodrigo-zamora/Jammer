import { Component, OnInit, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { ListService } from '../list.service';

export interface DialogData {
  listName: string;
  email: string;
  isPrivate: boolean;
  UUID: string;
  nameList: string;
}

@Component({
  selector: 'app-dialog-update-list',
  templateUrl: './dialog-update-list.component.html',
  styleUrls: ['./dialog-update-list.component.less']
})
export class DialogUpdateListComponent implements OnInit {

  isPrivate = true;
  isHidden = true;
  image: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public lists: ListService,
    private snackbar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(event: MatCheckboxChange) {
    this.isPrivate = event.checked;
  }

  toggle(){
    this.isHidden=!this.isHidden;
    let emails = document.getElementById("emails");
    if (emails) emails.hidden = this.isHidden;
  }

  uploadImage() {

  }

  ngOnInit(): void {
  }

  update(listUUID: string, isPrivate: boolean) {
    let nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
    if (!nombre) {
      this.snackbar.open('Por favor, ingresa un nombre para la lista', '', {
        duration: 3000
      });
    } else {
      this.dialogRef.close();
      let listBody = {
        name: nombre,
        isPrivate: isPrivate,
        imageURL: this.image
      }
      this.lists.updateList(listUUID, listBody);
    }
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }

}
