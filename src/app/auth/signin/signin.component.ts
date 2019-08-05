import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../auth.service";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit, AfterViewInit {
  isLoading = false;
  error: string = null;
  isBadCredentials: boolean = false;
  signinForm: FormGroup;
  signinFormErrors: any;
  token: string;

  @ViewChild("email", { static: false }) email: ElementRef;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    this.signinForm.statusChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(status =>
        console.log("Showing debounced input status: " + status)
      );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.email.nativeElement.focus();
    }, 500);
  }

  onSignin() {
    const data = this.signinForm.getRawValue();
    this.isLoading = true;
    this.authService.signinUser({ user: data }).subscribe(
      data => {
        if (data !== null) {
          this.token = data["token"];
          localStorage.setItem("authToken", this.token);

          console.log("Signed in! Current User data:");
          console.log(data);
          this.isLoading = false;

          this.router.navigate(["/dashboard"]);
        }
      },
      err => {
        this.error = err.error;
        console.log("HTTP Error", err);
        this.isLoading = false;
      }
    );

    this.signinForm.reset();
  }
}
