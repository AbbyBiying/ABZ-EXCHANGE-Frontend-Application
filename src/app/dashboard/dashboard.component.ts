import { Component, OnInit, OnChanges, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { User } from "../users/user.model";
import { UsersService } from "../services/users.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnChanges {
  editMode = false;
  userForm: FormGroup;
  user: User;

  paramsSubscription: Subscription;
  private id: number;
  currentUser: any;
  currentUserEmail: string;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  ngOnChanges() {}
  ngOnInit() {
    this.currentUser = this.authService.currentUserValue["user"];
    console.log(this.currentUser);

    this.usersService.getCurrentUser().subscribe(user => {
      console.log("current user");
      console.log(user);
      this.user = user;
      this.initForm();
    });
  }

  onEdit() {
    this.editMode = true;
    // this.router.navigate(["edit"], {
    //   relativeTo: this.route,
    //   queryParamsHandling: "preserve"
    // });
    console.log("edit mode true");
  }

  onSubmit() {
    this.usersService.updateUser(this.user).subscribe(user => {
      console.log("Current user updated!");
      console.log(user);
      return (this.user = user);
    });
    console.log(this.user);

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    console.log("this.user");
    console.log(this.user);
    // if (this.editMode) {
    let useremail = this.user["email"];
    let userName = this.user.username;
    let userBio = this.user.bio;
    let userLocationId = this.user.location_id;
    let userLocation = this.user.location;
    let userCreatedAt = this.user.created_at;
    let userUpdatedAt = this.user.updated_at;

    this.userForm = new FormGroup({
      name: new FormControl(userName, Validators.required),
      email: new FormControl(useremail, Validators.required),
      bio: new FormControl(userBio),
      location_id: new FormControl(userLocationId, Validators.required)
    });
  }
  // }
}
