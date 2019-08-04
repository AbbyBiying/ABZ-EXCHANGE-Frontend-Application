import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";

import { LocationsComponent } from "./locations.component";
import { LocationDetailComponent } from "../locations/location-detail/location-detail.component";
import { LocationsRoutingModule } from "./locations-routing.module";
import { LocationSearchComponent } from "./location-search/location-search.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    LocationsRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    LocationsComponent,
    LocationDetailComponent,
    LocationSearchComponent
  ]
})
export class LocationsModule {}
