import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authReq: HttpRequest<any>;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = environment.serviceUrl;
    // Get the auth token from the service.
    const authToken = this.authService.getAuthorizationToken();

    if (this.authService.isAuthenticated()) {
      this.authReq = req.clone({
        url: url + req.url,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: authToken
        })
      });
    } else {
      this.authReq = req.clone({
        url: url + req.url,
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json"
        })
      });
    }

    // console.log("authReq: ", this.authReq);
    // console.log("authReq.body: ", this.authReq.body);

    // send cloned request with header to the next handler.
    return next.handle(this.authReq);
  }
}
