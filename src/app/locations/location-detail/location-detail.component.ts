import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Location } from '@angular/common';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../location.model';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})

export class LocationDetailComponent implements OnInit, OnDestroy {
  location: Location;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private locationsService: LocationsService,
    // private location: Location
    ) { }

  ngOnInit(): void {
    this.getLocation();

    this.location = {
      id: this.route.snapshot.params['id'],
      city: this.route.snapshot.params['city'],
      state: this.route.snapshot.params['state'],
      country: this.route.snapshot.params['country'],
      longitude: this.route.snapshot.params['longitude'],
      latitude: this.route.snapshot.params['latitude'],
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.location.id = params['id'];
          this.location.city = params['city'];
          this.location.state = params['state'];
          this.location.country = params['country'];
          this.location.latitude = params['latitude'];
          this.location.longitude = params['longitude'];
          console.log(this.location);
          console.log("location");
        }
      );
  }

  getLocation(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.locationsService.getLocation(id)
      .subscribe(location => this.location = location);
  }
  
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}