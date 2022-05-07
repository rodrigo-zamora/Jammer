import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { movie } from '../movies.service';
import { Router } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  listItem: movie[] = [];

  destroyed = new ReplaySubject<void>(1);

  constructor(public lists: ListService, private router: Router) { }

  ngOnInit(): void {
    var url = this.router.url;
    var uuid = url.split('/')[2];
    this.lists.getMoviesFromList(uuid);
    this.lists.listMovies$.pipe(takeUntil(this.destroyed)).subscribe((movies) => {
      this.listItem = movies;
      console.log(this.listItem);
    });
  }

  saveComment() {
    // post a la seccion de comentarios del usuario
  }
}
