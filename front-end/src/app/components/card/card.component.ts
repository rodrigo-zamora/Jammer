import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-card', // Etiqueta html del componente
  templateUrl: './card.component.html', // ruta relativa donde está el html del componente
  styleUrls: ['./card.component.less'] // ruta relativa donde esta el css del componente
})

export class CardComponent implements OnInit {

  // destructuring de la variable pelis
  //arr: any[] = [];
  allPelis: any[] = [];
  constructor(public pelis: MoviesService) {
    this.allPelis = this.pelis.getMovies();
    console.log(this.pelis.getMovies());
    console.log(this.allPelis);
    console.log(this.allPelis[0]);
    // mostrar el titulo de la pelicula mediante this.pelis.accion y mostrarlo
    /*this.arr = this.pelis.accion;
    console.log(this.arr);*/

  }

  ngOnInit(): void {
  }

}
