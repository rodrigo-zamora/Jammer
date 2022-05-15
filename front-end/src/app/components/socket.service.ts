import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('https://backend-jammer.herokuapp.com');
  }

  sendNewComment(comment: string) {
    this.socket.emit('newComment', comment);
  }

  getNewComment() {
    return new Observable<string>(observer => {
      this.socket.on('newComment', (comment) => {
        observer.next(comment);
      });
    });
  }
}
