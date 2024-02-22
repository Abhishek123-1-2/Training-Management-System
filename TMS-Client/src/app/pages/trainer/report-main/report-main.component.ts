import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface TrainingSchedule {
  scheduleId: number;
  course: string;
  trainerName: string;
  training_status: string;
  plannedStartDate: string;  // Added plannedStartDate
  plannedEndDate: string;    // Added plannedEndDate
}

interface TableRow {
  number: string;
  scheduleId: number; // Added scheduleId
  course: string; // Course Name
  t_name: string; // Trainer Name
  view: string;
  training_status: string;
}

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

@Component({
  selector: 'report-main',
  moduleId: module.id,
  templateUrl: './report-main.component.html',
})
export class ReportMainComponent implements OnInit {
  public tableData1: TableData = { headerRow: [], dataRows: [] };
  public filteredData: TableRow[] = [];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
   public trainerName: string = ''; // Add this line
   public rollPaginator: boolean = false; // Added line
   public visiblePages: number[] = []; // Added line
   private rollingPaginatorSize = 5;

  constructor(private http: HttpClient,private router:Router) {}

  // ngOnInit(): void {
  //   // this.fetchTrainingScheduleList();
  //   const empName = localStorage.getItem('employeeName');
  //   if (empName) {
  //     // this.fetchTrainings(empName);
  //     this.fetchTrainingScheduleList(empName);
  //   } else {
  //     console.error('employeeName not found in localStorage');
  //   }
  // }
  ngOnInit(): void {
    const empName = localStorage.getItem('employeeName');
    if (empName) {
      this.trainerName = empName; // Set trainerName
      this.fetchTrainingScheduleList(empName);
    } else {
      console.error('employeeName not found in localStorage');
    }
  }

  // fetchTrainingScheduleList(empName: string): void {
  //   this.http.get<TrainingSchedule[]>(`http://localhost:8083/api/training-views/schedule-list/${empName}`).subscribe(
  //     (data) => {
  //       this.tableData1 = {
  //         headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Records'],
  //         dataRows: data
  //         .filter(item => item.training_status.toLowerCase() === 'completed')
  //         .map((item, index) => ({
  //           number: (index + 1).toString(),
  //           scheduleId: item.scheduleId, // Added scheduleId
  //           course: item.course,
  //           t_name: empName,
  //           training_status: item.training_status,
  //           view: 'View',
  //         })),
  //       };
  //       this.applyFilter();
  //     },
  //     (error) => {
  //       console.error('Error fetching training schedule list:', error);
  //     }
  //   );
  // }
  // fetchTrainingScheduleList(empName: string): void {
  //   this.http.get<TrainingSchedule[]>(`http://localhost:8083/api/training-views/schedule-list/${this.trainerName}/${empName}`).subscribe(

  //     (data) => {
  //       this.tableData1 = {
  //         headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Records'],
  //         dataRows: data.map((item, index) => ({
  //           number: (index + 1).toString(),
  //           scheduleId: item.scheduleId,
  //           course: item.course,
  //           t_name: item.trainerName, // Extract trainerName
  //           training_status: item.training_status,
  //           view: 'View',
  //         })),
  //       };
  //       this.applyFilter();
  //     },
  //     (error) => {
  //       console.error('Error fetching training schedule list:', error);
  //     }
  //   );
  // }
  fetchTrainingScheduleList(empName: string): void {
    this.http.get<TrainingSchedule[]>(`http://localhost:8083/api/training-views/schedule-list/${this.trainerName}/${empName}`).subscribe(
      (data) => {
        this.tableData1 = {
          headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Planned Start Date', 'Planned End Date', 'Records'],
          dataRows: data.map((item, index) => ({
            number: (index + 1).toString(),
            scheduleId: item.scheduleId,
            course: item.course,
            t_name: item.trainerName,
            plannedStartDate: this.formatDate(item.plannedStartDate), // Extract plannedStartDate
            plannedEndDate: this.formatDate(item.plannedEndDate),     // Extract plannedEndDate
            training_status: item.training_status,
            view: 'View',
          })),
        };
        this.applyFilter();
      },
      (error) => {
        console.error('Error fetching training schedule list:', error);
      }
    );
  }
  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  private extractTrainerName(fullName: string): string {
    const indexOfOpeningBracket = fullName.indexOf('(');
    if (indexOfOpeningBracket !== -1) {
      return fullName.substring(0, indexOfOpeningBracket).trim();
    } else {
      return fullName.trim();
    }
  }
  // navigateToReportEmployee(course: string, trainerName: string): void {
  //   this.router.navigate(['/report-employee'], { 
  //     queryParams: { 
  //       c_name: course, 
  //       trainer_name: trainerName // Add trainerName parameter
  //     } 
  //   });
  // }
  // navigateToReportEmployee(course: string, trainerName: string): void {
  //   this.router.navigate(['/report-employee', course, trainerName]);
  // }

  // navigateToReportEmployee(course: string, trainerName: string, plannedStartDate: string, plannedEndDate: string): void {
  //   this.router.navigate(['/report-employee', course, trainerName, plannedStartDate, plannedEndDate]);
  // }
  navigateToReportEmployee(course: string, trainerName: string, plannedStartDate: string, plannedEndDate: string): void {
    // Store parameters in localStorage
    localStorage.setItem('course', course);
    localStorage.setItem('trainerName', trainerName);
    localStorage.setItem('plannedStartDate', plannedStartDate);
    localStorage.setItem('plannedEndDate', plannedEndDate);
  
    // Navigate to report-employee route
    this.router.navigate(['/report-employee']);
  }
  
  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }
  
  // private extractTrainerName(fullName: string): string {
  //   const indexOfOpeningBracket = fullName.indexOf('(');
  //   if (indexOfOpeningBracket !== -1) {
  //     return fullName.substring(0, indexOfOpeningBracket).trim();
  //   } else {
  //     return fullName.trim();
  //   }
  // }
  // get pages(): number[] {
  //   if (this.tableData1.dataRows.length === 0) {
  //     return [];
  //   }

  //   const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }

  // changeItemsPerPage(event: any): void {
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = 1;
  // }


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
}
