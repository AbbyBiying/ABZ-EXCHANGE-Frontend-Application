import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { ListingsComponent } from './listings.component';
import { ListingComponent } from '../listing/listing.component';
import { EditListingComponent } from '../edit-listing/edit-listing.component';

const listingsRoutes: Routes = [
  { path: '', component: ListingsComponent },  
  { path: ':id', component: ListingComponent },
  { path: ':id/edit', component: EditListingComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forChild(listingsRoutes)
  ],
  exports: [RouterModule],

})
export class ListingsRoutingModule { }
