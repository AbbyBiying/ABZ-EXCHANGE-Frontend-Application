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
  locations:Location[] = [];
  // locations: Location[] = [
  //   {city: 'New York', state: 'NY'},
  //   {city: 'Irvine', state: 'CA'}
  // ];
  
  @Input() uploadUrl: string;
  @Input() imgId: string;

  @ViewChild('userEmail') emailElement: ElementRef;
  @ViewChild('userPassword') passwordElement: ElementRef;

  constructor(
    private authService: AuthService,         
    private formBuilder: FormBuilder,
    private locationsService: LocationsService, 
    private http: HttpClient
  ) { }

  ngOnInit() {      
    this.signupForm = this.formBuilder.group({      
      userName: ['', [Validators.required, Validators.minLength(2), this.forbiddenNames.bind(this)]],
      userEmail: ['', [Validators.required, Validators.email], this.forbiddenEmails],
      userPassword: ['', [Validators.required, Validators.minLength(5)]],
      userBio: [''],
      userAvatar: [''],
      userCity: ['', [Validators.required]],
      userState: ['', [Validators.required]],
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
        this.emailElement.nativeElement.focus();
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

  handleFileInput(files: FileList) {
      if (files.length === 0) return;
      const params = {
          id: this.imgId
      }; 
  }

  onSubmit() {
    console.log(this.signupForm);    
    this.signupForm.reset();

  }
}
