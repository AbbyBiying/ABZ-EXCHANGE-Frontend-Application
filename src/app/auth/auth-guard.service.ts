import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { map, tap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, //provides access to information about a route associated with a component that is loaded in an outlet. Use to traverse the RouterState tree and extract information from nodes.
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    let url: string = state.url;

    // to transform the currentUserSubject, a BehaviorSubject, Observable, into a boolean
    return this.authService.currentUserSubject.pipe(
      // make sure that we always just take the latest user value and then unsubscribe for this guard execution
      // so that we don't have an ongoing listener to that which we really don't need
      take(1),
      map(user => {
        const isAuth = !!user; // This converts currentUserSubject to a boolean and ensures a boolean type.
        if (isAuth) {
          return true;
        }

        // if false, simply pass in your normal array of segments, of route segments you want to navigate to
        return this.router.createUrlTree(["/signin"]);
      })

      // the old way:
      // in some edge cases, this could lead to race conditions with multiple redirects
      // may interfere with each other

      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/signin']);
      //   }
      // })
    );

    // return this.checkLogin(url);

    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(["/signin"]);
    //   return false;
    // } else {
    //   return true;
    // }
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }

  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   return this.canActivate(route, state);
  // }

  // old way: can-activate-child
  // checkLogin(url: string): boolean {
  //   if (this.authService.isAuthenticated) {
  //     return true;
  //   }

  //   // Store the attempted URL for redirecting
  //   this.authService.redirectUrl = url;

  //   // Navigate to the login page
  //   this.router.navigate(["/signin"]);
  //   return false;
  // }
}
