import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://backend-jammer.herokuapp.com/auth/';

  authData$ = new Subject<any>();

  auth: any;

  constructor(public http: HttpClient) { }

  verifyLogin() {
    console.log('Verifying login from service: ' + this.api + 'verifyLogin'); 
    this.http.get(this.api + 'verifyLogin', { withCredentials: true }).subscribe(
      (data: any) => {
        console.log('Login verified from service');
        this.auth = data;
        this.authData$.next(this.auth);
      });
  }
}
