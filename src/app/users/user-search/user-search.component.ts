import { Component, OnInit } from "@angular/core";

import { Observable, Subject } from "rxjs";
import { Subscription } from "rxjs";
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";

import { UsersService } from "../../services/users.service";
import { User } from "../user.model";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-user-search",
  templateUrl: "./user-search.component.html",
  styleUrls: ["./user-search.component.scss"]
})
export class UserSearchComponent implements OnInit {
  users$: Observable<User[]>;
  allusers: User[];

  private searchTerms = new Subject<string>();
  subscription: Subscription;

  constructor(private usersService: UsersService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.subscription = this.usersService
      .getUsers()
      .subscribe((users: User[]) => {
        console.log(users);
        return (this.allusers = users);
      });

    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.usersService.searchUsers(term))
    );
  }
}
