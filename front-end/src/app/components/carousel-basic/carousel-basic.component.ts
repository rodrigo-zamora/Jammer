import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.less']
})
export class CarouselBasicComponent implements OnInit {

  constructor() { }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  ngOnInit(): void {
  }

}

//@Component({selector: 'ngbd-carousel-basic', templateUrl: './carousel-basic.html'})
//export class NgbdCarouselBasic {
