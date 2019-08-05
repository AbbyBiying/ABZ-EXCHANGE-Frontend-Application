import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { NgxSpinnerModule } from "ngx-spinner";

import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule, NgxSpinnerModule],
  declarations: [SigninComponent, SignupComponent]
})
export class AuthModule {}
