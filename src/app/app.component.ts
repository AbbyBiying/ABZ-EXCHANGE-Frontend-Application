import { Component, ViewChild } from '@angular/core';
import { environment } from "../environments/environment";
import { MobileMenuModule } from './core/mobile-menu/mobile-menu.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'ABZ-app';

  constructor(){}

}
