import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  //valor = (<HTMLInputElement>document.getElementById("searchInput")).value;
  // get value from input
  @Output() clicked = new EventEmitter();

  movieName: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    console.log(this.movieName);
    this.clicked.emit();
  }
}
