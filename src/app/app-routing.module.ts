import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, CanActivate, CanActivateChild } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HomeComponent } from './core/home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth/auth-guard.service';

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
  // wild card route, any unknown route, has to be the last route
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules}),
      // ,{ enableTracing: true } ),    
  ],  
  exports: [RouterModule],

  declarations: [  
    DashboardComponent,
    ErrorPageComponent
  ],
  providers:    [],
})
export class AppRoutingModule { }
