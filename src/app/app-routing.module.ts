import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateChild } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
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
    RouterModule.forRoot(appRoutes),
      // ,{ enableTracing: true } ),    
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
    ErrorPageComponent
  ],
  providers:    [  ],
})
export class AppRoutingModule { }
