// trainer-training-details.component.ts

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/pages/login/login.service';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    number: string;
    course: string;
    plannedStartDate: string;
    plannedEndDate: string;
    training_status: string; 
  }[];
}

interface TableRow {
  number: string;
  course: string;
  plannedStartDate: string;
  plannedEndDate: string;
  training_status: string; 
}

interface Trainings {
  empName: string;
  number: string;
  course: string;
  plannedStartDate: string;
  plannedEndDate: string;
  training_status: string; 
}

@Component({
  selector: 'trainer-training-details',
  templateUrl: './trainer-training-details.component.html',
  styleUrls: ['./trainer-training-details.component.scss']
})
export class TrainerTrainingDetailsComponent implements OnInit {
  public tableData1: TableData;
  public originalData: TableRow[] = [];
  public filteredData: TableRow[];
  public searchValue: string = '';
  public selectedStatus: string = '';
  public trainerName: string = ''; // Add this line
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private userService: UserService, private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.tableData1 = {
  //     headerRow: ['Sr No.', 'Course Name', 'Start Date', 'End Date', 'Status'],
  //     dataRows: [
  //       {number: '1', course:'Angular', plannedStartDate:'12-01-2023', plannedEndDate:'15-01-2023', training_status:'Upcoming'},
  //     ]
  //   };

  //   this.filteredData = [...this.tableData1.dataRows];

  //   const empName = localStorage.getItem('employeeName');
  //   if (empName) {
  //     this.fetchTrainings(empName);
  //   } else {
  //     console.error('employeeName not found in localStorage');
  //   }
    
  // }
  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Start Date', 'End Date', 'Status'],
      dataRows: [
        {number: '1', course:'Angular', plannedStartDate:'12-01-2023', plannedEndDate:'15-01-2023', training_status:'Upcoming'},
      ]
    };

    this.filteredData = [...this.tableData1.dataRows];

    const empName = localStorage.getItem('employeeName');
    if (empName) {
      this.trainerName = empName; // Set trainerName
      this.fetchTrainings(empName);
    } else {
      console.error('employeeName not found in localStorage');
    }
  }
  

  // fetchTrainings(empName: string) {
  //   const url = `http://localhost:8083/api/training-history/trainer/${empName}`;

  //   this.http.get<Trainings[]>(url).subscribe(
  //     (response) => {
  //       console.log('Training Data: ', response);
  //       this.originalData = response.map((item, index) => ({
  //         number: (index + 1).toString(),
  //         course: item.course,
  //         plannedStartDate: this.formatDate(item.plannedStartDate),
  //         plannedEndDate: this.formatDate(item.plannedEndDate),
  //         training_status: item.training_status,
  //         empName: item.empName
  //       }));

  //       this.filteredData = [...this.originalData];
  //       this.currentPage = Math.min(this.currentPage, this.pages.length);
  //     },
  //     (error) => {
  //       console.error('Error fetch the training data: ', error);
  //     }
  //   )
  // }
  fetchTrainings(empName: string) {
    const url = `http://localhost:8083/api/training-history/trainer/${this.trainerName}/${empName}`; // Use this.trainerName

    this.http.get<Trainings[]>(url).subscribe(
      (response) => {
        console.log('Training Data: ', response);
        this.originalData = response.map((item, index) => ({
          number: (index + 1).toString(),
          course: item.course,
          plannedStartDate: this.formatDate(item.plannedStartDate),
          plannedEndDate: this.formatDate(item.plannedEndDate),
          training_status: item.training_status,
          empName: item.empName
        }));

        this.filteredData = [...this.originalData];
        this.currentPage = Math.min(this.currentPage, this.pages.length);
      },
      (error) => {
        console.error('Error fetch the training data: ', error);
      }
    )
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }
  

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
      value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      ) 
    )
      .filter(row =>
        (this.selectedStatus === '' 
      || row.training_status.toLowerCase() === this.selectedStatus.toLowerCase()
      || this.selectedStatus === 'all')
    )
    ;
  }

  // resetFilters() {
  //   this.searchValue = '';
  //   this.selectedStatus = '';
  //   this.filteredData = [...this.originalData]; // Reset filteredData to originalData

  // }
  

  get pages(): number[] {
    if (this.originalData.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.originalData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }

}

    

  
