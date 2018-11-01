import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of ,  Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ConfigService } from '../config/config.service';
import { Exchange } from '../exchanges/exchange.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {
  exchangesChanged = new Subject<Exchange[]>();

  constructor(
    private http: HttpClient, 
    private configService: ConfigService) {          
  }
  
  /** GET exchangees from the server */
  getExchanges(): Observable<any> {    
    return this.http.get(`/exchanges`)
      .pipe(
        tap(_ => console.log('fetched all exchanges')),
        catchError(this.configService.handleError)
      )
  };

  /** GET exchange by id. Return `undefined` when id not found */
  getExchangeNo404<Data>(id: number): Observable<any> {
    const url = `/exchange/?id=${id}`;
    return this.http.get<Exchange[]>(url)
      .pipe(
        map(exchangees => exchangees[0]), // returns a {0|1} element array
        tap(g => {
          const outcome = g ? `fetched` : `did not find`;
          console.log(`${outcome} exchange id=${id}`);
        }),
        catchError(this.configService.handleError)
      );
  }

  /** GET exchange by id. Will 404 if id not found */
  getExchange(id: number): Observable<any>{
    return this.getExchanges()
    .pipe(
      tap(_ => console.log(`fetched exchange id=${id}`)),        
      map((exchanges) => exchanges.find(exchange => exchange.id === id)),
      catchError(this.configService.handleError)
    );
  }
  
  /* GET exchanges whose name contains search term */
  searchExchanges(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty exchange array.
      return of([]);
    }
    return this.http.get<any[]>(`/exchanges/?name=${term}`).pipe(
      tap(_ => console.log(`found exchanges matching "${term}"`)),
      catchError(this.configService.handleError)
    );
  }
}