import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

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

export class MoviesService {

  movieCount = 10;
  api = 'https://backend-jammer.herokuapp.com/movies/';
  commentsAPI = 'https://backend-jammer.herokuapp.com/comments/';

  actionMovies$ = new Subject<movie[]>();
  animationMovies$ = new Subject<movie[]>();
  adventureMovies$ = new Subject<movie[]>();
  warMovies$ = new Subject<movie[]>();
  biographyMovies$ = new Subject<movie[]>();
  sciFiMovies$ = new Subject<movie[]>();
  comedyMovies$ = new Subject<movie[]>();
  crimeMovies$ = new Subject<movie[]>();
  documentalMovies$ = new Subject<movie[]>();
  dramaMovies$ = new Subject<movie[]>();
  familyMovies$ = new Subject<movie[]>();
  fantasyMovies$ = new Subject<movie[]>();
  misteryMovies$ = new Subject<movie[]>();
  musicalMovies$ = new Subject<movie[]>();
  romanceMovies$ = new Subject<movie[]>();
  terrorMovies$ = new Subject<movie[]>();
  thrillerMovies$ = new Subject<movie[]>();
  movieDetails$ = new Subject<any>();
  searchMovies$ = new Subject<movie[]>();
  movieComments$ = new Subject<any>();

  action: movie[] = [];
  animation: movie[] = [];
  adventure: movie[] = [];
  war: movie[] = [];
  biography: movie[] = [];
  sciFi: movie[] = [];
  comedy: movie[] = [];
  crime: movie[] = [];
  documental: movie[] = [];
  drama: movie[] = [];
  family: movie[] = [];
  fantasy: movie[] = [];
  mistery: movie[] = [];
  musical: movie[] = [];
  romance: movie[] = [];
  terror: movie[] = [];
  thriller: movie[] = [];
  movieDetails: any;
  searchMovies: movie[] = [];
  movieComments: any;

  constructor(private http: HttpClient) {

  }

  getMovieComments(cuevanaUUID: string) {
    this.http.get(this.commentsAPI + cuevanaUUID)
      .subscribe((data: any) => {
        this.movieComments = data;
        this.movieComments$.next(this.movieComments);
      });
  }

  getSearchMovies(search: string) {
    this.http.get(this.api + 'search?title=' + search)
      .subscribe((data: any) => {
        this.searchMovies = data.movies;
        this.searchMovies$.next(this.searchMovies);
      });
  }

  getMovieDetails(uuid: string) {
    this.http.get(this.api + 'details/' + uuid)
      .subscribe((data: any) => {
        this.movieDetails = data;
        this.movieDetails$.next(this.movieDetails);
      });
  }

  toFilm(data: any): movie {
    return {
      UUID: data.UUID,
      title: data.title,
      year: data.year,
      cuevanaUUID: data.cuevanaUUID,
      poster: data.poster,
      rating: data.rating,
      duration: data.duration
    };
  }

  getActionMovies() {
    this.action = [];
    this.http.get(this.api + 'search?genre=0')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.action.push(film);
        }
        this.actionMovies$.next(this.action);
      });
  }

  getAnimationMovies() {
    this.animation = [];
    this.http.get(this.api + 'search?genre=1')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.animation.push(film);
        }
        this.animationMovies$.next(this.animation);
      });
  }

  getAdventureMovies() {
    this.adventure = [];
    this.http.get(this.api + 'search?genre=2')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.adventure.push(film);
        }
        this.adventureMovies$.next(this.adventure);
      });
  }

  getWarMovies() {
    this.war = [];
    this.http.get(this.api + 'search?genre=3')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.war.push(film);
        }
        this.warMovies$.next(this.war);
      });
  }

  getBiographyMovies() {
    this.biography = [];
    this.http.get(this.api + 'search?genre=4')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.biography.push(film);
        }
        this.biographyMovies$.next(this.biography);
      });
  }

  getSciFiMovies() {
    this.sciFi = [];
    this.http.get(this.api + 'search?genre=5')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.sciFi.push(film);
        }
        this.sciFiMovies$.next(this.sciFi);
      });
  }

  getComedyMovies() {
    this.comedy = [];
    this.http.get(this.api + 'search?genre=6')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.comedy.push(film);
        }
        this.comedyMovies$.next(this.comedy);
      });
  }

  getCrimeMovies() {
    this.crime = [];
    this.http.get(this.api + 'search?genre=7')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.crime.push(film);
        }
        this.crimeMovies$.next(this.crime);
      });
  }

  getDocumentalMovies() {
    this.documental = [];
    this.http.get(this.api + 'search?genre=8')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.documental.push(film);
        }
        this.documentalMovies$.next(this.documental);
      });
  }

  getDramaMovies() {
    this.drama = [];
    this.http.get(this.api + 'search?genre=9')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.drama.push(film);
        }
        this.dramaMovies$.next(this.drama);
      });
  }

  getFamilyMovies() {
    this.family = [];
    this.http.get(this.api + 'search?genre=10')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.family.push(film);
        }
        this.familyMovies$.next(this.family);
      });
  }

  getFantasyMovies() {
    this.fantasy = [];
    this.http.get(this.api + 'search?genre=11')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.fantasy.push(film);
        }
        this.fantasyMovies$.next(this.fantasy);
      });
  }

  getMisteryMovies() {
    this.mistery = [];
    this.http.get(this.api + 'search?genre=12')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.mistery.push(film);
        }
        this.misteryMovies$.next(this.mistery);
      });
  }

  getMusicalMovies() {
    this.musical = [];
    this.http.get(this.api + 'search?genre=13')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.musical.push(film);
        }
        this.musicalMovies$.next(this.musical);
      });
  }

  getRomanceMovies() {
    this.romance = [];
    this.http.get(this.api + 'search?genre=14')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.romance.push(film);
        }
        this.romanceMovies$.next(this.romance);
      });
  }

  getTerrorMovies() {
    this.terror = [];
    this.http.get(this.api + 'search?genre=15')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.terror.push(film);
        }
        this.terrorMovies$.next(this.terror);
      });
  }

  getThrillerMovies() {
    this.thriller = [];
    this.http.get(this.api + 'search?genre=16')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.thriller.push(film);
        }
        this.thrillerMovies$.next(this.thriller);
      });
  }
}
