import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import { UsersService } from "../../services/users.service";
import { User } from "../user.model";

import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  user: User;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();

    // this.user = {
    //   id: this.route.snapshot.params["id"],
    //   username: this.route.snapshot.params["username"],
    //   email: this.route.snapshot.params["email"],
    //   location_id: this.route.snapshot.params["location_id"],
    //   bio: this.route.snapshot.params["bio"],
    //   location: this.route.snapshot.params["location"],
    //   created_at: this.route.snapshot.params["created_at"],
    //   updated_at: this.route.snapshot.params["updated_at"]
    // };
    // this.subscription = this.route.params.subscribe((params: Params) => {
    //   this.user.id = params["id"];
    //   this.user.username = params["username"];
    //   this.user.email = params["email"];
    //   this.user.location = params["location"];
    //   this.user.bio = params["bio"];
    //   this.user.location_id = params["location_id"];
    //   this.user.created_at = params["created_at"];
    //   this.user.updated_at = params["updated_at"];
    // });
  }
  getUser(): void {
    const id = +this.route.snapshot.paramMap.get("id"); // + is to convert string id to number
    this.subscription = this.usersService
      .getUser(id)
      .subscribe(user => (this.user = user));
  }
  ngAfterViewInit() {
    console.log(`AfterViewInit`);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
