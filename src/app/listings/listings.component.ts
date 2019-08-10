import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { Listing } from "./listing.model";
import { ListingsService } from "../services/listings.service";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.component.html",
  styleUrls: ["./listings.component.scss"]
})
export class ListingsComponent implements OnInit {
  listings: Listing[];
  subscription: Subscription;

  constructor(
    private listingsService: ListingsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.listingsService.listingsChanged.subscribe(
      (listings: Listing[]) => (this.listings = listings)
    );

    this.listingsService
      .getListings()
      .subscribe((listings: Listing[]) => (this.listings = listings));
  }

  onNewlisting() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
