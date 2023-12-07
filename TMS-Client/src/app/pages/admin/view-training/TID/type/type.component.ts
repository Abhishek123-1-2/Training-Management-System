import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'type-cmp',
  moduleId: module.id,
  templateUrl: './type.component.html',
})
export class TypeComponent implements OnInit {
  course: string;
  trainingDetails: any;
  trainingCategory: string;
  trainingType: string;
  courseDescription: string;
  prerequisites: string;
  fromTime: string;
  toTime: string;
  totalDays: number;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course = params['course'];
      this.fetchTrainingDetails(); // Fetch details based on course
    });
  }

  fetchTrainingDetails(): void {
    const apiUrl = `http://localhost:8083/api/training-views/training-details/${this.course}`;

    this.httpClient.get(apiUrl).subscribe(
      (data: any) => {
        this.trainingDetails = data;

        this.trainingCategory = data.training_category;
        this.trainingType = data.training_type;
        this.courseDescription = data.course_description;
        this.prerequisites = data.prerequisites;
        // Extract other fields as needed

        console.log('Extracted Information:', {
          trainingCategory: this.trainingCategory,
          trainingType: this.trainingType,
          courseDescription: this.courseDescription,
          prerequisites: this.prerequisites,
          // Add other fields
        });
      },
      (error) => {
        console.error('Error fetching training details:', error);
      }
    );
  }
}
