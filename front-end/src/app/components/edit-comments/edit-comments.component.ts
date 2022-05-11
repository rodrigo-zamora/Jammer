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
  selector: 'app-edit-comments',
  templateUrl: './edit-comments.component.html',
  styleUrls: ['./edit-comments.component.less']
})

export class EditCommentsComponent implements OnInit {

    isPrivate = true;
    isHidden = true;
    image: any;
  
    constructor(
      public dialogRef: MatDialogRef<EditCommentsComponent>,
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
      console.log(this.image);
      this.lists.createList(listName, this.isPrivate, userUUID, this.image);
    }
  
    onFileChange(event: any) {
      this.image = event.target.files[0];
      console.log('file added');
    }
  
  }
