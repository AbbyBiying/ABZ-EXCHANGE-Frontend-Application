import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { OffersComponent } from './offers.component';
import { OfferDetailComponent } from '../offers/offer-detail/offer-detail.component';
import { EditOfferComponent } from '../offers/edit-offer/edit-offer.component';

const offersRoutes: Routes = [
  { path: '', component: OffersComponent },  
  { path: ':id', component: OfferDetailComponent },
  { path: ':id/edit', component: EditOfferComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    RouterModule.forChild(offersRoutes)
  ],
  exports: [RouterModule],

})
export class OffersRoutingModule { }
