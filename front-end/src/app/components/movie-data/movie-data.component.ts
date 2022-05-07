import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-data',
  templateUrl: './movie-data.component.html',
  styleUrls: ['./movie-data.component.less']
})
export class MovieDataComponent implements OnInit {

  movies: any;

  destroyed = new ReplaySubject<void>(1);

  constructor(public pelis: MoviesService, private router: Router) { }

  ngOnInit(): void {
    var url = this.router.url;
    var uuid = url.split('/')[2];
    var name = url.split('/')[3];
    this.pelis.getMovieDetails(uuid + '/' + name);
    this.pelis.movieDetails$.pipe(takeUntil(this.destroyed)).subscribe((movie) => {
      this.movies = movie;
      console.log(this.movies);
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
