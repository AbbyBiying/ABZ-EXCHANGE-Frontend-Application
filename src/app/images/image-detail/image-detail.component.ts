import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { Image } from '../image.model';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  image: Image;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private imagesService: ImagesService,
  ) { }

  ngOnInit(): void {
    this.getImage();

    this.image = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
      description: this.route.snapshot.params['description'],
      user_id: this.route.snapshot.params['user_id'],
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.image.id = params['id'];
          this.image.name = params['name'];
          this.image.description = params['description'];
          this.image.user_id = params['user_id'];
          
          console.log(this.image);
          console.log("Image");
        }
      );
  }

  getImage(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.imagesService.getImage(id)
      .subscribe(image => this.image = image);
  }
  
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}