import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import {Http,  Headers } from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';
@Injectable()

export class WebPayService {

    private socket;

    constructor(private _http: Http){

    }

    connect(): Rx.Subject<MessageEvent>{
        this.socket = io(environment.ws_url);

        let observable = new Observable(observer => {
            this.socket.on('paid', (data) => {
                observer.next(data)
            });
            return () => {
                this.socket.disconnect();
            }
        });

        let observer= {
            next: (data: Object) => {
                this.socket.emit('paid', data)
            }
        };

        return Rx.Subject.create(observer, observable);
    }

    pagar(amount){
        let params = {
            "amount": amount
        };
        let headers = new Headers({
            'Content-Type': 'application/json'
        })
       return this._http.post('http://localhost:3410/api/v1/pagar', params, {headers:headers})
       .pipe(
           map(res => res.json())
       );
    }
}