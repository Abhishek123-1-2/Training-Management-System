import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 5;

  public searchTerm = '';




  get pages(): number[] {
    if (this.trainings.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.trainings.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }




 




  trainings = [
    { id: 1, courseName: 'Java Programming', trainerName: 'John Doe', startDate: '2023-01-01', endDate: '2023-01-10', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    { id: 2, courseName: 'Agile Project Management', trainerName: 'Alice Williams', startDate: '2023-04-05', endDate: '2023-04-20', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    { id: 3, courseName: 'Web Development', trainerName: 'Jane Smith', startDate: '2023-02-15', endDate: '2023-02-28', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    { id: 4, courseName: 'Data Science Fundamentals', trainerName: 'Bob Johnson', startDate: '2023-03-10', endDate: '2023-03-25', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    { id: 5, courseName: 'Mobile App Development', trainerName: 'Chris Brown', startDate: '2023-05-01', endDate: '2023-05-15', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    { id: 6, courseName: 'UX/UI Design', trainerName: 'Eva White', startDate: '2023-06-10', endDate: '2023-06-25', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    { id: 7, courseName: 'Python Programming', trainerName: 'Daniel Miller', startDate: '2023-07-15', endDate: '2023-07-31', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    { id: 8, courseName: 'Cloud Computing Basics', trainerName: 'Grace Davis', startDate: '2023-08-05', endDate: '2023-08-20', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    { id: 9, courseName: 'Cybersecurity Essentials', trainerName: 'Frank Wilson', startDate: '2023-09-10', endDate: '2023-09-25', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    { id: 10, courseName: 'Machine Learning Techniques', trainerName: 'Helen Anderson', startDate: '2023-10-01', endDate: '2023-10-15', status: 'COMPLETED', give_feedback: 'Give Feedback' },
  ];

  constructor() { }

  ngOnInit(): void {
   
    this.currentPage = Math.min(this.currentPage, this.pages.length);
  }


  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }
  
  performSearch(): void {
    if (this.searchTerm.trim() === '') {
   
      this.reloadTable();
    } else {
      // Filter the data based on the search term
      this.trainings = this.trainings.filter(row =>
        Object.values(row).some(cell => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

  reloadTable(): void {
    this.trainings = [
      { id: 1, courseName: 'Java Programming', trainerName: 'John Doe', startDate: '2023-01-01', endDate: '2023-01-10', status: 'COMPLETED', give_feedback: 'Give Feedback' },
      { id: 2, courseName: 'Agile Project Management', trainerName: 'Alice Williams', startDate: '2023-04-05', endDate: '2023-04-20', status: 'COMPLETED', give_feedback: 'Give Feedback' },
      { id: 3, courseName: 'Web Development', trainerName: 'Jane Smith', startDate: '2023-02-15', endDate: '2023-02-28', status: 'COMPLETED', give_feedback: 'Give Feedback' },
      { id: 4, courseName: 'Data Science Fundamentals', trainerName: 'Bob Johnson', startDate: '2023-03-10', endDate: '2023-03-25', status: 'COMPLETED', give_feedback: 'Give Feedback' },
      { id: 5, courseName: 'Mobile App Development', trainerName: 'Chris Brown', startDate: '2023-05-01', endDate: '2023-05-15', status: 'COMPLETED', give_feedback: 'Give Feedback' },
      { id: 6, courseName: 'UX/UI Design', trainerName: 'Eva White', startDate: '2023-06-10', endDate: '2023-06-25', status: 'COMPLETED', give_feedback: 'Give Feedback' },
      { id: 7, courseName: 'Python Programming', trainerName: 'Daniel Miller', startDate: '2023-07-15', endDate: '2023-07-31', status: 'COMPLETED', give_feedback: 'Give Feedback' },
      { id: 8, courseName: 'Cloud Computing Basics', trainerName: 'Grace Davis', startDate: '2023-08-05', endDate: '2023-08-20', status: 'COMPLETED', give_feedback: 'Give Feedback' },
      { id: 9, courseName: 'Cybersecurity Essentials', trainerName: 'Frank Wilson', startDate: '2023-09-10', endDate: '2023-09-25', status: 'COMPLETED', give_feedback: 'Give Feedback' },
      { id: 10, courseName: 'Machine Learning Techniques', trainerName: 'Helen Anderson', startDate: '2023-10-01', endDate: '2023-10-15', status: 'COMPLETED', give_feedback: 'Give Feedback' },
    ];
  }



}
