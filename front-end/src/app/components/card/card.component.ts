import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card', // Etiqueta html del componente
  templateUrl: './card.component.html', // ruta relativa donde está el html del componente
  styleUrls: ['./card.component.less'] // ruta relativa donde esta el css del componente
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
