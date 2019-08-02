import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { ListingsService } from '../../services/listings.service';
import { Listing } from '../listing.model';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-listing-search',
  templateUrl: './listing-search.component.html',
  styleUrls: ['./listing-search.component.scss']
})
export class ListingSearchComponent implements OnInit {
  listings$: Observable<Listing[]>;
  allListings: Listing[];

  private searchTerms = new Subject<string>();
  subscription: Subscription;

  constructor(private listingsService: ListingsService) {}
  
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.subscription = this.listingsService.getListings()
    .subscribe(
      (listings: Listing[]) => {
        console.log(listings);
        return this.allListings = listings;

      }
    );
    
    this.listings$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.listingsService.searchListings(term)),
    );
  }
}
