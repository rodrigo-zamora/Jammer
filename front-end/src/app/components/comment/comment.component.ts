import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from 'src/app/components/comment.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {

  comment: any;

  constructor(private snackbar: MatSnackBar, public comments: CommentService, private router: Router, private readonly socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.getNewComment().subscribe(comment => {
      let url = this.router.url;
      let uuid = url.split('/')[2];
      let name = url.split('/')[3];
      let cuevanaUUID = uuid + '/' + name;
      this.comments.getComments(cuevanaUUID);
    });
  }

  saveComment(type: string) {
    let comment = (<HTMLTextAreaElement>document.getElementById('comment')).value;

    if (!comment) {
      this.snackbar.open('Por favor ingrese un comentario', '', {
        duration: 3000
      });
    } else {
      if (type == 'detail') {
        let comment = (<HTMLInputElement>document.getElementById("comment"));
        let commentValue = comment.value;
        comment.value = '';

        let url = this.router.url;
        let uuid = url.split('/')[2];
        let name = url.split('/')[3];
        let cuevanaUUID = uuid + '/' + name;
        this.socketService.sendNewComment(commentValue);
        this.comments.createComment(cuevanaUUID, commentValue);
      }
    }
  }
}
