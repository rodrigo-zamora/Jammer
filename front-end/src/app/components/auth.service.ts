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
  }

  getUserUUID() {
    return this.authData.UUID;
  }

  hasSubscription() {
    console.log('hasSubscription from service', this.authData.subscription);
    if (this.authData.subscription == null) {
      return false;
    } else {
      return true;
    }
  }
}
