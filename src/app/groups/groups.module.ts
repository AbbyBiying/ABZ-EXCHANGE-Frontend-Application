import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { GroupsComponent } from "./groups.component";
import { GroupDetailComponent } from "../groups/group-detail/group-detail.component";
import { EditGroupComponent } from "../groups/edit-group/edit-group.component";
import { GroupsRoutingModule } from "./groups-routing.module";
import { GroupSearchComponent } from "./group-search/group-search.component";

@NgModule({
  imports: [GroupsRoutingModule, SharedModule],
  declarations: [
    GroupsComponent,
    GroupDetailComponent,
    EditGroupComponent,
    GroupSearchComponent
  ]
})
export class GroupsModule {}
