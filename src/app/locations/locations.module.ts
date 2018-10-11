import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { LocationsComponent } from './locations.component';
import { LocationComponent } from '../location/location.component';
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
    LocationComponent
  ]
})
export class LocationsModule { }