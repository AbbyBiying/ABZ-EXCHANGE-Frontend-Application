import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { ExchangesComponent } from './exchanges.component';
import { ExchangeDetailComponent } from './exchange-detail/exchange-detail.component';

const exchangesRoutes: Routes = [
  { path: '', component: ExchangesComponent },  
  { path: ':id', component: ExchangeDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(exchangesRoutes)
  ],
  exports: [RouterModule],

})
export class ExchangesRoutingModule { }
