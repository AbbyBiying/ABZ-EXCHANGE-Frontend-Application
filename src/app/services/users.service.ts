import { Injectable,Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getUser(userId): Observable<any> {
    
    return new Observable(observer => {
      //this.http.get('http://www.abzexchange.com/users',

      this.http.get('http://localhost:3000/users/' + userId,
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

  getUsers(): Observable<any> {
    
    return new Observable(observer => {
      //this.http.get('http://www.abzexchange.com/users',

      this.http.get('http://localhost:3000/users',
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

}
