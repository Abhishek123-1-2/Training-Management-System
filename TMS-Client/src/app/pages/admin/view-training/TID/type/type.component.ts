import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'type-cmp',
  moduleId: module.id,
  templateUrl: './type.component.html',
})
export class TypeComponent implements OnInit {
  course: string;
  trainingDetails: any;

  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course = params['course']; // Retrieve course name from URL parameter
      this.fetchTrainingDetails(this.course); // Fetch details based on course
    });
  }
  fetchTrainingDetails(course: string): void {
    // Implement logic to fetch training details based on the course
    // Replace this with your actual logic or service call
    this.trainingDetails = this.getTrainingDetails(course);
  }

  getTrainingDetails(course: string): any {
    const courseDetails: { [course: string]: any } = {
      'Java': {
        training_category:'Mandatory',
        training_type: 'Instructor-LED', /* training_category:Mandatory,Optional,training_type:Instructor-LED,Online */
        course_description: 'Core Java',
        prerequisites: 'OOPS',
        from_time: '1:20',
        to_time: '3:20',
        daily_hrs:'2',
        total_days: '5'
      },
      'Spring Boot': {
        training_category:'Mandatory',
        training_type: 'Online',
        course_description: 'Spring Core',
        prerequisites: 'Core Java',
        from_time: '3:20',
        to_time: '4:20',
        total_days: '10'
      },

      'PLSQL': {
        training_category:'Optional',
        training_type: 'Online',
        course_description: 'Spring Core',
        prerequisites: 'Core Java',
        from_time: '3:20',
        to_time: '4:20',
        total_days: '10'
      },

      'Angular': {
        training_category:'Mandatory',
        training_type: 'Instructor-LED',
        course_description: 'Spring Core',
        prerequisites: 'Core Java',
        from_time: '3:20',
        to_time: '4:20',
        total_days: '10'
      },

    };

    // Return training details for the specific course or default details
    return courseDetails[course] || this.getDefaultTrainingDetails();
  }

  getDefaultTrainingDetails(): any {
    // Default training details if the course details are not found
    return {
      training_category:'-',
      training_type: '-',
      course_description: ' - ',
      prerequisites: '-',
      from_time: '0',
      to_time: '0',
      total_days: '0'
    };
  }

}