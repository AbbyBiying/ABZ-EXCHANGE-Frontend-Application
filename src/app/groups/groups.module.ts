import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
// material
import { ErrorStateMatcher } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";

import { GroupsComponent } from "./groups.component";
import { GroupDetailComponent } from "../groups/group-detail/group-detail.component";
import { EditGroupComponent } from "../groups/edit-group/edit-group.component";
import { GroupsRoutingModule } from "./groups-routing.module";
import { GroupSearchComponent } from "./group-search/group-search.component";

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
    GroupsRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    GroupsComponent,
    GroupDetailComponent,
    EditGroupComponent,
    GroupSearchComponent
  ]
})
export class GroupsModule {}
