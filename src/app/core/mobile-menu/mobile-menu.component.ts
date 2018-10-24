import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  state: string = "inactive";
  
  @ViewChild(MatMenu) menu: MatMenu;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  
  constructor(private eRef: ElementRef, private authService: AuthService){}
  
  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';    
  }

  ngOnInit() {
  }
}

