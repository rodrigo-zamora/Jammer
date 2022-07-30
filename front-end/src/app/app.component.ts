import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor() {}

  title = 'front-end';

  ngOnInit(): void{
  }

  ngOnDestroy(): void {

  }
}
