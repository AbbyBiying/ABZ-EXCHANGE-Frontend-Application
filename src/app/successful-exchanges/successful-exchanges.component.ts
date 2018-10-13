import { Component, OnInit } from '@angular/core';

import { SuccessfulExchange } from './successfulExchange.model';
import { SuccessfulExchangesService } from '../services/successfulExchanges.service';

@Component({
  selector: 'app-successfulexchangess',
  templateUrl: './successful-exchanges.component.html',
  styleUrls: ['./successful-exchanges.component.scss']
})
export class SuccessfulExchangesComponent implements OnInit {
  successfulexchanges: SuccessfulExchange[];

  constructor(private successfulexchangesService: SuccessfulExchangesService) {}

  ngOnInit() {  
    this.successfulexchangesService.getSuccessfulExchanges()
      .subscribe(
       (successfulexchanges: SuccessfulExchange[]) => this.successfulexchanges = successfulexchanges
      )  
    }
}