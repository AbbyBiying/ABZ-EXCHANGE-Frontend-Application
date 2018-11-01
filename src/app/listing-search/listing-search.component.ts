import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { ListingsService } from '../services/listings.service';
import { Listing } from '../listings/listing.model';

@Component({
  selector: 'app-listing-search',
  templateUrl: './listing-search.component.html',
  styleUrls: ['./listing-search.component.scss']
})
export class ListingSearchComponent implements OnInit {
  listings$: Observable<Listing[]>;

  private searchTerms = new Subject<string>();

  constructor(private listingsService: ListingsService) {}
  
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
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
