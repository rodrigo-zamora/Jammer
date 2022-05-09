import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { SearchService } from '../search.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(public pelis: SearchService, private router: Router, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.searchMovieTitle = [];
      var url = this.router.url;
      var query = url.split('/')[2];
      this.pelis.getSearchMovies(query);
      this.pelis.searchMovieTitle$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
        this.searchMovieTitle = movies;
        console.log(this.searchMovieTitle);
      });
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
