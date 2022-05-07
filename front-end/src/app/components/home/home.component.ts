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

  constructor(public pelis: MoviesService) { }

  ngOnInit(): void {
    this.pelis.getActionMovies();
    this.pelis.actionMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.actionMovies = movies;
    });
    this.pelis.getAnimationMovies();
    this.pelis.animationMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.animationMovies = movies;
    });
    this.pelis.getAdventureMovies();
    this.pelis.adventureMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.adventureMovies = movies;
    });
    this.pelis.getWarMovies();
    this.pelis.warMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.warMovies = movies;
    });
    this.pelis.getBiographyMovies();
    this.pelis.biographyMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.biographyMovies = movies;
    });
    this.pelis.getSciFiMovies();
    this.pelis.sciFiMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.sciFiMovies = movies;
    });
    this.pelis.getComedyMovies();
    this.pelis.comedyMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.comedyMovies = movies;
    });
    this.pelis.getCrimeMovies();
    this.pelis.crimeMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.crimeMovies = movies;
    });
    this.pelis.getDocumentalMovies();
    this.pelis.documentalMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.documentalMovies = movies;
    });
    this.pelis.getDramaMovies();
    this.pelis.dramaMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.dramaMovies = movies;
    });
    this.pelis.getFamilyMovies();
    this.pelis.familyMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.familyMovies = movies;
    });
    this.pelis.getFantasyMovies();
    this.pelis.fantasyMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.fantasyMovies = movies;
    });
    this.pelis.getMisteryMovies();
    this.pelis.misteryMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.misteryMovies = movies;
    });
    this.pelis.getMusicalMovies();
    this.pelis.musicalMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.musicalMovies = movies;
    });
    this.pelis.getRomanceMovies();
    this.pelis.romanceMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.romanceMovies = movies;
    });
    this.pelis.getTerrorMovies();
    this.pelis.terrorMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.terrorMovies = movies;
    });
    this.pelis.getThrillerMovies();
    this.pelis.thrillerMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
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
