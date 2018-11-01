import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MobileMenuModule } from './mobile-menu/mobile-menu.module';
import { CommentDetailComponent } from '../comments/comment-detail/comment-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthGuardService } from '../auth/auth-guard.service';
import { AuthService } from '../auth/auth.service';
import { AuthInterceptor } from '../auth/auth-interceptor';
import { ConfigService } from '../config/config.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MobileMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    CommentDetailComponent
  ],  
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    AuthService,
    ConfigService,
    AuthGuardService,  
    {provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true}
  ],
})
export class CoreModule { }
