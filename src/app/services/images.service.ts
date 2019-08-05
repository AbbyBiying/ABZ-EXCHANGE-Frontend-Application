import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

import { ConfigService } from "../config/config.service";
import { Image } from "../images/image.model";

@Injectable({
  providedIn: "root"
})
export class ImagesService {
  imagesChanged = new Subject<Image[]>();

  constructor(private http: HttpClient, private configService: ConfigService) {}
  /** GET imagees from the server */
  getImages(): Observable<any> {
    return this.http.get(`/images`).pipe(
      tap(_ => console.log("fetched all images")),
      catchError(this.configService.handleError)
    );
  }

  /** GET image by id. Return `undefined` when id not found */
  getImageNo404<Data>(id: number): Observable<any> {
    const url = `/image/?id=${id}`;
    return this.http.get<Image[]>(url).pipe(
      map(imagees => imagees[0]), // returns a {0|1} element array
      tap(g => {
        const outcome = g ? `fetched` : `did not find`;
        console.log(`${outcome} image id=${id}`);
      }),
      catchError(this.configService.handleError)
    );
  }
  /** GET image by id. Will 404 if id not found */
  getImage(id: number): Observable<any> {
    return this.getImages().pipe(
      tap(_ => console.log(`fetched image id=${id}`)),
      map(images => images.find(image => image.id === id)),
      catchError(this.configService.handleError)
    );
  }

  /* GET images whose name contains search term */
  searchImages(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty image array.
      return of([]);
    }
    return this.http.get<any[]>(`/images/?images[name]${term}`).pipe(
      tap(_ => console.log(`found images matching "${term}"`)),
      catchError(this.configService.handleError)
    );
  }

  /** PUT: update the image on the server */
  updateImage(image): Observable<any> {
    return this.http.put(`/images/${image.id}`, image).pipe(
      tap(_ => console.log(`updated image id=${image.id}`)),
      catchError(this.configService.handleError)
    );
  }
}
