import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of ,  Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ConfigService } from '../config/config.service';
import { Location } from '../locations/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locationsChanged = new Subject<Location[]>();

  constructor(
    private http: HttpClient, 
    private configService: ConfigService) {          
  }
  
  /** GET locationes from the server */
  getLocations(): Observable<any> {    
    return this.http.get(`/locations`)
      .pipe(
        tap(_ => console.log('fetched all locations')),
        catchError(this.configService.handleError)
      )
  };

  /** GET location by id. Return `undefined` when id not found */
  getLocationNo404<Data>(id: number): Observable<any> {
    const url = `/location/?id=${id}`;
    return this.http.get<Location[]>(url)
      .pipe(
        map(locationes => locationes[0]), // returns a {0|1} element array
        tap(g => {
          const outcome = g ? `fetched` : `did not find`;
          console.log(`${outcome} location id=${id}`);
        }),
        catchError(this.configService.handleError)
      );
  }
   /** GET location by id. Will 404 if id not found */
   getLocation(id: number): Observable<any>{
    return this.getLocations()
    .pipe(
      tap(_ => console.log(`fetched location id=${id}`)),        
      map((locations) => locations.find(location => location.id === id)),
      catchError(this.configService.handleError)
    );
  }
  
  /* GET locations whose name contains search term */
  searchLocations(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty location array.
      return of([]);
    }
    return this.http.get<any[]>(`/locations/?name=${term}`).pipe(
      tap(_ => console.log(`found locations matching "${term}"`)),
      catchError(this.configService.handleError)
    );
  }

  /** PUT: update the location on the server */
  updateLocation(location): Observable<any> {        
    return this.http.put((`/locations/${location.id}`), location)
      .pipe(
        tap(_ => console.log(`updated location id=${location.id}`)),
        catchError(this.configService.handleError)
      )
  }
}