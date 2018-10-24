import { Injectable,Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Exchange } from '../exchanges/exchange.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {
  constructor(private http: HttpClient, private configService: ConfigService){}

  getExchanges(): Observable<any> {
    return new Observable(observer => {
      this.http.get("/exchanges")
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe((response: HttpResponse<Exchange[]>) => {
          console.log(response);                
          observer.next(response);
          observer.complete();          
      });
    });
  };

  getExchange(id: number): Observable<any>{
    return this.getExchanges().pipe(
      map((exchanges) => exchanges.find(exchange => exchange.id === id))
    );
  }
}