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
  signupForm: FormGroup;
  location: FormGroup;
  signupFormErrors: any; 
  forbiddenEmailslist = ['example@example.com', 'test@test.com', 'test@example.com'];  
  forbiddenemails = ['test', 'TEST', 'Test', 'Tester', 'tester', 'TESTER'];
  selectedFile: File;
  locations: Location[] = [];
  
  @Input() uploadUrl: string;
  @Input() imgId: string;
  @ViewChild('email') email: ElementRef;

  constructor(
    private authService: AuthService,         
    private formBuilder: FormBuilder,
    private locationsService: LocationsService,     
    private usersService: UsersService, 
    private http: HttpClient,
    ) {
  }

  ngOnInit() {      
    this.signupForm = this.formBuilder.group({      
      username: ['', [Validators.required, Validators.minLength(2), this.forbiddenNames.bind(this)]],
      email: ['', [Validators.required, Validators.email], this.forbiddenEmails],
      password: ['', [Validators.required, Validators.minLength(5)]],
      avatar: [''],
      bio: [''],
      location_id: [''],
      location: this.formBuilder.group({
        city: [''],
        state: ['']
      })
    });

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
    // when there is forbidden name in the email input
    if (this.forbiddenemails.includes(control.value)) {
      return {'ThisNameIsForbidden': true};
    }
    // when there is no forbidden name in the email input
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

  onSignup() {
    const data = this.signupForm.getRawValue();

    if (data.location.state === "" || data.location.city === "" || data.location_id === "" ) {
      data.location_id = 1;
    }
    console.log(data);    

    this.authService.signupUser({"user":data}).subscribe((response) => {
 
      console.log(response);        

      });    
    this.signupForm.reset();
  } 
}