import { Component, OnInit, ViewChild } from "@angular/core";
import { ListingsService } from "../../services/listings.service";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Listing } from "../../listings/listing.model";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-edit-listing",
  templateUrl: "./edit-listing.component.html",
  styleUrls: ["./edit-listing.component.scss"]
})
export class EditListingComponent implements OnInit {
  id: number;
  listingForm: FormGroup;
  editMode = false;
  listing: Listing;

  constructor(
    private listingsService: ListingsService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getListing();
    console.log("queryParams obj and fragment");
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
  }

  getListing(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.listingsService.updateListing(this.listingForm.value);
    } else {
      this.listingsService.addListing(this.listingForm.value);
    }
    this.onCancel();
  }

  onAddTags() {
    const control = new FormControl(null, Validators.required);

    (<FormArray>this.listingForm.get("tags")).push(control);
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    if (this.editMode) {
      this.listingsService
        .getListing(this.id)
        .subscribe(listing => (listing = listing));
    }

    this.listingForm = this.formBuilder.group({
      listingName: ["", [Validators.required, Validators.minLength(2)]],
      listingDescription: [""],
      tags: new FormArray([])
    });
  }
}
