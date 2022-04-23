import { Component, OnInit } from '@angular/core';
import { GlobalThemeComponent } from '../global-theme/global-theme.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
