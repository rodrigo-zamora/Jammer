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

  movieCount = 5;
  api = 'https://backend-jammer.herokuapp.com/movies/search?';

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

  constructor(private http: HttpClient) {

  }

  toFilm(data: any): movie {
    return {
      title: data.title,
      year: data.year,
      cuevanaUUID: data.cuevanaUUID,
      poster: data.poster,
      rating: data.rating,
      duration: data.duration
    };
  }

  getActionMovies() {
    this.http.get(this.api + 'genre=0')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.action.push(film);
        }
        this.actionMovies$.next(this.action);
      });
  }

  getAnimationMovies() {
    this.http.get(this.api + 'genre=1')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.animation.push(film);
        }
        this.animationMovies$.next(this.animation);
      });
  }

  getAdventureMovies() {
    this.http.get(this.api + 'genre=2')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.adventure.push(film);
        }
        this.adventureMovies$.next(this.adventure);
      });
  }

  getWarMovies() {
    this.http.get(this.api + 'genre=3')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.war.push(film);
        }
        this.warMovies$.next(this.war);
      });
  }

  getBiographyMovies() {
    this.http.get(this.api + 'genre=4')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.biography.push(film);
        }
        this.biographyMovies$.next(this.biography);
      });
  }

  getSciFiMovies() {
    this.http.get(this.api + 'genre=5')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.sciFi.push(film);
        }
        this.sciFiMovies$.next(this.sciFi);
      });
  }

  getComedyMovies() {
    this.http.get(this.api + 'genre=6')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.comedy.push(film);
        }
        this.comedyMovies$.next(this.comedy);
      });
  }

  getCrimeMovies() {
    this.http.get(this.api + 'genre=7')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.crime.push(film);
        }
        this.crimeMovies$.next(this.crime);
      });
  }

  getDocumentalMovies() {
    this.http.get(this.api + 'genre=8')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.documental.push(film);
        }
        this.documentalMovies$.next(this.documental);
      });
  }

  getDramaMovies() {
    this.http.get(this.api + 'genre=9')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.drama.push(film);
        }
        this.dramaMovies$.next(this.drama);
      });
  }

  getFamilyMovies() {
    this.http.get(this.api + 'genre=10')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.family.push(film);
        }
        this.familyMovies$.next(this.family);
      });
  }

  getFantasyMovies() {
    this.http.get(this.api + 'genre=11')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.fantasy.push(film);
        }
        this.fantasyMovies$.next(this.fantasy);
      });
  }

  getMisteryMovies() {
    this.http.get(this.api + 'genre=12')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.mistery.push(film);
        }
        this.misteryMovies$.next(this.mistery);
      });
  }

  getMusicalMovies() {
    this.http.get(this.api + 'genre=13')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.musical.push(film);
        }
        this.musicalMovies$.next(this.musical);
      });
  }

  getRomanceMovies() {
    this.http.get(this.api + 'genre=14')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.romance.push(film);
        }
        this.romanceMovies$.next(this.romance);
      });
  }

  getTerrorMovies() {
    this.http.get(this.api + 'genre=15')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.terror.push(film);
        }
        this.terrorMovies$.next(this.terror);
      });
  }

  getThrillerMovies() {
    this.http.get(this.api + 'genre=16')
      .subscribe((data: any) => {
        for (let i = 0; i < this.movieCount; i++) {
          const film = this.toFilm(data[i]);
          this.thriller.push(film);
        }
        this.thrillerMovies$.next(this.thriller);
      });
  }
}
