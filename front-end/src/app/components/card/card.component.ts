import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MoviesService, movie } from '../movies.service';
import { Router } from '@angular/router';
import { ListService } from '../list.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-card', // Etiqueta html del componente
  templateUrl: './card.component.html', // ruta relativa donde está el html del componente
  styleUrls: ['./card.component.less'] // ruta relativa donde esta el css del componente
})

export class CardComponent implements OnInit {

  @Input() movie: movie | undefined;

  uLists: any;

  destroyed = new ReplaySubject<void>(1);

  constructor(public lists: ListService, private authService: AuthService) {

  }

  addToList(listUUID : string, movieUUID : string | undefined) {
    let userUUID = this.authService.getUserUUID();
    console.log('Adding movie with UUID ' + movieUUID + ' to list with UUID ' + listUUID + ' and user with UUID ' + userUUID);
    this.lists.addMovieToList(listUUID, movieUUID, userUUID);
  }

  displayLists() {
    this.lists.getLists();
    this.lists.userLists$.pipe(takeUntil(this.destroyed)).subscribe((list) => {
      this.uLists = list.lists;
      this.uLists.splice(0, 1);
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
