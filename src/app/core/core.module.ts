import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MatCardModule,
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],  
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],

})
export class CoreModule { }
