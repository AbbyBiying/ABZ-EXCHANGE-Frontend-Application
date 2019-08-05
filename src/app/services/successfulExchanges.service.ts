import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

import { ConfigService } from "../config/config.service";
import { SuccessfulExchange } from "../successful-exchanges/successfulExchange.model";

@Injectable({
  providedIn: "root"
})
export class SuccessfulExchangesService {
  successfulexchangesChanged = new Subject<SuccessfulExchange[]>();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  /** GET successful exchanges from the server */
  getSuccessfulExchanges(): Observable<any> {
    return this.http.get(`/successful_exchanges`).pipe(
      tap(_ => console.log("fetched all successfulexchanges")),
      catchError(this.configService.handleError)
    );
  }

  /** GET successful exchange by id. Return `undefined` when id not found */
  getSuccessfulExchangeNo404<Data>(id: number): Observable<any> {
    const url = `/successful_exchanges/?id=${id}`;
    return this.http.get<SuccessfulExchange[]>(url).pipe(
      map(successfulexchanges => successfulexchanges[0]), // returns a {0|1} element array
      tap(g => {
        const outcome = g ? `fetched` : `did not find`;
        console.log(`${outcome} successfulexchange id=${id}`);
      }),
      catchError(this.configService.handleError)
    );
  }

  /** GET successful exchange by id. Will 404 if id not found */
  getSuccessfulExchange(id: number): Observable<any> {
    return this.getSuccessfulExchanges().pipe(
      tap(_ => console.log(`fetched successfulexchange  id=${id}`)),
      map(successfulexchanges =>
        successfulexchanges.find(
          successfulexchange => successfulexchange.id === id
        )
      ),
      catchError(this.configService.handleError)
    );
  }
}
