import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { SuccessfulExchangesService } from '../../services/successfulExchanges.service';
import { SuccessfulExchange } from '../successfulExchange.model';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-successfulexchange',
  templateUrl: './successful-exchange-detail.component.html',
  styleUrls: ['./successful-exchange-detail.component.scss']
})

export class SuccessfulExchangeDetailComponent implements OnInit, OnDestroy {
  successfulexchange: SuccessfulExchange;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private SuccessfulExchangesService: SuccessfulExchangesService,
    private location: Location) { }

  ngOnInit(): void {
    this.getSuccessfulExchange();

    this.successfulexchange = {
      id: this.route.snapshot.params['id'],
      exchange_id: this.route.snapshot.params['exchange_id'],
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.successfulexchange.id = params['id'];
          this.successfulexchange.exchange_id = params['exchange_id'];
          console.log(this.successfulexchange);
          console.log("successfulexchange");
        }
      );
  }

  getSuccessfulExchange(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.SuccessfulExchangesService.getSuccessfulExchange(id)
      .subscribe(successfulexchange => this.successfulexchange = successfulexchange);
  }
  
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}