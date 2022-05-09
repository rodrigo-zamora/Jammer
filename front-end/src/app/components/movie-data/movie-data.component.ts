import { Component, Input, OnInit } from '@angular/core';
import { MoviesService, movie } from '../movies.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CommentService } from '../comment.service';
import { ListService } from '../list.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-movie-data',
  templateUrl: './movie-data.component.html',
  styleUrls: ['./movie-data.component.less']
})
export class MovieDataComponent implements OnInit {

  @Input() movie: movie | undefined;

  uLists: any;

  movies: any;
  comments: any;

  destroyed = new ReplaySubject<void>(1);

  constructor(public pelis: MoviesService, public commentService: CommentService, private router: Router, public lists: ListService, private authService: AuthService) { }

  addToList(listUUID : string, movieUUID : string | undefined) {
    let userUUID = this.authService.getUserUUID();
    this.lists.addMovieToList(listUUID, movieUUID, userUUID);
  }

  displayLists() {
    this.lists.getLists();
    this.lists.userLists$.pipe(takeUntil(this.destroyed)).subscribe((list) => {
      this.uLists = list.lists;
      this.uLists.splice(0, 1);
    });
  }

  ngOnInit(): void {

    var url = this.router.url;
    var uuid = url.split('/')[2];
    var name = url.split('/')[3];

    this.commentService.getComments(uuid + '/' + name);
    this.commentService.comments$.pipe(takeUntil(this.destroyed)).subscribe((comments) => {
      this.comments = comments;
      console.log(this.comments);
    });

    this.pelis.getMovieDetails(uuid + '/' + name);
    this.pelis.movieDetails$.pipe(takeUntil(this.destroyed)).subscribe((movie) => {
      console.log(movie[0]);
      this.movies = movie[0];
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getAuthorImage() {
    return this.authService.getUserImage();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getActors() {
    return this.movies.cast.map((actor: { name: any; }) => actor.name).join(', ');
  }

}
