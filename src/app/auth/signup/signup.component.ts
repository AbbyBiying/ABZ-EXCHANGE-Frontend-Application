import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from '../auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

export interface Location {
  city: string;
  state: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, ngAfterViewInit, ErrorStateMatcher {
  isBadCredentials: boolean = false;
  signupForm: FormGroup;
  signupFormErrors: any; 

  locations: Location[] = [
    {city: 'New York', state: 'NY'},
    {city: 'Irvine', state: 'CA'}

  ];
  
  @ViewChild('userEmail') emailElement: ElementRef;
  @ViewChild('userPassword') passwordElement: ElementRef;

  constructor(
    private authService: AuthService,         
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {      
    this.signupForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required]],
      userBio: [''],
      userCity: ['', [Validators.required]],
      userState: ['', [Validators.required]],
    });
  }

  // onSignup(form: NgForm) {
  //   const userEmail = form.value.userEmail;
  //   const userPassword = form.value.userPassword;
  //   this.authService.signupUser(userEmail, userPassword);
  // }

  ngAfterViewInit(): void {
      setTimeout(()=> {
        this.emailElement.nativeElement.focus();
      }, 500);
  }

  getErrorMessage() {
    return this.emailElement.hasError('required') ? 'You must enter a value' :
        this.emailElement.hasError('email') ? 'Not a valid email' :
            '';
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
