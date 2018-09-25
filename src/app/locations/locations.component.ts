import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationsService } from '../services/locations.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit { 
  locations = [];

  constructor(private locationsService: LocationsService, private http: HttpClient) {          
  }

  ngOnInit() {  
    this.locationsService.getLocations()
      .subscribe((locations) => {
        console.log(locations);        
        this.locations = locations;
      })  
    }
}
