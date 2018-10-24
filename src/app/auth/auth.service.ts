import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService implements OnInit {
  token: string;

  constructor(
    private router: Router,     
    private http: HttpClient,
    private configService: ConfigService,
  ) {}

  ngOnInit() {    
  }

  signinUser(user): Observable<any> {        
    return new Observable(observer => {
      
      this.http.post("/users/sign_in", user, {}).subscribe(data => {
        if (data !== null){
          this.token = data['token'];
          localStorage.setItem("authToken", this.token);
        
          console.log("User is signed in!");         
          observer.next(data);    
          this.router.navigate(['/dashboard']);
          observer.complete(); 
        };
      });
    });  
  }

  signupUser(user): Observable<any> {
    return new Observable(observer => {
      this.http.post("/users", user, {}).subscribe(data => {
        if (data !== null){
          this.token = data['token'];
          localStorage.setItem("authToken", this.token);
        
          console.log("User is signed up!");         
          observer.next(data);
          this.router.navigate(['/']);
          observer.complete(); 
        };
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
  
    if (token !== null && token !== undefined){
      return true;
    }
    else{
      return false;
    }
  }

  getAuthorizationToken(){
    return localStorage.getItem('authToken');
  };
}