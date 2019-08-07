import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "../config/config.service";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../users/user.model";
import { retry, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUserSubject: BehaviorSubject<User>;

  error: any;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signinUser(user): Observable<any> {
    return this.http.post<any>("/users/sign_in", user, {}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.configService.handleError),
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user["token"]) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  signupUser(user): Observable<any> {
    return this.http.post<any>("/users", user, {}).pipe(
      retry(3),
      catchError(this.configService.handleError),
      map(user => {
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  signOut() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    console.log("User is signed out!");
    this.currentUserSubject.next(null);
    this.router.navigate(["/"]);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("authToken");

    if (token !== null && token !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  getAuthorizationToken() {
    return localStorage.getItem("authToken");
  }
}
