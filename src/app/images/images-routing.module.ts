import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { ImagesComponent } from './images.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';

const imagesRoutes: Routes = [
  { path: '', component: ImagesComponent },  
  { path: ':id', component: ImageDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(imagesRoutes)
  ],
  exports: [RouterModule],

})
export class ImagesRoutingModule { }
