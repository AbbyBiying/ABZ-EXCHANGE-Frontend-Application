import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups = [];

  constructor(private groupsService: GroupsService, private http: HttpClient) {          
  }

  ngOnInit() {  
    this.groupsService.getGroups()
      .subscribe(
        (groups: any[]) => this.groups = groups
      )  
    }
}
   