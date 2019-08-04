import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// material
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FlexLayoutModule } from "@angular/flex-layout";

import { UsersComponent } from "./users.component";
import { UserDetailComponent } from "../users/user-detail/user-detail.component";
import { EditUserComponent } from "../users/edit-user/edit-user.component";
import { UsersRoutingModule } from "./users-routing.module";
import { UserSearchComponent } from "../users/user-search/user-search.component";

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
    UsersRoutingModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    FlexLayoutModule
  ],
  declarations: [
    UsersComponent,
    UserDetailComponent,
    EditUserComponent,
    UserSearchComponent
  ]
})
export class UsersModule {}
