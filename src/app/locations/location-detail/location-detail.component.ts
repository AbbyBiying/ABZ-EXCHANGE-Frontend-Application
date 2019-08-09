import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Location } from '@angular/common';
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import { LocationsService } from "../../services/locations.service";
import { Location } from "../location.model";

import { Subscription, Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";

@Component({
  selector: "app-location",
  templateUrl: "./location-detail.component.html",
  styleUrls: ["./location-detail.component.scss"]
})
export class LocationDetailComponent implements OnInit, OnDestroy {
  location: Location;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private locationsService: LocationsService // private location: Location
  ) {}

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.locationsService
      .getLocation(id)
      .subscribe(location => (this.location = location));
  }

  ngOnDestroy() {
    // this.paramsSubscription.unsubscribe();
  }
}
