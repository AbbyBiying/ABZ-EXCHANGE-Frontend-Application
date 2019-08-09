import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import { ExchangesService } from "../../services/exchanges.service";
import { Exchange } from "../exchange.model";

import { Subscription } from "rxjs";

@Component({
  selector: "app-exchange",
  templateUrl: "./exchange-detail.component.html",
  styleUrls: ["./exchange-detail.component.scss"]
})
export class ExchangeDetailComponent implements OnInit {
  exchange: Exchange;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private exchangesService: ExchangesService
  ) {}

  ngOnInit(): void {
    this.getExchange();
  }

  getExchange(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.exchangesService
      .getExchange(id)
      .subscribe(exchange => (this.exchange = exchange));
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
