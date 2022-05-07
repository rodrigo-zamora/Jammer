import { Component, Input, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.less']
})
export class MyListComponent implements OnInit {

  list: any;
  sharedLists: any
  
  destroyed = new ReplaySubject<void>(1);

  constructor(public lists: ListService, private router: Router) { }

  ngOnInit(): void {
    this.lists.getLists();
    this.lists.userLists$.pipe(takeUntil(this.destroyed)).subscribe((list) => {
      this.list = list.lists;
      this.sharedLists = list.sharedLists;
      console.log(this.list);
      console.log(this.sharedLists);
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
