import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface movie {
  UUID: string;
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

export class SearchService {

  moviesParsed$ = new Subject<movie[]>();
  searchMovieTitle$ = new Subject<movie[]>();
  searchMovieGenre$ = new Subject<movie[]>();

  searchTitle: movie[] = [];
  searchGenre: movie[] = [];

  constructor(private http: HttpClient) { 

  }

  getSearchMovies( search: string ) {
    //this.http.get(`https://backend-jammer.herokuapp.com/movies/search?title=${search}`)
    this.http.get(`http://localhost:3000/movies/search?title=${search}`)
      .subscribe((data: any) => {
        this.searchTitle = [];
        for(let i = 0; i < data.length; i++) {
          const film: movie = {
            UUID: data[i].UUID,
            title: data[i].title,
            year: data[i].year,
            cuevanaUUID: data[i].id,
            poster: data[i].poster,
            rating: data[i].rating,
            duration: data[i].duration
          };
          this.searchTitle.push(film);
        }
        this.searchMovieTitle$.next(this.searchTitle);
      }
    );
  }

  getSearchGenres( genre: string ) {
    //this.http.get(`https://backend-jammer.herokuapp.com/movies/search?genre=${genre}`)
    this.http.get(`http://localhost:3000/movies/search?genre=${genre}`)
      .subscribe((data: any) => {
        for(let i = 0; i < data.length; i++) {
          const film: movie = {
            UUID: data[i].UUID,
            title: data[i].title,
            year: data[i].year,
            cuevanaUUID: data[i].cuevanaUUID,
            poster: data[i].poster,
            rating: data[i].rating,
            duration: data[i].duration
          };
          this.searchGenre.push(film);
        }
        this.searchMovieGenre$.next(this.searchGenre);
      }
    );
  }
}
