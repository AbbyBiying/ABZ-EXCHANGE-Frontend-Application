import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { SuccessfulExchangesComponent } from "./successful-exchanges.component";
import { SuccessfulExchangeDetailComponent } from "../successful-exchanges/successful-exchange-detail/successful-exchange-detail.component";
import { SuccessfulExchangesRoutingModule } from "./successful-exchanges-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    SuccessfulExchangesRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    SuccessfulExchangeDetailComponent,
    SuccessfulExchangesComponent
  ]
})
export class SuccessfulExchangesModule {}
