import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getLocations(): Observable<any> {

    const headers = new HttpHeaders({'Accept': 'application/json'});
    
    return new Observable(observer => {
      this.http.get('http://www.abzexchange.com/locations',

      // this.http.get('http://localhost:3000/locations',
      {
       headers: headers
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
}



