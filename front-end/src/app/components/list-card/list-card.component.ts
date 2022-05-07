import { Component, Input, OnInit } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.less']
})
export class ListCardComponent implements OnInit {

  @Input() list: any;

  constructor(public lists: ListService) { }

  ngOnInit(): void {
  }

  deleteList(listUUID: string) {
    this.lists.deleteList(listUUID);
  }

}
