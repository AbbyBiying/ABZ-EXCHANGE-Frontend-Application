import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  private headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getListings(): Observable<any> {

    const headers = new HttpHeaders({'Accept': 'application/json'});
    
    return new Observable(observer => {
      this.http.get('http://www.abzexchange.com/listings',

      // this.http.get('http://localhost:3000/listings',
      {
       headers: this.headers
      })
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe((response: HttpResponse<any>) => {
         // console.log(response);                
          observer.next(response);
          observer.complete();
      });
    });
  }

  getListing(id: number): Observable<any>{
    return this.getListings().pipe(
      map((listings) => listings.find(listing => listing.id === id))
    );
  }
}
