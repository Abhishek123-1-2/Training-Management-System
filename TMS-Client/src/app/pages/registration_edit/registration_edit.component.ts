// registration-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration-edit',
  moduleId: module.id,
  templateUrl: './registration_edit.component.html',
})
export class RegistrationEditComponent implements OnInit {
  regId: string;
  router: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.regId = params['regId'];
      // Fetch and display registration details based on this.regId
      // You might want to create a service to handle data retrieval.
      // Example: this.fetchRegistrationDetails(this.regId);
    });
  }
  saveChanges(): void {
    // Implement the logic to save changes
    // Update the record in your data
    // Example: this.updateRegistrationDetails(this.regId, updatedDetails);

    // After saving, navigate back to the original page
    this.router.navigate(['/admin/registration']);
  }
  // Add a method to fetch registration details if needed
  // fetchRegistrationDetails(regId: string): void {
  //   // Implement the logic to fetch registration details
  // }
}
