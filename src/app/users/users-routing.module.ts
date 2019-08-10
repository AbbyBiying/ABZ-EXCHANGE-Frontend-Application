import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "../auth/auth-guard.service";
import { UsersComponent } from "./users.component";
import { UserDetailComponent } from "../users/user-detail/user-detail.component";
import { EditUserComponent } from "../users/edit-user/edit-user.component";

const usersRoutes: Routes = [
  { path: "", component: UsersComponent },
  // { path: ":id/:username", component: UserDetailComponent }, // the colon simply tells Angular that this is a dynamic part of the path.
  { path: ":id", component: UserDetailComponent }, // the colon simply tells Angular that this is a dynamic part of the path.
  {
    path: ":id/edit",
    component: EditUserComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
