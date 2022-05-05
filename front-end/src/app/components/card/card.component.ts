import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card', // Etiqueta html del componente
  templateUrl: './card.component.html', // ruta relativa donde está el html del componente
  styleUrls: ['./card.component.less'] // ruta relativa donde esta el css del componente
})
export class CardComponent implements OnInit {
  url = 'https://backend-jammer.herokuapp.com/movies';
  
  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
  }

  getMovies() {
    return this.http.get(this.url);
  }
}
