import { Component, OnInit } from '@angular/core';

import { GroupsService } from '../services/groups.service';
import { Group } from './group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: Group[];

  constructor(private groupsService: GroupsService) {}

  ngOnInit() {      
    this.groupsService.getGroups()
      .subscribe(
        (groups: Group[]) => this.groups = groups
      )  
  }
}