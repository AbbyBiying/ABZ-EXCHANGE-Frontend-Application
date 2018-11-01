import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Image } from './image.model';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  images: Image[];
  subscription: Subscription;

  constructor(
    private imagesService: ImagesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);   
        
    this.subscription = this.imagesService.imagesChanged
      .subscribe(
        (images: Image[]) => this.images = images
      );

    this.imagesService.getImages()
      .subscribe(
        (images: Image[]) => this.images = images
      );
  }

  onNewimage() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
