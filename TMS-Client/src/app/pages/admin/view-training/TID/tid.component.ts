// tid.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tid-cmp',
  moduleId: module.id,
  templateUrl: './tid.component.html',
})
export class TIDComponent implements OnInit {
  training_id: string;
  router: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.training_id = params['training_id'];
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
    this.router.navigate(['view-training']);
  }
  // Add a method to fetch registration details if needed
  // fetchRegistrationDetails(regId: string): void {
  //   // Implement the logic to fetch registration details
  // }
}
