import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.less']
})
export class ListCardComponent implements OnInit {

  @Input() list: any;

  constructor() { }

  ngOnInit(): void {
  }

}
