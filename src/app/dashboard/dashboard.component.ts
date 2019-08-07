import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { User } from "../users/user.model";
import { UsersService } from "../services/users.service";
import { AuthService } from "../auth/auth.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  user: User;
  current: any;
  paramsSubscription: Subscription;
  private id: number;
  currentUser: any;
  currentUserEmail: string;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    // this.currentUser = JSON.parse(localStorage.getItem("currentUser"))["user"];
    this.currentUser = this.authService.currentUserValue["user"];
    console.log(this.currentUser);

    const id = +this.route.snapshot.paramMap.get("id");
    this.usersService.getUser(id).subscribe(user => {
      return (this.user = user);
    });
  }
}
