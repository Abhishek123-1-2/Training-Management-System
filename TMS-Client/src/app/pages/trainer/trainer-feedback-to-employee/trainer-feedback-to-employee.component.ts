// trainer-feedback-to-employee.component.ts
import { Component, OnInit, Renderer2 } from '@angular/core';
import { TrainingService } from '../trainer-services/trainer.service';
import { filter } from 'rxjs';
import { error } from 'console';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

// interface TableRow {
//   number: string;
//   course: string;
//   plannedStartDate: string;
//   plannedEndDate: string;
//   training_status: string;
//   view: string;
// }

interface TableRow {
  number: string;
  course: string;
  plannedStartDate: string;
  plannedEndDate: string;
  training_status: string;
  view:string;
  // schedule_id:string;
  // training_id:string;
  // attendance_id:string;
  
}

// interface Trainings {
//   empName: string;
//   number: string;
//   course: string;
//   plannedStartDate: string;
//   plannedEndDate: string;
//   training_status: string;
//   view: string; 
// }
interface Trainings {
  empName: string;
  number: string;
  course: string;
  plannedStartDate: string;
  plannedEndDate: string;
  training_status: string;
  view: string;
  trainerName: string; // Add this property
}

@Component({
  selector: 'trainer-feedback-to-employee',
  moduleId: module.id,
  templateUrl: './trainer-feedback-to-employee.component.html',
})
export class TrainerFeedbackToEmployeeComponent implements OnInit {
  // public tableData1: TableData;
  public course:string[]=[];
 public originalData:TableRow[]=[];
 public filteredData:TableRow[]=[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  public trainerName: string = ''; // Add this line
  public tableData1: TableData = { headerRow: [], dataRows: [] };
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  constructor(private trainingService:TrainingService,
    private router: Router, private http: HttpClient
    ) { }

 
  // ngOnInit(): void {
  //   // this.tableData1 = {
  //   //   headerRow: ['Sr No.', 'Course Name', 'Start Date', 'End Date', 'Status', 'Attendees'],
  //   //   dataRows: [
  //   //     {sr_no:'1', c_name:'Angular',s_date:'10-11-2023', e_date:'15-11-2023', status:'Completed', view: 'View'},
  //   //     {sr_no:'2', c_name:'Angular',s_date:'20-11-2023', e_date:'25-11-2023', status:'Completed', view: 'View'}
  //   //   ]
  //   // };

  //   // this.filteredData = [...this.tableData1.dataRows];
  //   // this.fetchTrainingDetails();
  //   const empName = localStorage.getItem('employeeName');
  //   if (empName) {
  //     this.fetchTrainings(empName);
  //   } else {
  //     console.error('employeeName not found in localStorage');
  //   }
  // }
  // ngOnInit(): void {
  //   const empName = localStorage.getItem('employeeName');
  //   if (empName) {
  //     this.trainerName = empName; // Set trainerName
  //     this.fetchTrainings(empName);
  //   } else {
  //     console.error('employeeName not found in localStorage');
  //   }
  // }

  // fetchTrainings(empName: string) {
  //   const url = `http://localhost:8083/api/training-history/trainer/${empName}`;

  //   this.http.get<Trainings[]>(url).subscribe(
  //     (response) => {
  //       console.log('Training Data: ', response);
  //       this.originalData = response
  //       .filter(item => item.training_status.toLowerCase() === 'completed')
  //       .map((item, index) => ({
  //         number: (index + 1).toString(),
  //         course: item.course,
  //         plannedStartDate: this.formatDate(item.plannedStartDate),
  //         plannedEndDate: this.formatDate(item.plannedEndDate),
  //         training_status: item.training_status,
  //         empName: item.empName,
  //         view: 'View',
  //       }));

  //       this.filteredData = [...this.originalData];
  //       this.currentPage = Math.min(this.currentPage, this.pages.length);
  //     },
  //     (error) => {
  //       console.error('Error fetch the training data: ', error);
  //     }
  //   )
  // }
  // fetchTrainings(empName: string) {
  //   const url = `http://localhost:8083/api/training-history/trainer/${this.trainerName}/${empName}`;

  //   this.http.get<Trainings[]>(url).subscribe(
  //     (response) => {
  //       console.log('Training Data: ', response);
  //       this.originalData = response
  //         .filter(item => item.training_status.toLowerCase() === 'completed')
  //         .map((item, index) => ({
  //           number: (index + 1).toString(),
  //           course: item.course,
  //           plannedStartDate: this.formatDate(item.plannedStartDate),
  //           plannedEndDate: this.formatDate(item.plannedEndDate),
  //           training_status: item.training_status,
  //           empName: item.empName,
  //           view: 'View',
  //           trainerName: item.trainerName,
  //         }));

  //       this.filteredData = [...this.originalData];
  //       this.currentPage = Math.min(this.currentPage, this.pages.length);
  //     },
  //     (error) => {
  //       console.error('Error fetch the training data: ', error);
  //     }
  //   )
  // }
  ngOnInit(): void {
    const empName = localStorage.getItem('employeeName');
    if (empName) {
      this.trainerName = empName;
      this.fetchTrainings(empName);
    } else {
      console.error('employeeName not found in localStorage');
    }
  }

  fetchTrainings(empName: string) {
    const url = `http://localhost:8083/api/training-history/trainer/${this.trainerName}/${empName}`;

    this.http.get<Trainings[]>(url).subscribe(
      (response) => {
        console.log('Training Data: ', response);
        this.originalData = response
          .filter(item => item.training_status.toLowerCase() === 'completed')
          .map((item, index) => ({
            number: (index + 1).toString(),
            course: item.course,
            plannedStartDate: this.formatDate(item.plannedStartDate),
            plannedEndDate: this.formatDate(item.plannedEndDate),
            training_status: item.training_status,
            empName: item.empName,
            view: 'View',
            trainerName: item.trainerName,
          }));

        this.tableData1 = { headerRow: ['Number', 'Course', 'Start Date', 'End Date', 'Status', 'View'], dataRows: [...this.originalData] };
        this.filteredData = [...this.originalData];
        this.currentPage = Math.min(this.currentPage, this.pages.length);
      },
      (error) => {
        console.error('Error fetch the training data: ', error);
      }
    );
  }
  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }
  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
    this.applyFilter();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateVisiblePages();
    this.applyFilter();
  }

  updateVisiblePages(): void {
    const totalPages = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    const halfPaginatorSize = Math.floor(this.rollingPaginatorSize / 2);

    if (totalPages <= this.rollingPaginatorSize) {
      this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (this.currentPage <= halfPaginatorSize) {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => i + 1);
      } else if (this.currentPage >= totalPages - halfPaginatorSize) {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => totalPages - this.rollingPaginatorSize + i + 1);
      } else {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => this.currentPage - halfPaginatorSize + i);
      }
    }
  }
  applyFilter() {
    const searchText=this.searchValue.toLowerCase().trim();

    this.filteredData = this.originalData.filter(row =>
      Object.values(row).some(value =>
        value && value.toString().toLowerCase().includes(searchText)
      )
    );
  }

  resetFilters(){
    this.searchValue='';
    this.filteredData=[...this.originalData];
  }
 
  //newly added for referencing
  // viewEmployeesForCourse(course: string) {
  //   this.router.navigate(['/student-list3'], { queryParams: { course: course } });
  // }
  // viewEmployeesForCourse(course: string, trainerName: string) {
  //   this.router.navigate(['/student-list3', course, trainerName]);
  // }

  // viewEmployeesForCourse(course: string, trainer: Trainings) {
  //   const trainerNameFromApi = trainer.trainerName; // Extract trainerName from API response
  //   this.router.navigate(['/student-list3', course], {
  //     state: { trainerName: trainerNameFromApi },
  //   });
  // }
  // viewEmployeesForCourse(course: string, trainer: Trainings) {
  //   const trainerNameFromApi = trainer.trainerName; // Extract trainerName from API response
  //   this.router.navigate(['/student-list3', course, trainerNameFromApi]);
  // }
  viewEmployeesForCourse(course: string, trainer: Trainings) {
    const { trainerName, ...rest } = trainer;
    this.router.navigate(['/student-list3', course, trainerName]);
  }
  
  
  // get pages(): number[] {
  //   if (this.originalData.length === 0) {
  //     return [];
  //   }

  //   const pageCount = Math.ceil(this.originalData.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }

  // changeItemsPerPage(event: any): void {
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = 1;
  // }

}
