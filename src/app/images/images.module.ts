import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ImagesComponent } from "./images.component";
import { ImagesRoutingModule } from "./images-routing.module";
import { ImageDetailComponent } from "./image-detail/image-detail.component";

@NgModule({
  imports: [ImagesRoutingModule, SharedModule],
  declarations: [ImagesComponent, ImageDetailComponent]
})
export class ImagesModule {}
