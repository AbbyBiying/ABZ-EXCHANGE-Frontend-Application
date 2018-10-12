import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { LocationsComponent } from './locations.component';
import { LocationDetailComponent } from '../locations/location-detail/location-detail.component';
import { LocationsRoutingModule } from './locations-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    LocationsRoutingModule
  ],
  declarations: [
    LocationsComponent,
    LocationDetailComponent
  ]
})
export class LocationsModule { }
