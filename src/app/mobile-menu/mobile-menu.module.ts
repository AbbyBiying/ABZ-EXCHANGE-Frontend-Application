import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MobileMenuComponent } from './mobile-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ],
  declarations: [    
    MobileMenuComponent,
  ],   
  exports: [
    MobileMenuComponent
  ],
})
export class MobileMenuModule { }
