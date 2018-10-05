import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  private userId: number;

  constructor(private usersService: UsersService) {          
  }
  
  ngOnInit() {
    this.usersService.getUser(this.userId)
      .subscribe(
      )  
  }
}