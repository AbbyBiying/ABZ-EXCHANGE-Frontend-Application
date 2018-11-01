import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of ,  Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ConfigService } from '../config/config.service';
import { Group } from '../groups/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupsChanged = new Subject<Group[]>();
  startedEditing = new Subject<any>();

  constructor(    
    private http: HttpClient, 
    private configService: ConfigService){
    }

  /** GET groupes from the server */
  getGroups(): Observable<any> {    
    return this.http.get(`/groups`)
      .pipe(
        tap(_ => console.log('fetched groups')),
        catchError(this.configService.handleError)
      )
  };

  /** GET group by id. Return `undefined` when id not found */
  getgroupNo404<Data>(id: number): Observable<any> {
    const url = `/groups/?id=${id}`;
    return this.http.get<Group[]>(url)
      .pipe(
        map(groupes => groupes[0]), // returns a {0|1} element array
        tap(g => {
          const outcome = g ? `fetched` : `did not find`;
          console.log(`${outcome} group id=${id}`);
        }),
        catchError(this.configService.handleError)
      );
  }

  /** GET group by id. Will 404 if id not found */
  getGroup(id: number): Observable<any>{
    return this.getGroups()
    .pipe(
      tap(_ => console.log(`fetched group id=${id}`)),        
      map((groups) => groups.find(group => group.id === id)),
      catchError(this.configService.handleError)
    );
  }
  
  /* GET groups whose name contains search term */
  searchGroups(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty group array.
      return of([]);
    }
    return this.http.get<any[]>(`/groups/?name=${term}`).pipe(
      tap(_ => console.log(`found groups matching "${term}"`)),
      catchError(this.configService.handleError)
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new group to the server */
  addGroup(group): Observable<any> {        
    return this.http.post(`/groups`, group)
      .pipe(
        tap(_ => console.log(`added group w/ id=${group.id}`)),        
        catchError(this.configService.handleError)
      )
  }

  /** DELETE: delete the group from the server */
  deleteGroup(group): Observable<any> {  
    const id = typeof group === 'number' ? group : group.id;      
    return this.http.delete(`/groups/${id}`)
      .pipe(
        tap(_ => console.log(`deleted group id=${id}`)),
        catchError(this.configService.handleError)
      )
  }

  /** PUT: update the group on the server */
  updateGroup(group): Observable<any> {        
    return this.http.put((`/groups/${group.id}`), group)
      .pipe(
        tap(_ => console.log(`updated group id=${group.id}`)),
        catchError(this.configService.handleError)
      )
  }
}