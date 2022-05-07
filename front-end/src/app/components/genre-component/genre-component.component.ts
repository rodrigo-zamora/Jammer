import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre-component',
  templateUrl: './genre-component.component.html',
  styleUrls: ['./genre-component.component.less']
})
export class GenreComponentComponent implements OnInit {

  @Input() genre: string | undefined;

  constructor() {
    
  }

  ngOnInit(): void {
  }
}
