import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "../auth.service";
import { AlertComponent } from "../../shared/alert/alert.component";
import { Observable, Subscription } from "rxjs";
import { PlaceholderDirective } from "../../shared/placeholder/placeholder.directive";

import { distinctUntilChanged, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = false;
  error: string = null;
  isBadCredentials: boolean = false;
  signinForm: FormGroup;
  signinFormErrors: any;
  token: string;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  @ViewChild("email", { static: false }) email: ElementRef;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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

  ngOnDestroy() {}
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
