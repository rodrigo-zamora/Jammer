import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/components/comment.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {

  comment: any;

  constructor(public comments: CommentService, private router: Router) { }

  ngOnInit(): void {
  }

  saveComment(type: string) {
    if (type == 'detail') {
      let comment = (<HTMLInputElement>document.getElementById("comment"));
      let commentValue = comment.value;
      comment.value = '';

      let url = this.router.url;
      let uuid = url.split('/')[2];
      let name = url.split('/')[3];
      let cuevanaUUID = uuid + '/' + name;
      this.comments.createComment(cuevanaUUID, commentValue);
    }
  }

}
