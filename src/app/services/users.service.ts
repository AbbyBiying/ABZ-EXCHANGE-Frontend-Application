import { Injectable,Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getUsers(): Observable<any> {
    return new Observable(observer => {
      this.http.get("/users")
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe((response: HttpResponse<User[]>) => {
          console.log(response);                
          observer.next(response);
          observer.complete();          
      });
    });
  };

  getUser(id: number): Observable<any>{
    return this.getUsers().pipe(
      map((users) => users.find(user => user.id === id))
    );
  }
}