import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "../auth/auth-guard.service";
import { ListingsComponent } from "./listings.component";
import { ListingDetailComponent } from "../listings/listing-detail/listing-detail.component";
import { EditListingComponent } from "../listings/edit-listing/edit-listing.component";

const listingsRoutes: Routes = [
  { path: "", component: ListingsComponent },
  { path: "new", component: EditListingComponent },
  {
    // path: ":id/:name",
    path: ":id",
    component: ListingDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: ":id/edit",
    component: EditListingComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(listingsRoutes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule {}
