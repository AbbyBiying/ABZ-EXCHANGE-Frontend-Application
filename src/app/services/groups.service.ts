import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Group } from '../groups/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private http: HttpClient, private configService: ConfigService){}

  getGroups(): Observable<any> {    
    return new Observable(observer => {
      this.http.get("/groups")
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe((response: HttpResponse<Group[]>) => {
          console.log(response);                
          observer.next(response);
          observer.complete();
      });
    });
  }

  getGroup(id: number): Observable<any>{
    return this.getGroups().pipe(
      map((groups) => groups.find(group => group.id === id))
    );
  }
}