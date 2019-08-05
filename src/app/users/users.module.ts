import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";
import { UserDetailComponent } from "../users/user-detail/user-detail.component";
import { EditUserComponent } from "../users/edit-user/edit-user.component";
import { UsersRoutingModule } from "./users-routing.module";
import { UserSearchComponent } from "../users/user-search/user-search.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [UsersRoutingModule, SharedModule],
  declarations: [
    UsersComponent,
    UserDetailComponent,
    EditUserComponent,
    UserSearchComponent
  ]
})
export class UsersModule {}
