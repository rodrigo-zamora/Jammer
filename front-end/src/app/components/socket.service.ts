import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMovieComment(message: string) {
    this.socket.emit('movieComment', message);
  }

  getMovieComments() {
    return new Observable<string>(observer => {
      this.socket.on('movieComment', (comment: string) => {
        observer.next(comment);
      })
    });
  }  
}
