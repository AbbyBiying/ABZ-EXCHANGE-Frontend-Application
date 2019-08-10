import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "../auth/auth-guard.service";
import { GroupsComponent } from "./groups.component";
import { GroupDetailComponent } from "../groups/group-detail/group-detail.component";
import { EditGroupComponent } from "../groups/edit-group/edit-group.component";

const groupsRoutes: Routes = [
  { path: "", component: GroupsComponent },
  // { path: ":id/:name", component: GroupDetailComponent },
  { path: ":id", component: GroupDetailComponent },
  { path: "new", component: EditGroupComponent },
  {
    path: ":id/edit",
    component: EditGroupComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(groupsRoutes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
