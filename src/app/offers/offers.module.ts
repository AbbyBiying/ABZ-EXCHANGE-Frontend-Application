import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { OffersComponent } from "./offers.component";
import { OfferDetailComponent } from "./offer-detail/offer-detail.component";
import { EditOfferComponent } from "./edit-offer/edit-offer.component";
import { OffersRoutingModule } from "./offers-routing.module";

@NgModule({
  imports: [SharedModule, OffersRoutingModule],
  declarations: [OffersComponent, OfferDetailComponent, EditOfferComponent]
})
export class OffersModule {}
