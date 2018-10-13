import { Component, OnInit } from '@angular/core';

import { Exchange } from './exchange.model';
import { ExchangesService } from '../services/exchanges.service';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.scss']
})
export class ExchangesComponent implements OnInit {
  exchanges: Exchange[];

  constructor(private exchangesService: ExchangesService) {}

  ngOnInit() {  
    this.exchangesService.getExchanges()
      .subscribe(
       (exchanges: Exchange[]) => this.exchanges = exchanges
      )  
    }
}
