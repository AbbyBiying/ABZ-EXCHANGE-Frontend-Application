import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = environment.serviceUrl;
    // Get the auth token from the service.
    const authToken = this.authService.getAuthorizationToken();
     const headers = {
    // 'Authorization': authToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    const authReq = req.clone({
      url: url + req.url,
      setHeaders: headers
    });
    console.log(authReq);
    console.log(authReq.body);

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
