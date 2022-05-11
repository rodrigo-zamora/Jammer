import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { movie } from '../movies.service';
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

  constructor(public listService: ListService, private authService: AuthService) {

  }

  addToList(listUUID : string, movieUUID : string | undefined, cuevanaUUID : string | undefined) {
    let userUUID = this.authService.getUserUUID();
    if (movieUUID) {
      console.log('Adding movie with UUID ' + movieUUID + ' to list with UUID ' + listUUID + ' and user with UUID ' + userUUID);
      this.listService.addMovieToList(listUUID, movieUUID, userUUID);
    } else {
      console.log('Adding movie with Cuevana UUID ' + cuevanaUUID + ' to list with UUID ' + listUUID + ' and user with UUID ' + userUUID);
      this.listService.addMovieToList(listUUID, cuevanaUUID, userUUID);
    }
  }

  displayLists() {
    this.listService.getLists();
    this.listService.userLists$.pipe(takeUntil(this.destroyed)).subscribe((list) => {
      this.uLists = list.lists;
      this.uLists.forEach((item: any) => {
        if (item.name == 'Historial') {
          this.uLists.splice(this.uLists.indexOf(item), 1);
        }
      });
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
