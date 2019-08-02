import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";

import { NgxSpinnerService } from "ngx-spinner";
import { distinctUntilChanged, debounceTime } from "rxjs/operators";

import { Observable } from "rxjs";
import { Location } from "../../locations/location.model";
import { AuthService } from "../auth.service";
import { LocationsService } from "../../services/locations.service";
import { Router } from "@angular/router";

export interface Location {
  city: string;
  state: string;
}

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit, AfterViewInit {
  isBadCredentials: boolean = false;
  signupForm: FormGroup;
  location: Location;
  signupFormErrors: any;
  forbiddenEmailslist = [
    "example@example.com",
    "test@test.com",
    "test@example.com"
  ];
  forbiddenemails = ["test", "TEST", "Test", "Tester", "tester", "TESTER"];
  selectedFile: File;

  @Input() uploadUrl: string;
  @Input() imgId: string;
  @ViewChild("email", { static: false }) email: ElementRef;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private locationsService: LocationsService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.email],
        this.forbiddenEmails
      ],
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          this.forbiddenNames.bind(this)
        ]
      ],
      password: ["", [Validators.required, Validators.minLength(5)]],
      avatar: [""],
      bio: [""],
      location_id: [""],
      location: this.formBuilder.group({
        number: [""],
        street: [""],
        city: [""],
        state: [""],
        country: [""]
      })
    });

    this.signupForm.statusChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(status =>
        console.log("Showing debounced input status: " + status)
      );

    //showing existing locaions from the rails app
    // this.locationsService.getLocations()
    //   .subscribe((locations) => {
    //     console.log(locations);
    //     this.locations = locations;
    //   });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.email.nativeElement.focus();
    }, 500);
  }

  //   export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  //   return (control: AbstractControl): {[key: string]: any} | null => {
  //     const forbidden = nameRe.test(control.value);
  //     return forbidden ? {'forbiddenName': {value: control.value}} : null;
  //   };
  // }

  // AbstractControl is the base class for FormControl, FormGroup, and FormArray.
  forbiddenNames(control: AbstractControl): { [s: string]: boolean } {
    // when there is forbidden name in the email input
    if (this.forbiddenemails.includes(control.value)) {
      return { ThisNameIsForbidden: true };
    }
    // when there is no forbidden name in the email input
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          //if (this.forbiddenEmailslist.includes(control.value)) {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onFileChanged(event) {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
  }

  onUpload() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);

    const uploadData = new FormData();

    uploadData.append("image", this.selectedFile, this.selectedFile.name);
  }

  onSignup() {
    const data = this.signupForm.getRawValue();

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    // if (data.location.state === "" || data.location.city === "" || data.location_id === "" ) {
    //   data.location_id = 1;
    // }
    console.log(data);

    this.authService.signupUser({ user: data }).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl("/dashboard");
    });

    this.signupForm.reset();
  }
}
