import { Injectable,Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {
  private headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getExchanges(): Observable<any> {
    
    return new Observable(observer => {
      // this.http.get('http://www.abzexchange.com/exchanges',

      this.http.get('http://localhost:3000/exchanges',
      {
       headers: this.headers
      })
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe((response: HttpResponse<any>) => {
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