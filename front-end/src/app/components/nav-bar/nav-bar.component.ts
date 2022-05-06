import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  // @Output() clicked = new EventEmitter();
  @Output() clicked = new EventEmitter<string>();

  movieName: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    //console.log(this.movieName);
    this.clicked.emit(this.movieName);
  }
}
