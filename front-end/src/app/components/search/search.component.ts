import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { SearchService, movie } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchMovieTitle: movie[] = [];
  destroyed = new ReplaySubject<void>(1);
  //
  @Output() search: string | undefined;

  constructor(public pelis: SearchService) { }

  //movieName: string = '';

  ngOnInit(): void {
    // this.pelis.getSearchMovies(`${this.search}`); AQUI SE NECESITA OBTENER LOS DATOS DE LA BUSQUEDA
    this.pelis.getSearchMovies(`batman`);
    this.pelis.searchMovieTitle$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.searchMovieTitle = movies;
    });
    //console.log(this.movieName);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onClickedAlert() {
    console.log('clickeddddd');
  }

}
