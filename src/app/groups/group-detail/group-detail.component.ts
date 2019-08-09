import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import { GroupsService } from "../../services/groups.service";
import { Group } from "../group.model";

import { Subscription } from "rxjs";

@Component({
  selector: "app-group",
  templateUrl: "./group-detail.component.html",
  styleUrls: ["./group-detail.component.scss"]
})
export class GroupDetailComponent implements OnInit {
  group: Group;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService
  ) {}

  ngOnInit(): void {
    this.getGroup();
  }

  getGroup(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.subscription = this.groupsService
      .getGroup(id)
      .subscribe(group => (this.group = group));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
