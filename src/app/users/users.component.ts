import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [];

  constructor(private usersService: UsersService, private http: HttpClient) {          
  }

  ngOnInit() {  
    this.usersService.getUsers()
      .subscribe(
       (users: any[]) => this.users = users
      )  
    }
}
