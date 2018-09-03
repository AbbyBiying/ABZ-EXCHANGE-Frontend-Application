import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [];

  constructor(private usersService: UsersService, private http: HttpClient, private configService: ConfigService) {          
  }

  ngOnInit() {  
    this.usersService.getUsers()
      .subscribe((data) => {
        console.log(data);        
        this.users = data;
      })  
    }
}
