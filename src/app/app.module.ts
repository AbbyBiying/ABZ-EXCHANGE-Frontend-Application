// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';

// material
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './config/config.service';
import { GroupsComponent } from './groups/groups.component';
import { HomeComponent } from './home/home.component';
import { ListingsComponent } from './listings/listings.component';
import { LocationsComponent } from './locations/locations.component';
import { MobileMenuModule } from './mobile-menu/mobile-menu.module';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { UsersComponent } from './users/users.component';

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
  {
    path: 'signup',
    component: SignupComponent
  },   
  {
    path: 'signin',
    component: SigninComponent
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
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    HttpClientModule,        
    FlexLayoutModule,
    ReactiveFormsModule,
    MobileMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],  
  exports: [RouterModule],

  providers: [AuthService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
