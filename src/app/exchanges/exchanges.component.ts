import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { Exchange } from './exchange.model';
import { ExchangesService } from '../services/exchanges.service';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss']
})
export class ExchangesComponent implements OnInit {
  exchanges: Exchange[];
  subscription: Subscription;

  constructor(
    private exchangesService: ExchangesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {  
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);   

    this.subscription = this.exchangesService.exchangesChanged
    .subscribe(
      (exchanges: Exchange[]) => {
        this.exchanges = exchanges;
      }
    );

    this.exchangesService.getExchanges()
      .subscribe(
       (exchanges: Exchange[]) => this.exchanges = exchanges
      )  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
