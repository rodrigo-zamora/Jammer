import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  // @Output() clicked = new EventEmitter();
  @Output() clicked = new EventEmitter<string>();

  constructor(private http: HttpClient, private router: Router) { }

  isLogged: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn();
  }

  searchMovies() {
    let name = (<HTMLInputElement>document.getElementById("search")).value;
    this.router.navigate(['/search/', name]);
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
