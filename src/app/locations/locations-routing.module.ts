import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { LocationsComponent } from './locations.component';
import { LocationComponent } from '../location/location.component';

const locationsRoutes: Routes = [
  { path: '', component: LocationsComponent },  
  { path: ':id', component: LocationComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(locationsRoutes)
  ],
  exports: [RouterModule],

})
export class LocationsRoutingModule { }
