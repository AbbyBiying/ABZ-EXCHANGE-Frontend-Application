import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { Router, ActivatedRoute, Params, ParamMap } from "@angular/router";
import { ListingsService } from "../../services/listings.service";
import { Listing } from "../listing.model";

import { Subscription, Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";

@Component({
  selector: "app-listing",
  templateUrl: "./listing-detail.component.html",
  styleUrls: ["./listing-detail.component.scss"]
})
export class ListingDetailComponent implements OnInit {
  listing: Listing;
  paramsSubscription: Subscription;
  id: number;
  listingName: string;
  listingDescription: string;
  listingId: number;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params["id"];

    this.listingsService
      .getListing(id)
      .subscribe(listing => (this.listing = listing));

    // onEditListing() {
    //   this.router.navigate(["edit"], { relativeTo: this.route });
    //   // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
}
