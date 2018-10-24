import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Location } from '../locations/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getLocations(): Observable<any> {    
    return new Observable(observer => {
      this.http.get("/locations")
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe((response: HttpResponse<Location[]>) => {
          observer.next(response);
          observer.complete();
      });
    });
  }

  getLocation(id: number): Observable<any> {
    return this.getLocations().pipe(
      map((locations) => locations.find(location => location.id === id))
      );
  }
}
