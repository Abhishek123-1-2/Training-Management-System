// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface TrainingSchedule {
//   scheduleId: number;
//   course: string;
//   trainerName: string;
//   plannedStartDate: string; // Add Planned Start Date
//   plannedEndDate: string;   // Add Planned End Date
// }

// interface TableRow {
//   sr_no: string;
//   scheduleId: number; // Added scheduleId
//   c_name: string; // Course Name
//   t_name: string; // Trainer Name
//   view: string;
// }

// interface TableData {
//   headerRow: string[];
//   dataRows: TableRow[];
// }

// @Component({
//   selector: 'training-record',
//   moduleId: module.id,
//   templateUrl: './training-record.component.html',
// })
// export class TrainingRecordComponent implements OnInit {
//   public tableData1: TableData = { headerRow: [], dataRows: [] };
//   public filteredData: TableRow[] = [];
//   public searchValue: string = '';
//   public currentPage = 1;
//   public itemsPerPage = 5;
//   public rollPaginator: boolean = false; // Added line
//   public visiblePages: number[] = []; // Added line
//   private rollingPaginatorSize = 5;
//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchTrainingScheduleList();
//   }
  
//   fetchTrainingScheduleList(): void {
//     this.http.get<TrainingSchedule[]>('http://localhost:8083/api/training-views/schedule-list').subscribe(
//       (data) => {
//         this.tableData1 = {
//           headerRow: ['Sr No.', 'Course Name', 'Trainer Name','Planned Start Date', 'Planned End Date', 'Records'],
//           dataRows: data.map((item, index) => ({
//             sr_no: (index + 1).toString(),
//             scheduleId: item.scheduleId, // Added scheduleId
//             c_name: item.course,
//             t_name: item.trainerName,
//             view: 'View',
//             plannedStartDate: this.formatDate(item.plannedStartDate), // Add Planned Start Date
//             plannedEndDate: this.formatDate(item.plannedEndDate),
//           })),
//         };
//         this.applyFilter();
//       },
//       (error) => {
//         console.error('Error fetching training schedule list:', error);
//       }
//     );
//   }
//   formatDate(timestamp: string): string {
//     const date = new Date(timestamp);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }
//   applyFilter() {
//     this.filteredData = this.tableData1.dataRows.filter((row) =>
//       Object.values(row).some((value) =>
//         value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
//       )
//     );
//   }
  
//   private extractTrainerName(fullName: string): string {
//     const indexOfOpeningBracket = fullName.indexOf('(');
//     if (indexOfOpeningBracket !== -1) {
//       return fullName.substring(0, indexOfOpeningBracket).trim();
//     } else {
//       return fullName.trim();
//     }
//   }
//   // get pages(): number[] {
//   //   if (this.filteredData.length === 0) {
//   //     return [];
//   //   }

//   //   const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
//   //   return Array.from({ length: pageCount }, (_, index) => index + 1);
//   // }
//   // get pages(): number[] {
//   //   return this.calculatePagesToShow();
//   // }
  
//   // onPageChange(page: number): void {
//   //   this.currentPage = page;
//   //   this.updateVisiblePages();
//   //   this.applyFilter();
//   // }
//   // updateVisiblePages(): void {
//   //   const totalPages = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
//   //   const halfPaginatorSize = Math.floor(this.rollingPaginatorSize / 2);

//   //   if (totalPages <= this.rollingPaginatorSize) {
//   //     this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
//   //   } else {
//   //     if (this.currentPage <= halfPaginatorSize) {
//   //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => i + 1);
//   //     } else if (this.currentPage >= totalPages - halfPaginatorSize) {
//   //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => totalPages - this.rollingPaginatorSize + i + 1);
//   //     } else {
//   //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => this.currentPage - halfPaginatorSize + i);
//   //     }
//   //   }
//   // }
//   get pages(): number[] {
//     if (this.tableData1.dataRows.length === 0) {
//       return [];
//     }

//     const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   changeItemsPerPage(event: any): void {
//     this.itemsPerPage = +event.target.value;
//     this.currentPage = 1;
//     this.applyFilter();
//   }

//   onPageChange(page: number): void {
//     this.currentPage = page;
//     this.updateVisiblePages();
//     this.applyFilter();
//   }

//   updateVisiblePages(): void {
//     const totalPages = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
//     const halfPaginatorSize = Math.floor(this.rollingPaginatorSize / 2);

//     if (totalPages <= this.rollingPaginatorSize) {
//       this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
//     } else {
//       if (this.currentPage <= halfPaginatorSize) {
//         this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => i + 1);
//       } else if (this.currentPage >= totalPages - halfPaginatorSize) {
//         this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => totalPages - this.rollingPaginatorSize + i + 1);
//       } else {
//         this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => this.currentPage - halfPaginatorSize + i);
//       }
//     }
//   }
//   // changeItemsPerPage(event: any): void {
//   //   this.itemsPerPage = +event.target.value;
//   //   this.currentPage = 1;
//   // }
//   previousPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }
//   public get totalPages(): number {
//     return Math.ceil(this.filteredData.length / this.itemsPerPage);
//   }
  

//   nextPage() {
//     const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
//     if (this.currentPage < totalPages) {
//       this.currentPage++;
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

interface TrainingSchedule {
  course: string;
  trainerName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  trainingStatus: string;
}

interface TableRow {
  sr_no: string;
  c_name: string; // Course Name
  t_name: string; // Trainer Name
  s_date: string; // Start Date
  e_date: string; // End Date
  status: string; // Training Status
  v_attendees: string;
}

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

@Component({
  selector: 'training-record',
  moduleId: module.id,
  templateUrl: './training-record.component.html',
})
export class TrainingRecordComponent implements OnInit {
  public tableData1: TableData = { headerRow: [], dataRows: [] };
  public filteredData: TableRow[] = [];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.fetchCompletedCourses();
  }

  fetchCompletedCourses(): void {
    this.http.get<TrainingSchedule[]>('http://localhost:8083/api/training-views/completed-courses')
      .subscribe(data => {
        this.tableData1 = {
          headerRow: ['Sr No.','Course', 'Trainer Name', 'Start Date', 'End Date', 'Status','View Attendees'],
          dataRows: data.map((item, index) => ({
            sr_no: (index + 1).toString(),
            c_name: item.course,
            t_name: item.trainerName,
            s_date: this.formatDate(item.plannedStartDate),
            e_date: this.formatDate(item.plannedEndDate),
            status: item.trainingStatus,
            v_attendees: 'View'
          }))
        };
        this.filteredData = [...this.tableData1.dataRows];
      });
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
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
  // navigateToEmployeeHistory(courseName: string, trainerName: string, plannedStartDate: string, plannedEndDate: string) {
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       courseName,
  //       trainerName,
  //       plannedStartDate,
  //       plannedEndDate
  //     }
  //   };
  //   this.router.navigate(['/employee-history'], navigationExtras);
  // }
  // navigateToEmployeeHistory(courseName: string, trainerName: string, plannedStartDate: string, plannedEndDate: string): void {
  //   this.router.navigate(['/employee-history'], {
  //     state: {
  //       courseName: courseName,
  //       trainerName: trainerName,
  //       plannedStartDate: plannedStartDate,
  //       plannedEndDate: plannedEndDate
  //     }
  //   });
  // }
  navigateToEmployeeHistory(courseName: string, trainerName: string, plannedStartDate: string, plannedEndDate: string): void {
    // Store parameters in local storage
    localStorage.setItem('courseName', courseName);
    localStorage.setItem('trainerName', trainerName);
    localStorage.setItem('plannedStartDate', plannedStartDate);
    localStorage.setItem('plannedEndDate', plannedEndDate);

    // Navigate to the employee history component
    this.router.navigate(['/employee-history']);
}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
  private extractTrainerName(fullName: string): string {
    const indexOfOpeningBracket = fullName.indexOf('(');
    if (indexOfOpeningBracket !== -1) {
      return fullName.substring(0, indexOfOpeningBracket).trim();
    } else {
      return fullName.trim();
    }
  }
  public get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }
}
