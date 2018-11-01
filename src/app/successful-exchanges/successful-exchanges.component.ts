import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SuccessfulExchange } from './successfulExchange.model';
import { SuccessfulExchangesService } from '../services/successfulExchanges.service';

@Component({
  selector: 'app-successfulexchangess',
  templateUrl: './successful-exchanges.component.html',
  styleUrls: ['./successful-exchanges.component.scss']
})
export class SuccessfulExchangesComponent implements OnInit {
  successfulexchanges: SuccessfulExchange[];
  subscription: Subscription;

  constructor(
    private successfulexchangesService: SuccessfulExchangesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);   
        
    this.subscription = this.successfulexchangesService.getSuccessfulExchanges()
      .subscribe(
        (successfulexchanges: SuccessfulExchange[]) => this.successfulexchanges = successfulexchanges
      );

    this.successfulexchangesService.getSuccessfulExchanges()
      .subscribe(
        (successfulexchanges: SuccessfulExchange[]) => this.successfulexchanges = successfulexchanges
      );
  }

  onNewlisting() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}