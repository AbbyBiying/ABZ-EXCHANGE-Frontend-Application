import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileMenuComponent } from './mobile-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  declarations: [    
    MobileMenuComponent,
  ],   
  exports: [
    MobileMenuComponent
  ],
})
export class MobileMenuModule { }
