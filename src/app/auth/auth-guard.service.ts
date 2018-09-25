import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
// import { JwtModule } from '@auth0/angular-jwt';
// import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService,     
              // public jwtHelper: JwtHelperService,    
              private router: Router,     

) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()){
      this.router.navigate(['/signin']);
      return false;
    };
      return true;
  }
}
