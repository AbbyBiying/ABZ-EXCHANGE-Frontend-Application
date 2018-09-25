import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs/Observable';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService implements OnInit {
  private headers = new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'});

  constructor(
    private router: Router,     
    private http: HttpClient,
    private configService: ConfigService,
    // public jwtHelper: JwtHelperService
  ) {}

  ngOnInit() {    

  }

  signinUser(user): Observable<any> {        
    return new Observable(observer => {
      this.http.post('http://localhost:3000/users/sign_in', user, { headers: this.headers }).subscribe(data => {
        let authToken = data.token;
        localStorage.setItem("authToken", authToken);
        // console.log(authToken); 
        console.log("User is signed in!");         
        observer.next(data);    
        this.router.navigate(['/']);
        observer.complete(); 
      });
    });  
  }

  signupUser(user): Observable<any> {
    return new Observable(observer => {
      this.http.post('http://localhost:3000/users', user, { headers: this.headers }).subscribe(data => {

        console.log(data);            
        console.log("User is signed up!");         
        observer.next(data);
        this.router.navigate(['/']);
        observer.complete(); 
      });
    });  
  }

  signOut() {
    localStorage.removeItem('authToken');
    console.log("User is signed out!");              
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
  
    // console.log(token);
    if (token !== null && token !== undefined){
      return true;
    }
    else{
      return false;
    }
    // console.log(this.jwtHelper.isTokenExpired()); // true or false
    // console.log(this.jwtHelper.getTokenExpirationDate(token));
    // console.log(this.jwtHelper.decodeToken(token));
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);
  }

  getAuthorizationToken(){
    return localStorage.getItem('authToken');
  };
}
