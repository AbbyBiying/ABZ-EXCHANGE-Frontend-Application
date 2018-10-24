import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../user.model';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location) { }

  ngOnInit(): void {
    this.getUser();

    this.user = {
      id: this.route.snapshot.params['id'],
      username: this.route.snapshot.params['username'],
      email: this.route.snapshot.params['email'],
      bio: this.route.snapshot.params['bio'],
      location_id: this.route.snapshot.params['location_id'],
      created_at: this.route.snapshot.params['created_at'],
      updated_at: this.route.snapshot.params['updated_at'],
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.username = params['username'];
          this.user.bio = params['bio'];
          this.user.email = params['email'];
          this.user.location_id = params['location_id'];
          this.user.created_at = params['created_at'];
          this.user.updated_at = params['updated_at'];
          console.log(this.user);
          console.log("user");
        }
      );
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usersService.getUser(id)
      .subscribe(user => this.user = user);
  }
  
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
