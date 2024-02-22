import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    c_name: string;
    t_name: string;
    s_date: string;
    e_date: string;
    status: string;
    v_attendees: string;
  }[];
}

@Component({
  selector: 'admin-training-cmp',
  moduleId: module.id,
  templateUrl: 'admin-attendance.component.html',
})

export class AdminAttendanceComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: any[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8083/api/training-views/completed-courses')
      .subscribe(data => {
        this.tableData1 = {
          headerRow: ['Sr No.','Course', 'Trainer Name', 'Start Date', 'End Date', 'Status','View Attendees'],
          dataRows: data.map((item, index) => ({
            sr_no: (index + 1).toString(),
            c_name: item.course,
            t_name: item.trainerName,
            // s_date: new Date(item.plannedStartDate).toLocaleDateString(),
            // e_date: new Date(item.plannedEndDate).toLocaleDateString(),
            s_date: item.plannedStartDate,
            e_date: item.plannedEndDate,
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
    return `${day}-${month}-${year}`;
  }
  

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }
  
  extractTrainerName(fullName: string): string {
    const indexOfOpeningBracket = fullName.indexOf('(');
    if (indexOfOpeningBracket !== -1) {
      return fullName.substring(0, indexOfOpeningBracket).trim();
    } else {
      return fullName.trim();
    }
  }
  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  // navigateToStudentList(course: string, trainerName: string, start_date: string, end_date: string, status: string): void {
  //   this.router.navigate(['/student-list1'], { queryParams: { course, trainerName, start_date, end_date, status } });
  // }
  // navigateToStudentList(course: string, trainerName: string, start_date: string, end_date: string, status: string) {
  //   // Construct the navigation extras object with your parameters
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       course,
  //       trainerName,
  //       start_date,
  //       end_date,
  //       status
  //     }
  //   };
  
  //   // Navigate to student-list1 with navigation extras
  //   this.router.navigate(['/student-list1'], navigationExtras);
  // }
  navigateToStudentList(course: string, trainerName: string, start_date: string, end_date: string, status: string) {
    // Store parameters in localStorage
    localStorage.setItem('course', course);
    localStorage.setItem('trainerName', trainerName);
    localStorage.setItem('start_date', start_date);
    localStorage.setItem('end_date', end_date);
    localStorage.setItem('status', status);

    // Navigate to student-list1
    this.router.navigate(['/student-list1']);
  }
 
  // navigateToStudentList(course: string, trainerName: string, startDate: string, endDate: string, status: string) {
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       course,
  //       trainerName,
  //       startDate,
  //       endDate,
  //       status
  //     }
  //   };
  //   this.router.navigate(['/student-list1'], navigationExtras);
  // }
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
