import { Component, OnInit } from '@angular/core';

import { LocationsService } from '../services/locations.service';
import { Location } from './location.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit { 
  locations: Location[];

  constructor(private locationsService: LocationsService) {}

  ngOnInit() {      
    this.locationsService.getLocations()
      .subscribe(
        (locations: Location[]) => this.locations = locations
      )  
  }
}