import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of ,  Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ConfigService } from '../config/config.service';
import { Listing } from '../listings/listing.model';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  listingsChanged = new Subject<Listing[]>();

  constructor(
    private http: HttpClient, 
    private configService: ConfigService) {          
  }
  /** GET listinges from the server */
  getListings(): Observable<any> {    
    return this.http.get(`/listings`)
      .pipe(
        tap(_ => console.log('fetched all listings')),
        catchError(this.configService.handleError)
      )
  }; 

  /** GET listing by id. Return `undefined` when id not found */
  getListingNo404<Data>(id: number): Observable<any> {
    const url = `/listing/?id=${id}`;
    return this.http.get<Listing[]>(url)
      .pipe(
        map(listinges => listinges[0]), // returns a {0|1} element array
        tap(g => {
          const outcome = g ? `fetched` : `did not find`;
          console.log(`${outcome} listing id=${id}`);
        }),
        catchError(this.configService.handleError)
      );
  }
   /** GET listing by id. Will 404 if id not found */
   getListing(id: number): Observable<any>{
    return this.getListings()
    .pipe(
      tap(_ => console.log(`fetched listing id=${id}`)),        
      map((listings) => listings.find(listing => listing.id === id)),
      catchError(this.configService.handleError)
    );
  }
  
  /* GET listings whose name contains search term */
  searchListings(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty listing array.
      return of([]);
    }
    return this.http.get<any[]>(`/listings/?name=${term}`).pipe(
      tap(_ => console.log(`found listings matching "${term}"`)),
      catchError(this.configService.handleError)
    );
  }

  /** PUT: update the group on the server */
  updateListing(listing): Observable<any> {        
    return this.http.put((`/listings/${listing.id}`), listing)
      .pipe(
        tap(_ => console.log(`updated listing id=${listing.id}`)),
        catchError(this.configService.handleError)
      )
  }
}