import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingsService } from '../services/listings.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  listings = [];

  constructor(private listingsService: ListingsService, private http: HttpClient, private configService: ConfigService) {          
  }

  ngOnInit() {  
    this.listingsService.getListings()
      .subscribe((data) => {
        console.log(data);        
        this.listings = data;
      })  
    }
}
