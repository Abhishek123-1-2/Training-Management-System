import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  course: string;
  trainingDetails: any;
  trainingCategory: string;
  trainingType: string;
  courseDescription: string;
  prerequisites: string;
  fromTime: string;
  toTime: string;
  totalDays: number;
  courseLink: string;
  username: string;
  password: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course = params['c_name'];
    });

    this.fetchDetails();
  }

  fetchDetails(): void {
    const apiUrl = `http://localhost:8083/api/training-views/training-details/${this.course}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.trainingDetails = data;
        this.trainingCategory = data.training_category;
        this.trainingType = data.training_type;
        this.courseDescription = data.course_description;
        this.prerequisites = data.prerequisites,
        this.totalDays = data.total_days,
        this.courseLink = data.url,
        this.username = data.username,
        this.password = data.password
      },
      (error) => {
        console.error('Error fetching training detailss:', error);
      }
    );
  }

}
