import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MobileMenuModule } from './mobile-menu/mobile-menu.module';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { ConfigService } from './config/config.service';
import { HttpClientModule, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { JwtModule } from '@auth0/angular-jwt';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';

// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    MobileMenuModule, 
    MatButtonModule,
    HttpClientModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       return localStorage.getItem('access_token');
    //     },
    //     throwNoTokenError: true,
    //     whitelistedDomains: ['localhost:3000', 'http://www.abzexchange.com/'],
    //   }
    // })
  ],  
  exports: [],

  providers: [AuthService, ConfigService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
