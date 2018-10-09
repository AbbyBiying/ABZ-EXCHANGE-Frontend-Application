import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingsService } from '../services/listings.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.scss']
})
export class EditListingComponent implements OnInit {
  listingForm: any;

  constructor(
    private listingsService: ListingsService, 
    private http: HttpClient,     
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit() {    
    this.listingForm = this.formBuilder.group({
      listingName: ['', [Validators.required, Validators.minLength(2)]],
      listingDescription: [''],
      tags: new FormArray([])

    });
  }  

  onSubmit(){
    console.log(this.listingForm);
  }

  onAddTags() {
    const control = new FormControl(null, Validators.required);

    (<FormArray>this.listingForm.get('tags')).push(control);
  }

}
