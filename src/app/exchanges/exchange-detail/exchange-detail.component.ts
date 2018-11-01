import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ExchangesService } from '../../services/exchanges.service';
import { Exchange } from '../exchange.model';

import { Subscription } from 'rxjs';

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
      created_at: this.route.snapshot.params['created_at'],
      updated_at: this.route.snapshot.params['updated_at'],
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.exchange.id = params['id'];
          this.exchange.listing_id = params['listing_id'];
          this.exchange.offer_id = params['offer_id'];
          this.exchange.created_at = params['created_at'];
          this.exchange.updated_at = params['updated_at'];
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