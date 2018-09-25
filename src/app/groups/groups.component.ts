import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups = [];
  groupForm: any;

  constructor(
    private groupsService: GroupsService, 
    private http: HttpClient,     
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {      
    this.groupForm = this.formBuilder.group({
      groupName: ['', [Validators.required, Validators.minLength(2)]],
      groupDescription: [''],
      tags: new FormArray([])
    });

    this.groupsService.getGroups()
      .subscribe(
        (groups: any[]) => this.groups = groups
      )  
  }

  onSubmit(){
    console.log(this.groupForm);
  }

  onAddTags() {
    const control = new FormControl(null, Validators.required);

    (<FormArray>this.groupForm.get('tags')).push(control);
  }
}
   