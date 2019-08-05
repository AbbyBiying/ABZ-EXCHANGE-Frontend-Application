import { Component, OnInit } from "@angular/core";

import { Observable, Subject } from "rxjs";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { LocationsService } from "../../services/locations.service";
import { Location } from "../location.model";

@Component({
  selector: "app-location-search",
  templateUrl: "./location-search.component.html",
  styleUrls: ["./location-search.component.scss"]
})
export class LocationSearchComponent implements OnInit {
  location$: Observable<Location[]>;

  private searchTerms = new Subject<string>();
  subscription: Subscription;

  constructor(private locationsService: LocationsService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.location$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.locationsService.searchLocations(term))
    );
  }
}
