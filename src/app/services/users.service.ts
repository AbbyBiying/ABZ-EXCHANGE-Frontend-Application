import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

import { ConfigService } from "../config/config.service";
import { User } from "../users/user.model";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  usersChanged = new Subject<User[]>();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  /** GET useres from the server */
  getUsers(): Observable<any> {
    return this.http.get(`/users`).pipe(
      tap(_ => console.log("fetched all users")),
      catchError(this.configService.handleError)
    );
  }

  /** GET user by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<any> {
    const url = `/user/?id=${id}`;
    return this.http.get<User[]>(url).pipe(
      map(useres => useres[0]), // returns a {0|1} element array
      tap(g => {
        const outcome = g ? `fetched` : `did not find`;
        console.log(`${outcome} user id=${id}`);
      }),
      catchError(this.configService.handleError)
    );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<any> {
    return this.getUsers().pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      map(users => users.find(user => user.id === id)),
      catchError(this.configService.handleError)
    );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<any[]>(`/users/?user[username]=${term}`).pipe(
      tap(_ => console.log(`found users matching "${term}"`)),
      catchError(this.configService.handleError)
    );
  }

  /** PUT: update the user on the server */
  updateUser(user): Observable<any> {
    return this.http.put(`/users/${user.id}`, user).pipe(
      tap(_ => console.log(`updated user id=${user.id}`)),
      catchError(this.configService.handleError)
    );
  }
}
