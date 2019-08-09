import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { GroupsService } from "../services/groups.service";
import { Group } from "./group.model";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.scss"]
})
export class GroupsComponent implements OnInit {
  groups: Group[];
  subscription: Subscription;

  constructor(
    private groupsService: GroupsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    this.subscription = this.groupsService.groupsChanged.subscribe(
      (groups: Group[]) => (this.groups = groups)
    );

    this.groupsService
      .getGroups()
      .subscribe((groups: Group[]) => (this.groups = groups));
  }

  onNewGroup() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
