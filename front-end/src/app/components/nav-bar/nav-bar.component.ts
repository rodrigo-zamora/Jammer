import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/components/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  @Output() clicked = new EventEmitter<string>();

  constructor(public auth: AuthService, private http: HttpClient, private router: Router) { }

  isLogged: any;
  
  destroyed = new ReplaySubject<void>(1);

  ngOnInit(): void {
    this.auth.verifyLogin();
    this.auth.authData$.pipe(takeUntil(this.destroyed)).subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }

  searchMovies() {
    let name = (<HTMLInputElement>document.getElementById("search")).value;
    this.router.navigate(['/search/', name]);
  }
 
  login() {
    window.location.replace('http://localhost:3000/auth/google/login');
  }

  logout() {
    this.auth.logout();
  }
}
