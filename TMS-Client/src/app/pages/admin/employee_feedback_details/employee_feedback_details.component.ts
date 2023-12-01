import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: {
      emp_code: string;
      emp_name: string;
      c_name: string;
      t_name: string;
      status: string;
      view: string;
  }[];
}

interface TableRow {
  emp_code: string;
  emp_name: string;
  c_name: string;
  t_name: string;
  status: string;
  view: string;
}

@Component({
  selector: 'employee-feedback-details-cmp',
  moduleId: module.id,
  templateUrl: './employee_feedback_details.component.html',
})
export class EmployeeFeedbackDetailsComponent implements OnInit {
  t_id: string;
  public studentList: TableData;
  public filteredData: TableRow[];
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

    this.route.params.subscribe((params) => {
      this.t_id = params['t_id'];
      // Now, fetch the list of students based on the trainingId and update the component.
      // You might want to create a service to handle data retrieval.
    });
  }
  fetchStudentList(t_id: string): void {
    this.studentList = {
        headerRow: ['Employee Code','Employee Name', 'Course Name', 'Trainer Name', 'Status', 'View Feedback'],
        dataRows: [
            {emp_code:'3647', emp_name:'Yash Gavanang',   c_name:'Angular', t_name:'Amisha Jangipuria', status:'Completed', view:'View'},
            {emp_code:'3646', emp_name:'Abhishek Pillai', c_name:'Angular', t_name:'Amisha Jangipuria', status:'Completed', view:'View'},
            {emp_code:'3639', emp_name:'Mukul Gupta',     c_name:'Angular', t_name:'Amisha Jangipuria', status:'Completed', view:'View'},
            {emp_code:'3364', emp_name:'Yash Gole',       c_name:'Angular', t_name:'Amisha Jangipuria', status:'Completed', view:'View'},
        ]
    };
    this.filteredData = [...this.studentList.dataRows]
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
            technical_skills: 4,
            grasping_power: 5,
            proactiveness: 3,
            interest: 4,
            leadership_quality: 5,
            problem: 5,
            effectiveness: 5,
            content: 3,
            methodology: 4,
            organization: 4,
            trainer_rating: 5,
            comments: 'Concepts were explained very well',
            comments1: 'Need to be focused during training',
        },
        '3646' : {
            technical_skills: 4,
            grasping_power: 5,
            proactiveness: 3,
            interest: 4,
            leadership_quality: 5,
            problem: 5,
            comments: 'Excellent grasp of concepts and proactive approach',
        },
        '3639' : {
            technical_skills: 4,
            grasping_power: 5,
            proactiveness: 3,
            interest: 4,
            leadership_quality: 5,
            problem: 5,
            comments: 'Demonstrates strong technical skills and problem-solving abilities',
        },
        '3364' : {
            technical_skills: 4,
            grasping_power: 5,
            proactiveness: 3,
            interest: 4,
            leadership_quality: 5,
            problem: 5,
            comments: 'Shows great interest and leadership qualities; focus on improving problem-solving skills.',
        }
    }
    // Check if there's a specific mapping for the empCode
    const specificFeedback = feedbackMapping[empCode];

    // If a specific mapping is found, return it; otherwise, return a default feedback
    return specificFeedback || this.getDefaultFeedback(empCode);
  }

  getDefaultFeedback(empCode: string): any {
    // Default feedback for empCodes without specific mappings
    return {
        technical_skills: 0,
        grasping_power: 0,
        proactiveness: 0,
        interest: 0,
        leadership_quality: 0,
        problem: 0,
        comments: 'None',
    };
  }

  // Add a method to fetch feedback based on empCode if needed
  // fetchFeedback(empCode: string): void {
  //   // Implement the logic to fetch feedback
  // }
}
