import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

export interface movie {
  title: string;
  year: number;
  cuevanaUUID: string;
  poster: string;
  rating: number;
  duration: string;
}
@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  moviesParsed$ = new Subject<movie[]>();
  actionMovies$ = new Subject<movie[]>();

  action: movie[] = [];

  //animacion = 'https://backend-jammer.herokuapp.com/movies/search?genre=1';

  constructor(private http: HttpClient) { 

  }

  getActionMovies() {
    this.http.get('https://backend-jammer.herokuapp.com/movies/search?genre=0')
    .subscribe((data: any) => {
      //console.log(data[0].title);
      for(let i = 0; i < data.length; i++) {
        const film: movie = {
          title: data[i].title,
          year: data[i].year,
          cuevanaUUID: data[i].cuevanaUUID,
          poster: data[i].poster,
          rating: data[i].rating,
          duration: data[i].duration
        };
        this.action.push(film);
      }
      this.actionMovies$.next(this.action);
    }
  );
  }

  getMovies() {
    return this.action;
  }
}
