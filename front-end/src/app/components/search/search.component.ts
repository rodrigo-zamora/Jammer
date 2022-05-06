import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { movie } from '../movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchMovieTitle: movie[] = [];
  destroyed = new ReplaySubject<void>(1);

  movies: movie[] = [];

  constructor(public pelis: SearchService, private router: Router) { }

  ngOnInit(): void {
    var url = this.router.url;
    var query = url.split('/')[2];
    this.pelis.getSearchMovies(query);
    this.pelis.searchMovieTitle$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.searchMovieTitle = movies;
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
