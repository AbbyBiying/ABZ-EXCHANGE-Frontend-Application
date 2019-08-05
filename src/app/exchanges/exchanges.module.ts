import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { ExchangesComponent } from "./exchanges.component";
import { ExchangeDetailComponent } from "../exchanges/exchange-detail/exchange-detail.component";
import { ExchangesRoutingModule } from "./exchanges-routing.module";

@NgModule({
  imports: [ExchangesRoutingModule, SharedModule],
  declarations: [ExchangesComponent, ExchangeDetailComponent]
})
export class ExchangesModule {}
