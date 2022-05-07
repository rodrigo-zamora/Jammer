import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/components/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  @Output() clicked = new EventEmitter<string>();

  constructor(public auth: AuthService, private http: HttpClient, private router: Router) { }

  isLogged: boolean = false;

  ngOnInit(): void {
    this.isLogged = this.auth.verifyLogin();
    console.log(this.isLogged);
    /*this.auth.verifyLogin();
    this.auth.authData$.subscribe((data) => {
      console.log(data);
      if (data.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });*/
  }

  searchMovies() {
    let name = (<HTMLInputElement>document.getElementById("search")).value;
    this.router.navigate(['/search/', name]);
  }
 
  login() {
    window.location.replace('https://backend-jammer.herokuapp.com/auth/google/login');
  }

}
