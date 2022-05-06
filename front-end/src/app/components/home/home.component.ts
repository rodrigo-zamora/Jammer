import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MoviesService, movie } from '../movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  actionMovies: movie[] = [];
  destroyed = new ReplaySubject<void>(1);

  constructor(public pelis: MoviesService) {
    
  }

  ngOnInit(): void {
    this.pelis.getActionMovies();
    this.pelis.actionMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.actionMovies = movies;
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
