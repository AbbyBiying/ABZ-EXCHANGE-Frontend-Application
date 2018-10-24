import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Listing } from '../listings/listing.model';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getListings(): Observable<any> {
    return new Observable(observer => {
      this.http.get("/listings")
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe((response: HttpResponse<Listing[]>) => {
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
