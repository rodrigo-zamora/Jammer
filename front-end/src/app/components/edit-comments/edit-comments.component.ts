import { Component, OnInit, Inject } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { CommentService } from '../comment.service';
import { ListService } from '../list.service';
import { MovieDataComponent } from '../movie-data/movie-data.component';

export interface DialogData {
  UUID: string;
}

@Component({
  selector: 'app-edit-comments',
  templateUrl: './edit-comments.component.html',
  styleUrls: ['./edit-comments.component.less']
})

export class EditCommentsComponent implements OnInit {

    constructor(
      public dialogRef: MatDialogRef<EditCommentsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private snackbar: MatSnackBar,
      private commentsService: CommentService
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    ngOnInit(): void {
    }
  
    editComment(commentUUID: string) {
      let comment =(<HTMLInputElement>document.getElementById("newComment")).value;
      if (!comment) {
        this.snackbar.open('Por favor ingrese un comentario', '', {
          duration: 3000
        });
      } else {
        this.commentsService.updateComment(commentUUID, comment);
        this.dialogRef.close();
        this.snackbar.open('Comentario actualizado', '', {
          duration: 3000
        });
      }
    }
  
  }
