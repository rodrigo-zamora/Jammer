import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { MoviesService, movie } from './movies.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ListService {

  //listAPI = 'https://backend-jammer.herokuapp.com/lists/';
  //movieAPI = 'https://backend-jammer.herokuapp.com/movies/';

  listAPI = 'http://localhost:3000/lists/';
  movieAPI = 'http://localhost:3000/movies/';

  userLists$ = new Subject<any>();
  listMovies$ = new Subject<movie[]>();

  userLists: any;
  listMovies: movie[] = [];

  constructor(public movies: MoviesService, private http: HttpClient, private authService: AuthService) { }

  getMoviesFromList(listUUID: string) {
    let userUUID = this.authService.getUserUUID();
    let url = this.listAPI + 'list/' + listUUID + '/' + userUUID;
    this.listMovies = [];
    this.http.get(url).subscribe(
      (data: any) => {
        for (let i = 0; i < data.movies.length; i++) {
          let movieUUID = data.movies[i];
          this.http.get(this.movieAPI + 'movie/' + movieUUID).subscribe(
            (data2: any) => {
              this.listMovies.push(data2);  
            });
          }
        this.listMovies$.next(this.listMovies);
      });
  }

  getLists() {
    let uuid = this.authService.getUserUUID();
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

  createList(listName: string, isPrivate: boolean, userUUID: string | null) {
    console.log('Creating list with name: ' + listName + ' and isPrivate: ' + isPrivate);
    let listBody = {
      name: listName,
      isPrivate: isPrivate
    };
    this.http.post(this.listAPI + userUUID, listBody).subscribe(
      (data: any) => {
        console.log('List created with UUID: ' + data.UUID);
        this.getLists();
      }
    );
  }

  addMovieToList(listUUID: string, movieUUID: string | undefined, userUUID: string | null) {
    console.log('[SERVICE] Adding movie with UUID: ' + movieUUID + ' to list with UUID: ' + listUUID);
    console.log('[SERVICE] Movie UUID: ' + movieUUID);
    this.http.put(this.listAPI + 'list/' + listUUID, {movies: [movieUUID]}).subscribe(
      (data: any) => {
        console.log('Movie added to list: ' + data);
      });
  }

  removeMovieFromList(listUUID: string, movieUUID: string | undefined, userUUID: string | null) {
    console.log('[SERVICE] Removing movie with UUID: ' + movieUUID + ' from list with UUID: ' + listUUID);
    console.log('[SERVICE] Movie UUID: ' + movieUUID);
    this.http.put(this.listAPI + 'list/' + listUUID, {movies: [movieUUID]}).subscribe(
      (data: any) => {
        console.log('Movie removed from list: ' + data);
      });
    }
}
