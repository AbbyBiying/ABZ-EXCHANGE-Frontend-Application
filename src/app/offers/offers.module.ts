import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

// material
import { ErrorStateMatcher } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";

import { OffersComponent } from "./offers.component";
import { OfferDetailComponent } from "./offer-detail/offer-detail.component";
import { EditOfferComponent } from "./edit-offer/edit-offer.component";
import { OffersRoutingModule } from "./offers-routing.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    OffersRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  declarations: [OffersComponent, OfferDetailComponent, EditOfferComponent]
})
export class OffersModule {}
