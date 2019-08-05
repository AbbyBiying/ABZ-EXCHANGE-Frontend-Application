import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ListingsComponent } from "./listings.component";
import { ListingDetailComponent } from "../listings/listing-detail/listing-detail.component";
import { EditListingComponent } from "../listings/edit-listing/edit-listing.component";
import { ListingSearchComponent } from "../listings/listing-search/listing-search.component";
import { ListingsRoutingModule } from "./listings-routing.module";

@NgModule({
  imports: [ListingsRoutingModule, SharedModule],
  declarations: [
    ListingsComponent,
    ListingDetailComponent,
    EditListingComponent,
    ListingSearchComponent
  ]
})
export class ListingsModule {}
