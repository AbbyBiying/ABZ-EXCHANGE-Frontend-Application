import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { ListingsComponent } from './listings/listings.component';
import { GroupsComponent } from './groups/groups.component';
import { LocationsComponent } from './locations/locations.component';
import { HomeComponent } from './home/home.component';
import { ConfigService } from './config/config.service';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MobileMenuModule } from './mobile-menu/mobile-menu.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'listings',
    component: ListingsComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'groups',
    component: GroupsComponent
  },

  ];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ListingsComponent,
    GroupsComponent,
    LocationsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MobileMenuModule,
    MatIconModule,
    HttpClientModule,    
    RouterModule.forRoot(appRoutes),
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule

  ],  
  exports: [RouterModule],

  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
