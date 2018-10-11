import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { UsersService } from '../services/users.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, username: string, email: string, bio: string }

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
      bio: this.route.snapshot.params['bio']
    };

    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.username = params['username'];
          this.user.bio = params['bio'];
          this.user.email = params['email'];
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