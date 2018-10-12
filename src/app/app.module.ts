import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MobileMenuModule } from './core/mobile-menu/mobile-menu.module';

import { AuthModule } from './auth/auth.module';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './config/config.service';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { JwtModule } from '@auth0/angular-jwt';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { MatButtonModule } from '@angular/material/button';
// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    MatButtonModule,
    HttpClientModule,       
    AuthModule,
    CoreModule,
    MobileMenuModule
  ],  
  providers: [
    AuthService,
    ConfigService,
    AuthGuardService,  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
