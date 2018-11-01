import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GroupsService } from '../../services/groups.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Group } from '../../groups/group.model';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  id: number;
  editMode = false;
  groupForm: FormGroup;
  paramsSubscription: Subscription;
  groups: Group[];

  constructor(
    private groupsService: GroupsService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private location: Location
  ) {}

  ngOnInit() {   
    this.getGroups();

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
   }
  
  goBack(): void {
    this.location.back();
  }

  getGroups(){
    this.groupsService.getGroups()      
    .subscribe((groups: Group[]) => {
      this.groups = groups;
  });
  }

  onSubmit(){
    const data = this.groupForm.value;

    data.user_id = 1;
    data.location_id = 1;
    console.warn(data);  

    if (this.editMode) {
      console.log("update mode");
      this.groupsService.updateGroup({"group":data})
      .subscribe(() => {
        this.goBack()
        this.groupsService.groupsChanged.next(this.groups);
      });
    } else {
      console.log("add mode");
      this.groupsService.addGroup({"group":data}) 
      .subscribe(group => {
        this.groups.push(group);
        this.groupsService.groupsChanged.next(this.groups);
        this.goBack();
      });  
    }
    this.onClear();
  }

  onDelete() {
    this.groups = this.groups.filter(g => g.id !== this.id);
    this.groupsService.deleteGroup(this.id)
      .subscribe(() => {
        this.goBack()
        this.groupsService.groupsChanged.next(this.groups);
      });
    this.onClear();
  }

  onAddTags() {
    // const control = new FormControl(null, Validators.required);
    // (<FormArray>this.groupForm.get('tags')).push(control);
  }

  onClear() {
    this.groupForm.reset();
    this.editMode = false;
  }
 
  private initForm() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    let groupName = '';
    let groupDescription = '';

    if (this.editMode) {
      const group = this.groupsService.getGroup(this.id).subscribe(
        (group) => {
          groupName = group.name;
          groupDescription = group.description;
          this.groupForm.setValue({          
            name: group.name,
            description: group.description,
            user_id:1,
            location_id:1
          })
        }
      );
    }
 
    this.groupForm = this.formBuilder.group({      
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      user_id: [1],
      location_id: [1],
      
      // tags: new FormArray([])
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
