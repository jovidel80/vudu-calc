import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {

  constructor(private http: HttpClient) { }

  genericGet(): Observable<any> {
    // let headers = new Headers();
    // headers.append()
    // const params = new HttpParams();
    // params.append('login', '8d69dec6eb7834befcd8036ea14106a8');
    // params.append('authtoken', 'b17acb32809fa61dac0c7e2f2969fa5d');
    return this.http.get('https://api.jumpseller.com/v1/orders.json?login=8d69dec6eb7834befcd8036ea14106a8&authtoken=b17acb32809fa61dac0c7e2f2969fa5d&limit=50&page=1');
  }
}
