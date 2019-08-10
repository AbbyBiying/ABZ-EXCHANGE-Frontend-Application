import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import { ImagesService } from "../../services/images.service";
import { Image } from "../image.model";

import { Subscription, Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";

@Component({
  selector: "app-image",
  templateUrl: "./image-detail.component.html",
  styleUrls: ["./image-detail.component.scss"]
})
export class ImageDetailComponent implements OnInit {
  image: Image;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    this.getImage();
  }

  getImage(): void {
    const id = +this.route.snapshot.paramMap.get("id"); // + is to convert string id to number
    this.subscription = this.imagesService
      .getImage(id)
      .subscribe(image => (this.image = image));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
