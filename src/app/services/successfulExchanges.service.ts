import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { SuccessfulExchange } from '../successful-exchanges/successfulExchange.model';

@Injectable({
  providedIn: 'root'
})
export class SuccessfulExchangesService {
  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getSuccessfulExchanges(): Observable<any> {    
    return new Observable(observer => {
      this.http.get("/successful_exchanges")
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe((response: HttpResponse<SuccessfulExchange[]>) => {
          console.log(response);                
          observer.next(response);
          observer.complete();
      });
    });
  }
  

  // getSuccessfulExchange(id: number): Observable<any>{
  //   return this.getSuccessfulExchanges().pipe(
  //     map((successfulexchanges) => successfulexchanges.find(successfulexchange => successfulexchange.id === id))
  //   );
  // }
}