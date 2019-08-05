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
  isBadCredentials: boolean = false;
  signinForm: FormGroup;
  signinFormErrors: any;
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
    this.spinner.show();
    this.authService.signinUser({ user: data }).subscribe(response => {
      console.log("response");
      console.log(response);
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    this.signinForm.reset();
    this.router.navigateByUrl("/dashboard");
  }
}
