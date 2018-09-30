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

export interface Location {
  city: string;
  state: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
  isBadCredentials: boolean = false;
  signupForm: any;
  signupFormErrors: any; 
  forbiddenEmailslist = ['example@example.com', 'test@test.com', 'test@example.com'];  
  forbiddenUserNames = ['test', 'TEST', 'Test', 'Tester', 'tester', 'TESTER'];
  selectedFile: File;
  locations:Location[] = [];
  // locations: Location[] = [
  //   {city: 'New York', state: 'NY'},
  //   {city: 'Irvine', state: 'CA'}
  // ];
  
  @Input() uploadUrl: string;
  @Input() imgId: string;

  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(
    private authService: AuthService,         
    private formBuilder: FormBuilder,
    private locationsService: LocationsService,     
    private usersService: UsersService, 
    private http: HttpClient,
    private tokenService: AngularTokenService
    ) {
  }

  ngOnInit() {      
    this.signupForm = this.formBuilder.group({      
      username: ['', [Validators.required, Validators.minLength(2), this.forbiddenNames.bind(this)]],
      email: ['', [Validators.required, Validators.email], this.forbiddenEmails],
      password: ['', [Validators.required, Validators.minLength(5)]],
      bio: [''],
      userAvatar: [''],
      userCity: [''],
      userState: [''],
      userLocation: ['']
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );


    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
    
    //showing existing locaions from the rails app
    this.locationsService.getLocations()
      .subscribe((locations) => {
        console.log(locations);        
        this.locations = locations;

      });  
    
  }

  ngAfterViewInit(): void {
      setTimeout(()=> {
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
  forbiddenNames(control: AbstractControl): {[s: string]: boolean} {
    // when there is forbidden name in the username input
    if (this.forbiddenUserNames.includes(control.value)) {
      return {'ThisNameIsForbidden': true};
    }
    // when there is no forbidden name in the username input
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {

        //if (this.forbiddenEmailslist.includes(control.value)) {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onFileChanged(event){
    const selectedFile = event.target.files[0];    
    console.log(selectedFile);

  }

  onUpload() {
    const uploadData = new FormData();

    uploadData.append('image', this.selectedFile, this.selectedFile.name);

   
  }

  onSubmit() {
      
    // const data = this.signupForm.getRawValue();
    // console.log(data);    
    // if (data.location === undefined || data.location === null) {
    //   data.userCity = 'New York';
    //   data.userState = 'NY';
    // }
    // this.usersService.signUp(data).subscribe((response) => {

    //     console.log(response);        

    //   });    
    // this.signupForm.reset();

  } 
}
