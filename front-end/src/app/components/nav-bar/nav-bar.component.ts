import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  isLogged: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn();
  }

  onClick() {
    console.log(this.movieName);
    this.clicked.emit();
  }

  login() {
    window.location.replace('https://backend-jammer.herokuapp.com/auth/google/login');
  }

  isLoggedIn() {
    this.http.get('https://backend-jammer.herokuapp.com/auth/verifyLogin').subscribe(
      (data: any) => {
        if (data.status == 401) {
          this.isLogged = false;
        } else {
          this.isLogged = true;
        }
      }
    );
  }

}
