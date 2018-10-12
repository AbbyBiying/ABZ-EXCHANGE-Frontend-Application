import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { LocationsComponent } from './locations.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';

const locationsRoutes: Routes = [
  { path: '', component: LocationsComponent },  
  { path: ':id', component: LocationDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(locationsRoutes)
  ],
  exports: [RouterModule],

})
export class LocationsRoutingModule { }
