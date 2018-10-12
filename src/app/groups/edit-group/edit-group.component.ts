import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  groupForm: any;

  constructor(
    private groupsService: GroupsService, 
    private http: HttpClient,     
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {      
    this.groupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      tags: new FormArray([])
    });
  }

  onSubmit(){
    console.log(this.groupForm);
  }

  onAddTags() {
    const control = new FormControl(null, Validators.required);

    (<FormArray>this.groupForm.get('tags')).push(control);
  }
}
