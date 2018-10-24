import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService,     
              private router: Router,     
              ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean  {
    if (!this.authService.isAuthenticated()){
      this.router.navigate(['/signin']);
      return false;
    }else{
      return true;
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}