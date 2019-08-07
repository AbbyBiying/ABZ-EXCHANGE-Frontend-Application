import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { throwError, of } from "rxjs";

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("Client-side error occured: ", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Server-side error occured, returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    // return an observable with a user-facing error message
    // return throwError("Something bad happened; please try again later.");
    return throwError(error.error);
  }
}
