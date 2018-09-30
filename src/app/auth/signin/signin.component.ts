import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { LocationsService } from '../../services/locations.service';
import { UsersService } from '../../services/users.service';
import { AngularTokenModule } from 'angular-token';
import { AngularTokenService } from 'angular-token';

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
  @ViewChild('password') passwordElement: ElementRef;

  constructor(
    private authService: AuthService,         
    private formBuilder: FormBuilder,
    private usersService: UsersService, 
    private http: HttpClient,
    private tokenService: AngularTokenService
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

  onSubmit() {  

    const data = this.signinForm.getRawValue();
    console.log(data);    

    this.usersService.signIn(data).subscribe((response) => {

      console.log(response);        

    });    
    this.signinForm.reset();

      // this.tokenService.signIn({
      //   email:    'bi802802@gmail.com',
      //   password: 'bi802802'
      //   }).subscribe(
      //       res =>      console.log(res),
      //       error =>    console.log(error)
      //   ); 
  }

}
