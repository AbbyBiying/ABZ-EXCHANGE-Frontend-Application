import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate, CanActivateChild } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ErrorPageComponent } from './error-page/error-page.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { HomeComponent } from './home/home.component';
import { ListingsComponent } from './listings/listings.component';
import { LocationsComponent } from './locations/locations.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { GroupComponent } from './group/group.component';
import { LocationComponent } from './location/location.component';
import { ListingComponent } from './listing/listing.component';
import { OffersComponent } from './offers/offers.component';
import { OfferComponent } from './offer/offer.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { EditGroupComponent } from './edit-group/edit-group.component';

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
  { path: 'users',     
    canActivateChild: [AuthGuardService],
    component: UsersComponent, 
    children: [
      { path: ':id', component: UserComponent },
      { path: ':id/edit', component: EditUserComponent },
    ] 
  },
  // { path: 'users/:id', component: UserComponent },
  { path: 'listings',     
    canActivateChild: [AuthGuardService],
    component: ListingsComponent, 
    children: [
      { path: ':id', component: ListingComponent },
      { path: ':id/edit', component: EditListingComponent },
    ] 
  },
  { path: 'offers',     
    canActivateChild: [AuthGuardService],
    component: OffersComponent, 
    children: [
      { path: ':id', component: OfferComponent },
      { path: ':id/edit', component: EditOfferComponent },
    ] 
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  { path: 'locations/:id', component: LocationComponent },
  { path: 'groups',     
    canActivateChild: [AuthGuardService],
    component: GroupsComponent, 
    children: [
      { path: ':id', component: GroupComponent },
      { path: ':id/edit', component: EditGroupComponent },
    ] 
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
    UsersComponent,
    ListingsComponent,    
    OffersComponent,
    GroupsComponent,
    LocationsComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    UserComponent,    
    GroupComponent,
    LocationComponent,
    ListingComponent,      
    OfferComponent,
    EditUserComponent,
    EditListingComponent,
    EditOfferComponent,
    EditGroupComponent,
  ],
  providers:    [  ],
})
export class AppRoutingModule { }
