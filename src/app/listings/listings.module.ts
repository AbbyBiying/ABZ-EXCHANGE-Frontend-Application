import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// material
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ListingsComponent } from './listings.component';
import { ListingDetailComponent } from '../listings/listing-detail/listing-detail.component';
import { EditListingComponent } from '../listings/edit-listing/edit-listing.component';
import { ListingsRoutingModule } from './listings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    ListingsRoutingModule
  ],
  declarations: [
    ListingsComponent,
    ListingDetailComponent,
    EditListingComponent
  ]
})
export class ListingsModule { }
