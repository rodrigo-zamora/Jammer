import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'http://localhost:3000/auth/';
  //api = 'https://backend-jammer.herokuapp.com/auth/';

  authData$ = new Subject<any>();

  authData: any;

  constructor(public http: HttpClient) { }

  verifyLogin() {
    console.log('verifyLogin from service');
    this.http.get(this.api + 'verifyLogin', {
      withCredentials: true
    }).subscribe(
      (data: any) => {
        console.log('verifyLogin data: ', data);
        this.authData = data;
        this.authData$.next(this.authData);
      }
    );


    /*fetch('http://localhost:3000/auth/verifyLogin',  {credentials: 'include'})
    .then((response) => {
      console.log(response);
      if (response.status === 401) {
        console.log('not logged in');
        this.authData$.next(false);
      }
      else if (response.status === 200) {
        console.log('logged in');
      }
      else {
        console.log('unknown status');
        this.authData$.next(false);
      }
    }).catch((err) => {
      console.log(err);
    });*/
  }

  hasSubscription(): boolean {
    return false;
  }

}
