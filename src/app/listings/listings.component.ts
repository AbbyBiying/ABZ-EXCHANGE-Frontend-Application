import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingsService } from '../services/listings.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  listings = [];

  constructor(
    private listingsService: ListingsService, 
    private http: HttpClient,     
  ) {}
  
  ngOnInit() {     
    
    this.listingsService.getListings()
      .subscribe(
        (listings: any[]) => this.listings = listings
      )  
  }
}
