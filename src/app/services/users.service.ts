import { Injectable,Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getUsers(): Observable<any> {

    const headers = new HttpHeaders({'Accept': 'application/json'});
    
    return new Observable(observer => {
      //this.http.get('http://www.abzexchange.com/users',

      this.http.get('http://localhost:3000/users',
      {
       headers: headers
      })
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe(data => {
         // console.log(data);                
          observer.next(data);
          observer.complete();
      });
    });
  }
}


