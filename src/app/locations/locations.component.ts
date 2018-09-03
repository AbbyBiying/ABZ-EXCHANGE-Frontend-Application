import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationsService } from '../services/locations.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit { 
  locations = [];

  constructor(private locationsService: LocationsService, private http: HttpClient, private configService: ConfigService) {          
  }

  ngOnInit() {  
    this.locationsService.getLocations()
      .subscribe((data) => {
        console.log(data);        
        this.locations = data;
      })  
    }
}
