import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MatMenuModule, MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  state: string = "inactive";
  
  @ViewChild(MatMenu) menu: MatMenu;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  
  constructor(private eRef: ElementRef){}
  
  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';    
  }

  ngOnInit() {
  }

}

