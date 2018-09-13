import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GroupsComponent } from './groups/groups.component';
import { HomeComponent } from './home/home.component';
import { ListingsComponent } from './listings/listings.component';
import { LocationsComponent } from './locations/locations.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { UsersComponent } from './users/users.component';
// material
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),    
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    HttpClientModule,        
    FlexLayoutModule,
    ReactiveFormsModule,

  ],  
  exports: [RouterModule],

  declarations: [    
    UsersComponent,
    ListingsComponent,
    GroupsComponent,
    LocationsComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
  ]
})
export class AppRoutingModule { }
