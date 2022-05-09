import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'http://localhost:3000/auth/';
  //api = 'https://backend-jammer.herokuapp.com/auth/';

  authData$ = new Subject<any>();

  authData: any;

  constructor(public http: HttpClient) {
  }

  verifyLogin() {
    this.http.get(this.api + 'verifyLogin', {
      withCredentials: true
    }).subscribe(
      (data: any) => {
        this.authData = data;
        this.authData$.next(this.authData);
      }
    );
  }

  getUserUUID() {
    return this.authData.UUID;
  }

  hasSubscription(): boolean {
    if (this.authData.subscription == null) {
      return false;
    } else {
      return true;
    }
  }

  getUserFullName() {
    return this.authData.firstName + ' ' + this.authData.lastName;
  }
  
  getUserImage() {
    return this.authData.imageURL;
  }

  isLoggedIn() {
    if (this.authData == null) {
      console.log('Not logged in');
      return false;
    } else {
      console.log('Logged in');
      return true;
    }
  }
}
