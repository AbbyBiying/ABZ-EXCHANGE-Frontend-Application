import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MobileMenuModule } from './mobile-menu/mobile-menu.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthGuardService } from '../auth/auth-guard.service';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MobileMenuModule,
    MatButtonModule,
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],  
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    AuthService,
    ConfigService,
    AuthGuardService,  
  ],
})
export class CoreModule { }
