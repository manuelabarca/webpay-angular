import { PaidService } from './../services/paid.service';
import { Component } from '@angular/core';
import { WebPayService } from 'src/services/webpay.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[WebPayService, PaidService]
})
export class AppComponent implements OnInit {
  title = 'webpay';
  interval: boolean;
  amount: number;
  transaction;
  paid: boolean;
  constructor(private _webpay: WebPayService, private _paid: PaidService,
    public snackBar: MatSnackBar){
      this.interval = false;
      this.paid = false;
  }
  ngOnInit(){
    this._paid.paid.subscribe(data => {
      this.interval = false;
      this.paid = true;
      this.transaction = JSON.parse(data);
      this.snackBar.open('Pago realizado', 'Cerrar', {
        duration: 2000,
      });
    })
  }

  pagar(amount){

    this._webpay.pagar(amount).subscribe(
      response => {
        this.interval = true;
      window.open(response.url, '_blank');
      },
      error => {  
        console.log(error)
      }
    )
  }

  paymentType(pt){
    switch(pt){
      case "VD": return "Venta Débito."
      case "VN": return"Venta Normal"
      case "VC": return "Venta en cuotas"
      case "ST": return"3 cuotas sin interés"
      case "S2": return"2 cuotas sin interés"
      case "NC": return pt+' cuotas sin interés'
    }

  }


}
