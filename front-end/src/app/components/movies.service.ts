import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface movie {
  title: string;
  year: number;
  cuevanaUUID: string;
  poster: string;
  rating: number;
  duration: string;
}
@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  accion: movie[] = [];

  //animacion = 'https://backend-jammer.herokuapp.com/movies/search?genre=1';

  constructor(private http: HttpClient) { 
    this.http.get('https://backend-jammer.herokuapp.com/movies/search?genre=0')
      .subscribe((data: any) => {
        //console.log(data[0].title);
        for(let i = 0; i < data.length; i++) {
          const film: movie = {
            title: data[i].title,
            year: data[i].year,
            cuevanaUUID: data[i].cuevanaUUID,
            poster: data[i].poster,
            rating: data[i].rating,
            duration: data[i].duration
          };
          this.accion.push(film);
          //this.accion[i].push(data[i].title, data[i].year, data[i].id, data[i].poster, data[i].rating, data[i].duration);
        }
        console.log(this.accion.length);
      }
    );
    console.log(this.accion);
  }
  getMovies() {
    return this.accion;
  }
}
