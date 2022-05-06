import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  // get value from input
  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    //console.log('clicked');
    this.clicked.emit();
  }
}
