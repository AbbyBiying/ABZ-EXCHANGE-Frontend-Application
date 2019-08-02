import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

import { MobileMenuModule } from './core/mobile-menu/mobile-menu.module';
import { CoreModule } from './core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    HttpClientModule,  
    NgxSpinnerModule,     
    AuthModule,
    CoreModule,
    MobileMenuModule,
    TranslateModule.forRoot(),
  ],  
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
