import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from './user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  subscription: Subscription;

  constructor(
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);   
        
    this.subscription = this.usersService.usersChanged
      .subscribe(
        (users: User[]) => this.users = users
      );

    this.usersService.getUsers()
      .subscribe(
        (users: User[]) => this.users = users
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
