import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  api = 'https://backend-jammer.herokuapp.com/lists/';

  userLists$ = new Subject<any>();

  userLists: any;

  constructor(private http: HttpClient) { }

  getLists() {
    let uuid = localStorage.getItem('UUID');
    if (uuid) {
      let url = this.api + uuid;
      this.http.get(url).subscribe(
        (data: any) => {
          this.userLists = data;
          this.userLists$.next(this.userLists);
        });
    }
  }
}
