import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  trainings = [
    { id: 1, courseName: 'Java Programming', trainerName: 'John Doe', startDate: '2023-01-01', endDate: '2023-01-10', status: 'COMPLETED', give_feedback:'Give Feedback'},
    { id: 2, courseName: 'Agile Project Management', trainerName: 'Alice Williams', startDate: '2023-04-05', endDate: '2023-04-20', status: 'COMPLETED', give_feedback:'Give Feedback'},
    { id: 3, courseName: 'Web Development', trainerName: 'Jane Smith', startDate: '2023-02-15', endDate: '2023-02-28', status: 'COMPLETED', give_feedback:'Give Feedback'},
    { id: 4, courseName: 'Data Science Fundamentals', trainerName: 'Bob Johnson', startDate: '2023-03-10', endDate: '2023-03-25', status: 'COMPLETED', give_feedback:'Give Feedback'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
