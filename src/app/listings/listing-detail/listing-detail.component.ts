import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { Listing } from '../listing.model';

import { Subscription ,  Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.scss']
})
export class ListingDetailComponent implements OnInit {
  listing: Listing;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService,
  ) { }

  ngOnInit(): void {
    this.getListing();

    this.listing = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
      user_id: this.route.snapshot.params['user_id'],
      description: this.route.snapshot.params['description'],
      created_at: this.route.snapshot.params['created_at'],
      updated_at: this.route.snapshot.params['updated_at'],
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.listing.id = params['id'];
          this.listing.name = params['name'];
          this.listing.user_id = params['user_id'];
          this.listing.description = params['description'];
          this.listing.created_at = params['created_at'],
          this.listing.updated_at = params['updated_at'],
          console.log(this.listing);
          console.log("Listing");
        }
      );
  }

  getListing(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.listingsService.getListing(id)
      .subscribe(listing => this.listing = listing);
  }
  
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}