import { NgModule } from "@angular/core";
import { SuccessfulExchangesComponent } from "./successful-exchanges.component";
import { SuccessfulExchangeDetailComponent } from "../successful-exchanges/successful-exchange-detail/successful-exchange-detail.component";
import { SuccessfulExchangesRoutingModule } from "./successful-exchanges-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [SuccessfulExchangesRoutingModule, SharedModule],
  declarations: [
    SuccessfulExchangeDetailComponent,
    SuccessfulExchangesComponent
  ]
})
export class SuccessfulExchangesModule {}
