import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ExchangesService } from '../../services/exchanges.service';
import { Exchange } from '../exchange.model';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange-detail.component.html',
  styleUrls: ['./exchange-detail.component.scss']
})
export class ExchangeDetailComponent implements OnInit {
  exchange: Exchange;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private exchangesService: ExchangesService,
  ) { }

  ngOnInit(): void {
    this.getExchange();

    this.exchange = {
      id: this.route.snapshot.params['id'],
      listing_id: this.route.snapshot.params['listing_id'],
      offer_id: this.route.snapshot.params['offer_id'],
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.exchange.id = params['id'];
          this.exchange.listing_id = params['listing_id'];
          this.exchange.offer_id = params['offer_id'];
          console.log(this.exchange);
          console.log("Exchange");
        }
      );
  }

  getExchange(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.exchangesService.getExchange(id)
      .subscribe(exchange => this.exchange = exchange);
  }
  
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}