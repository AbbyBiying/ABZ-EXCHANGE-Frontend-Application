import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { GroupsService } from '../../services/groups.service';
import { Group } from '../group.model';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-group',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  group: Group;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
  ) { }

  ngOnInit(): void {
    this.getGroup();

    this.group = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
      user_id: this.route.snapshot.params['user_id'],
      description: this.route.snapshot.params['description'],
      created_at: this.route.snapshot.params['created_at'],
      updated_at: this.route.snapshot.params['updated_at'],
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.group.id = params['id'];
          this.group.name = params['name'];
          this.group.user_id = params['user_id'];
          this.group.description = params['description'];
          this.group.created_at = params['created_at'],
          this.group.updated_at = params['updated_at'],
          console.log(this.group);
          console.log("Group");
        }
      );
  }

  getGroup(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupsService.getGroup(id)
      .subscribe(group => this.group = group);
  }
  
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
