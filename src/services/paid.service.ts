import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { WebPayService } from 'src/services/webpay.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class PaidService {
  
  paid: Subject<any>;
  
  // Our constructor calls our wsService connect method
  constructor(private webpay: WebPayService) {
    this.paid = <Subject<any>>webpay
      .connect()
      .pipe(
            map((response: any): any => {
            return response;
        }))
   }


}