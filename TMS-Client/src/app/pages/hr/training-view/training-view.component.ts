  import { Component, OnInit } from '@angular/core';


  declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
  }


  @Component({
    selector: 'training-view',
    templateUrl: './training-view.component.html',
    styleUrls: ['./training-view.component.scss']
  })
  export class TrainingViewComponent implements OnInit {

    public tableData1: TableData; 
    public currentPage = 1;
    public itemsPerPage = 5;

    public searchTerm = '';
    public statusFilter: string = '';
    public editableRow: string[] = [];
    

    get pages(): number[] {
      if (this.tableData1.dataRows.length === 0) {
        return [];
      }

      const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }


    constructor() { }

    ngOnInit(): void {
      this.tableData1 = {
        headerRow: ['Sr. No', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
        dataRows: [
          ['1', 'Angular Basics', 'John Doe', '2023-01-01', '2023-01-10', 'Upcoming'],
          ['2', 'React Fundamentals', 'Jane Doe', '2023-02-01', '2023-02-15', 'Ongoing'],
          ['3', 'Vue.js Essentials', 'Bob Smith', '2023-03-01', '2023-03-10', 'Upcoming'],
          ['4', 'Node.js Advanced', 'Alice Johnson', '2023-04-01', '2023-04-10', 'Ongoing'],
          ['5', 'Python for Data Science', 'Chris Davis', '2023-05-01', '2023-05-10', 'Upcoming'],
          ['6', 'Java Programming', 'Eva Brown', '2023-06-01', '2023-06-10', 'Ongoing'],
          ['7', 'Web Development Bootcamp', 'Andrew Moore', '2023-07-01', '2023-07-10', 'Upcoming'],
          ['8', 'Machine Learning Fundamentals', 'Lily Garcia', '2023-08-01', '2023-08-10', 'Ongoing'],
          ['9', 'React Native Workshop', 'James Anderson', '2023-09-01', '2023-09-10', 'Upcoming'],
          ['10', 'Docker Essentials', 'Sophia Miller', '2023-10-01', '2023-10-10', 'Ongoing'],
        ]
      };
    }


    changeItemsPerPage(event: any): void {
      this.itemsPerPage = +event.target.value,
      this.currentPage = 1; 
    }

    performSearch(): void {
      if (this.searchTerm.trim() === '') {
        this.reloadTable();
      } else {
        this.tableData1.dataRows = this.tableData1.dataRows.filter(row =>
          row.some(cell => cell.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
      }

    }

    filterByStatus(): void {
      // Reload the original data
      this.reloadTable();
    
      const selectedStatus = this.statusFilter.toLowerCase();
    
      // Filter the rows based on the selected status
      this.tableData1.dataRows = this.tableData1.dataRows.filter(row => row[5].toLowerCase() === selectedStatus);
    
      this.currentPage = 1;
    }


    
    
    







    reloadTable(): void {
      this.tableData1.dataRows =[
        ['1', 'Angular Basics', 'John Doe', '2023-01-01', '2023-01-10', 'Upcoming'],
        ['2', 'React Fundamentals', 'Jane Doe', '2023-02-01', '2023-02-15', 'Ongoing'],
        ['3', 'Vue.js Essentials', 'Bob Smith', '2023-03-01', '2023-03-10', 'Upcoming'],
        ['4', 'Node.js Advanced', 'Alice Johnson', '2023-04-01', '2023-04-10', 'Ongoing'],
        ['5', 'Python for Data Science', 'Chris Davis', '2023-05-01', '2023-05-10', 'Upcoming'],
        ['6', 'Java Programming', 'Eva Brown', '2023-06-01', '2023-06-10', 'Ongoing'],
        ['7', 'Web Development Bootcamp', 'Andrew Moore', '2023-07-01', '2023-07-10', 'Upcoming'],
        ['8', 'Machine Learning Fundamentals', 'Lily Garcia', '2023-08-01', '2023-08-10', 'Ongoing'],
        ['9', 'React Native Workshop', 'James Anderson', '2023-09-01', '2023-09-10', 'Upcoming'],
        ['10', 'Docker Essentials', 'Sophia Miller', '2023-10-01', '2023-10-10', 'Ongoing'],
      ];
    }


  }
