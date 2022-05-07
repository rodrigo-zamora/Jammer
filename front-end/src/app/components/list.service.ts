import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { MoviesService, movie } from './movies.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  listAPI = 'https://backend-jammer.herokuapp.com/lists/';
  movieAPI = 'https://backend-jammer.herokuapp.com/movies/';

  userLists$ = new Subject<any>();
  listMovies$ = new Subject<movie[]>();

  userLists: any;
  listMovies: movie[] = [];

  constructor(public movies: MoviesService, private http: HttpClient) { }

  getMoviesFromList(listUUID: string) {
    let userUUID = localStorage.getItem('UUID');
    let url = this.listAPI + 'list/' + listUUID + '/' + userUUID;
    this.http.get(url).subscribe(
      (data: any) => {
        console.log("data", data);
        for (let i = 0; i < data.movies.length; i++) {
          let movieUUID = data.movies[i]
          this.http.get(this.movieAPI + 'movie/' + movieUUID).subscribe(
            (data: any) => {
              this.listMovies.push(data);  
            });
        }
        this.listMovies$.next(this.listMovies);
      });
  }

  getLists() {
    let uuid = localStorage.getItem('UUID');
    if (uuid) {
      let url = this.listAPI + uuid;
      this.http.get(url).subscribe(
        (data: any) => {
          this.userLists = data;
          this.userLists$.next(this.userLists);
        });
    }
  }

  deleteList(listUUID: string) {
    let url = this.listAPI + 'list/' + listUUID;
    this.http.delete(url).subscribe(
      (data: any) => {
        this.getLists();
      }
    );
  }

}
