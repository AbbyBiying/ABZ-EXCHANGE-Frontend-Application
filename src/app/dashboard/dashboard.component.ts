import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { User } from "../users/user.model";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  user: User;
  paramsSubscription: Subscription;
  private id: number;
  currentUser: any;
  currentUserEmail: string;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    //   this.user = {
    //     id: this.route.snapshot.params["id"],
    //     username: this.route.snapshot.params["username"],
    //     email: this.route.snapshot.params["email"],
    //     bio: this.route.snapshot.params["bio"],
    //     location_id: this.route.snapshot.params["location_id"],
    //     location: this.route.snapshot.params["location"],
    //     created_at: this.route.snapshot.params["created_at"],
    //     updated_at: this.route.snapshot.params["updated_at"]
    //   };

    //   this.paramsSubscription = this.route.params.subscribe((params: Params) => {
    //     this.user.id = params["id"];
    //     this.user.username = params["username"];
    //     this.user.bio = params["bio"];
    //     this.user.email = params["email"];
    //     this.user.location_id = params["location_id"];
    //     this.user.location = params["location"];
    //     this.user.created_at = params["created_at"];
    //     this.user.updated_at = params["updated_at"];
    //     console.log(this.user);
    //     console.log("user");
    //   });
    // }
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))["user"];

    console.log(this.currentUser);

    const id = +this.route.snapshot.paramMap.get("id");
    this.usersService.getUser(id).subscribe(user => {
      return (this.user = user);
    });
  }

  // ngOnDestroy() {
  //   this.paramsSubscription.unsubscribe();
  // }
}
