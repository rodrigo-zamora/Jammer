import { Component, OnInit } from '@angular/core';
//import * as moment from 'moment';
//import { MomentModule } from 'ngx-moment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})


export class PaymentComponent implements OnInit {

  //today = moment().format('DD/MM/YYYY');
  //nextPayment = moment().add(30, 'days');

  constructor() { 
  }


  ngOnInit(): void {
  }
  
  onClick() {
    // post a la subscrupcion para modificar el estado de la subscripcion
  }
}
