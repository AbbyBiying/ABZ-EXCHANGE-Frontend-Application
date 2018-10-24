import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { SuccessfulExchangesComponent } from './successful-exchanges.component';
import { SuccessfulExchangeDetailComponent } from '../successful-exchanges/successful-exchange-detail/successful-exchange-detail.component';
import { SuccessfulExchangesRoutingModule } from './successful-exchanges-routing.module';
 
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    SuccessfulExchangesRoutingModule
  ],
  declarations: [
    SuccessfulExchangeDetailComponent,
    SuccessfulExchangesComponent,

    ]
})
export class SuccessfulExchangesModule { }
