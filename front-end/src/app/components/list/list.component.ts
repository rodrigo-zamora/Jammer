import { Component, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { movie } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../list.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  listItem: any;
  commentItems: any;

  destroyed = new ReplaySubject<void>(1);

  constructor(public lists: ListService, private router: Router, public comments: CommentService, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      var url = this.router.url;
      var uuid = url.split('/')[2];

      this.lists.getMoviesFromList(uuid);
      this.lists.listMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
        this.listItem = movies;
        console.log(this.listItem);
        console.log(this.listItem.length);
        for (let i = 0; i < this.listItem.length; i++) {
          console.log(this.listItem[i].uuid);
          this.comments.getComments(this.listItem[i].cuevanaUUID);
          this.comments.comments$.pipe(takeUntil(this.destroyed)).subscribe((comments) => {
            console.log(comments);
            this.commentItems = comments;
            console.log(this.commentItems);
          });
        }
      });
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  deleteFromList() {
    
  }

}
