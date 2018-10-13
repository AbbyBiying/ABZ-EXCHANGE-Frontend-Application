import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessfulExchangesComponent } from './successful-exchanges.component';
import { SuccessfulExchangeDetailComponent } from '../successful-exchanges/successful-exchange-detail/successful-exchange-detail.component';
import { SuccessfulExchangesRoutingModule } from './successful-exchanges-routing.module';
 
@NgModule({
  imports: [
    CommonModule,
    SuccessfulExchangesRoutingModule
  ],
  declarations: [
    SuccessfulExchangeDetailComponent,
    SuccessfulExchangesComponent,

    ]
})
export class SuccessfulExchangesModule { }
