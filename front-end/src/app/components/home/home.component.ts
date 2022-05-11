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
  animationMovies: movie[] = [];
  adventureMovies: movie[] = [];
  warMovies: movie[] = [];
  biographyMovies: movie[] = [];
  sciFiMovies: movie[] = [];
  comedyMovies: movie[] = [];
  crimeMovies: movie[] = [];
  documentalMovies: movie[] = [];
  dramaMovies: movie[] = [];
  familyMovies: movie[] = [];
  fantasyMovies: movie[] = [];
  misteryMovies: movie[] = [];
  musicalMovies: movie[] = [];
  romanceMovies: movie[] = [];
  terrorMovies: movie[] = [];
  thrillerMovies: movie[] = [];

  destroyed = new ReplaySubject<void>(1);

  constructor(public moviesServices: MoviesService) { }

  ngOnInit(): void {
    this.moviesServices.getActionMovies();
    this.moviesServices.actionMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.actionMovies = movies;
    });
    this.moviesServices.getAnimationMovies();
    this.moviesServices.animationMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.animationMovies = movies;
    });
    this.moviesServices.getAdventureMovies();
    this.moviesServices.adventureMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.adventureMovies = movies;
    });
    this.moviesServices.getWarMovies();
    this.moviesServices.warMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.warMovies = movies;
    });
    this.moviesServices.getBiographyMovies();
    this.moviesServices.biographyMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.biographyMovies = movies;
    });
    this.moviesServices.getSciFiMovies();
    this.moviesServices.sciFiMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.sciFiMovies = movies;
    });
    this.moviesServices.getComedyMovies();
    this.moviesServices.comedyMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.comedyMovies = movies;
    });
    this.moviesServices.getCrimeMovies();
    this.moviesServices.crimeMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.crimeMovies = movies;
    });
    this.moviesServices.getDocumentalMovies();
    this.moviesServices.documentalMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.documentalMovies = movies;
    });
    this.moviesServices.getDramaMovies();
    this.moviesServices.dramaMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.dramaMovies = movies;
    });
    this.moviesServices.getFamilyMovies();
    this.moviesServices.familyMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.familyMovies = movies;
    });
    this.moviesServices.getFantasyMovies();
    this.moviesServices.fantasyMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.fantasyMovies = movies;
    });
    this.moviesServices.getMisteryMovies();
    this.moviesServices.misteryMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.misteryMovies = movies;
    });
    this.moviesServices.getMusicalMovies();
    this.moviesServices.musicalMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.musicalMovies = movies;
    });
    this.moviesServices.getRomanceMovies();
    this.moviesServices.romanceMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.romanceMovies = movies;
    });
    this.moviesServices.getTerrorMovies();
    this.moviesServices.terrorMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.terrorMovies = movies;
    });
    this.moviesServices.getThrillerMovies();
    this.moviesServices.thrillerMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.thrillerMovies = movies;
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
  
  onClickedAlert() {
    console.log('clicked');
  }

}
