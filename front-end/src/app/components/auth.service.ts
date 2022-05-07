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

  /*verifyLogin() {
    let url = this.api + 'verifyLogin';
    console.log('Verifying login from service: ' + url + 'verifyLogin');
    this.http.get(url, { withCredentials: true }).subscribe(
      (data: any) => {
        console.log('Login verified from service');
        console.log(data);
        this.auth = data;
        this.authData$.next(this.auth);
      });
  }*/

  verifyLogin() {
    let uuid = localStorage.getItem('UUID');
    if (uuid) {
      return true;
    } else {
      return false;
    }
  }

}
