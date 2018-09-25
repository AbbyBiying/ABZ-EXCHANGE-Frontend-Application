import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {
 
  isBadCredentials: boolean = false;
  signinForm: FormGroup;
  signinFormErrors: any;  
  @ViewChild('email') email: ElementRef;
  
  constructor(
    private authService: AuthService,         
    private formBuilder: FormBuilder,
    private http: HttpClient,

    ){}
  

  ngOnInit() {      
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
      setTimeout(()=> {
        this.email.nativeElement.focus();
      }, 500);
  }

  onSignin() {
    const data = this.signinForm.getRawValue();
    // console.log(data);       

    this.authService.signinUser({"user":data}).subscribe((response) => {

       console.log(response);        

    });    
    this.signinForm.reset();

  }

}
