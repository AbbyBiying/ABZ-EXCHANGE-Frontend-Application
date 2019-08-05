import { NgModule } from "@angular/core";
import { LocationsComponent } from "./locations.component";
import { LocationDetailComponent } from "../locations/location-detail/location-detail.component";
import { LocationsRoutingModule } from "./locations-routing.module";
import { LocationSearchComponent } from "./location-search/location-search.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [SharedModule, LocationsRoutingModule],
  declarations: [
    LocationsComponent,
    LocationDetailComponent,
    LocationSearchComponent
  ]
})
export class LocationsModule {}
