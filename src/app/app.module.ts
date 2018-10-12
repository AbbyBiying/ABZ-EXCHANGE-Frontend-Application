import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MobileMenuModule } from './core/mobile-menu/mobile-menu.module';

import { AuthModule } from './auth/auth.module';

import { CoreModule } from './core/core.module';
import { HttpClientModule, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    HttpClientModule,       
    AuthModule,
    CoreModule,
    MobileMenuModule
  ],  

  bootstrap: [AppComponent]
})
export class AppModule { }
