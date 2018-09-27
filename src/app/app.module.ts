import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MobileMenuModule } from './mobile-menu/mobile-menu.module';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth/auth.service';
import { ConfigService } from './config/config.service';
import { MatButtonModule } from '@angular/material/button';
import { AngularTokenModule } from 'angular-token';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    MobileMenuModule,
    MatButtonModule,
    AngularTokenModule.forRoot({
      

      signInPath: 'http://localhost:3000/api/v1/auth/sign_in',
      signOutPath: 'http://localhost:3000/api/v1/auth/sign_out',
      registerAccountPath: 'http://localhost:3000/api/v1/auth',

      // signInPath: 'http://localhost:3000/users/sign_in',
      // signOutPath: 'http://localhost:3000/users/sign_out',
      // registerAccountPath: 'http://localhost:3000/users',
    })
  ],  
  exports: [],

  providers: [AngularTokenModule, AuthService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
