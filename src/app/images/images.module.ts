import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";

import { ImagesComponent } from "./images.component";
import { ImagesRoutingModule } from "./images-routing.module";
import { ImageDetailComponent } from "./image-detail/image-detail.component";

@NgModule({
  imports: [CommonModule, ImagesRoutingModule, FlexLayoutModule],
  declarations: [ImagesComponent, ImageDetailComponent]
})
export class ImagesModule {}
