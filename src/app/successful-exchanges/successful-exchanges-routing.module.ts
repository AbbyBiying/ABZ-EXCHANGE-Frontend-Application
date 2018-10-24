import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { SuccessfulExchangesComponent } from './successful-exchanges.component';
import { SuccessfulExchangeDetailComponent } from '../successful-exchanges/successful-exchange-detail/successful-exchange-detail.component';
 
const SuccessfulExchangesRoutes: Routes = [
  { path: '', component: SuccessfulExchangesComponent },  
];

@NgModule({
  imports: [
    RouterModule.forChild(SuccessfulExchangesRoutes)
  ],
  exports: [RouterModule],

})
export class SuccessfulExchangesRoutingModule { }
