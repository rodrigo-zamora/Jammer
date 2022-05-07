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
      var comment = (<HTMLInputElement>document.getElementById("comment")).value;
      var url = this.router.url;
      var uuid = url.split('/')[2];
      var name = url.split('/')[3];
      var cuevanaUUID = uuid + '/' + name;
      this.comments.createComment(cuevanaUUID, comment);
    }
  }

}
