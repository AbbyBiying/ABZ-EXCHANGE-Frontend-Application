import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpParams,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authReq: HttpRequest<any>;
  newauthReq: HttpRequest<any>;

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = environment.serviceUrl;

    // Get the auth token from the service.
    const authToken = this.authService.getAuthorizationToken();
    this.authReq = req.clone({
      url: url + req.url,
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json"
      })
    });

    if (this.authService.isAuthenticated()) {
      this.authReq = this.authReq.clone({
        params: new HttpParams().append("auth", authToken)
        //withCredentials: true
      });
    }

    // send cloned request with header to the next handler.
    return next.handle(this.authReq);
  }
}
