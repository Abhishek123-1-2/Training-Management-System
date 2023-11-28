// course-feedback-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'course-feedback-cmp',
  moduleId: module.id,
  templateUrl: './course_feedback.component.html',
})
export class CourseFeedbackComponent implements OnInit {
  empCode: string;
  feedback: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.empCode = params['empCode'];
      this.fetchFeedback(this.empCode);
      // Fetch and display feedback for the employee based on this.empCode
      // You might want to create a service to handle data retrieval.
      // Example: this.fetchFeedback(this.empCode);
    });
  }

  fetchFeedback(empCode: string): void {
    // Generate or fetch feedback details based on the empCode
    // You might want to replace this with your actual logic or service call
    this.feedback = this.generateFeedback(empCode);
  }

  generateFeedback(empCode: string): any {
    // Example: Mapping empCodes to specific feedback details
    const feedbackMapping: { [empCode: string]: any } = {
      '3647': {
        effectiveness: 5,
        content: 3,
        methodology: 4,
        organization: 4,
        trainer_rating: 5,
        comments: 'Concepts were explained very well',
      },
      '3646': {
        effectiveness: 4,
        content: 5,
        methodology: 3,
        organization: 5,
        trainer_rating: 5,
        comments: 'Engaging and informative content, effective training methodology',
      },
      '3639': {
        effectiveness: 3,
        content: 4,
        methodology: 4,
        organization: 3,
        trainer_rating: 5,
        comments: 'Good content, improvement needed in training organization',
      },
      '3364': {
        effectiveness: 5,
        content: 5,
        methodology: 5,
        organization: 5,
        trainer_rating: 5,
        comments: 'Outstanding course with excellent organization and content',
      },
    };

    // Check if there's a specific mapping for the empCode
    const specificFeedback = feedbackMapping[empCode];

    // If a specific mapping is found, return it; otherwise, return a default feedback
    return specificFeedback || this.getDefaultFeedback(empCode);
  }

  getDefaultFeedback(empCode: string): any {
    // Default feedback for empCodes without specific mappings
    return {
      effectiveness: 0,
      content: 0,
      methodology: 0,
      organization: 0,
      trainer_rating: 0,
      comments: 'None',
    };
  }

  // Add a method to fetch feedback based on empCode if needed
  // fetchFeedback(empCode: string): void {
  //   // Implement the logic to fetch feedback
  // }
}
