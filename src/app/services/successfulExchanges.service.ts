import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class SuccessfulExchangesService {
  private headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getSuccessfulExchanges(): Observable<any> {

    const headers = new HttpHeaders({'Accept': 'application/json'});
    
    return new Observable(observer => {
      this.http.get('http://www.abzexchange.com/successful_exchanges',

      // this.http.get('http://localhost:3000/successful_exchanges',
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
  }

  getSuccessfulExchange(id: number): Observable<any>{
    return this.getSuccessfulExchanges().pipe(
      map((successfulexchanges) => successfulexchanges.find(successfulexchange => successfulexchange.id === id))
    );
  }
}