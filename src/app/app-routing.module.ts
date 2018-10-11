import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate, CanActivateChild } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ErrorPageComponent } from './error-page/error-page.component';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth/auth-guard.service';

// material
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { 
    path: 'users',     
    loadChildren: './users/users.module#UsersModule'
  },
  { 
    path: 'listings',     
    loadChildren: './listings/listings.module#ListingsModule'
  },
  { 
    path: 'offers',     
    loadChildren: './offers/offers.module#OffersModule'
  },
  {
    path: 'locations',
    loadChildren: './locations/locations.module#LocationsModule'
  },
  { 
    path: 'groups',     
    loadChildren: './groups/groups.module#GroupsModule'
  },
  {
    path: 'signup',
    component: SignupComponent
  },   
  {
    path: 'signin',
    component: SigninComponent
  },   
  {
    path: 'dashboard',
    component: DashboardComponent,    
    canActivate: [AuthGuardService]

  },   
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  //wild card route, any unknown route, has to be the last route
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes
      // ,{ enableTracing: true } 
      ),    
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,        
    FlexLayoutModule,
    ReactiveFormsModule, 

  ],  
  exports: [RouterModule],

  declarations: [  
    DashboardComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
  ],
  providers:    [  ],
})
export class AppRoutingModule { }
