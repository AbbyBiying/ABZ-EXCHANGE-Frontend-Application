import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { LocationsService } from '../services/locations.service';
import { Location } from './location.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit { 
  locations: Location[];
  subscription: Subscription;

  constructor(
    private locationsService: LocationsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
    ) {}


  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);   

    this.subscription = this.locationsService.locationsChanged
      .subscribe(
        (locations: Location[]) => {
          this.locations = locations;
        }
      );

    this.locationsService.getLocations()
      .subscribe(
        (locations: Location[]) => this.locations = locations
      );  
  }

  onNewlocation() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}