import { Injectable,Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { Image } from '../images/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(private http: HttpClient, private configService: ConfigService) {          
  }

  getImages(): Observable<any> {
    return new Observable(observer => {
      this.http.get("/images")
      .pipe(
        catchError(this.configService.handleError)
      )
      .subscribe((response: HttpResponse<Image[]>) => {
          console.log(response);                
          observer.next(response);
          observer.complete();          
      });
    });
  };

  getImage(id: number): Observable<any>{
    return this.getImages().pipe(
      map((images) => images.find(image => image.id === id))
    );
  }
}