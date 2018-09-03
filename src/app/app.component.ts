import { Component, ViewChild } from '@angular/core';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { MatMenuModule, MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'ABZ-app';
  constructor(){
    
  }
}
