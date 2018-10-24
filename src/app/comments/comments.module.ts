import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// material
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { CommentsComponent } from './comments.component';
import { CommentDetailComponent } from '../comments/comment-detail/comment-detail.component';

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
  ],
  declarations: [
    CommentsComponent,
    CommentDetailComponent,
  ]
})
export class ExchangesModule { }
