import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface TableRow {
  sr_no: string;
  emp_code: string; 
  emp_name: string; 
  start_date: string; 
  end_date: string; 
  status: string; 
}

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

@Component({
  selector: 'report-emp',
  templateUrl: './report-emp.component.html'
})
export class ReportOfEmployeeComponent implements OnInit {
  c_name: string;
  trainerName: string; 
  plannedStartDate: string; // Add this line
  plannedEndDate: string;  
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router) {}

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.c_name = params['c_name'];
  //     this.fetchEmployeeDetails();
  //   });
  // }
  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.c_name = params['c_name'];
  //     this.trainerName = params['trainer_name']; // Get trainerName from route params
  //     this.fetchEmployeeDetails();
  //   });
  // }
  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.c_name = params['c_name'];
  //     this.trainerName = params['trainer_name'];
  //     this.plannedStartDate = params['plannedStartDate']; // Add this line
  //     this.plannedEndDate = params['plannedEndDate'];     // Add this line
  //     this.fetchEmployeeDetails();
  //   });
  // }
  ngOnInit(): void {
    const course = localStorage.getItem('course');
    const trainerName = localStorage.getItem('trainerName');
    const plannedStartDate = localStorage.getItem('plannedStartDate');
    const plannedEndDate = localStorage.getItem('plannedEndDate');
  
    if (course && trainerName && plannedStartDate && plannedEndDate) {
      this.c_name = course;
      this.trainerName = trainerName;
      this.plannedStartDate = plannedStartDate;
      this.plannedEndDate = plannedEndDate;
      this.fetchEmployeeDetails();
    } else {
      console.error('Parameters not found in localStorage');
    }
  }
  
  
  // fetchEmployeeDetails(): void {
  //   this.http.get<{ empCode: string, empName: string, plannedStartDate: string, plannedEndDate: string, trainingStatus: string }[]>(
  //     `http://localhost:8083/api/training-views/completed-course-details/${this.c_name}`
  //   ).subscribe(
  //     (data) => {
  //       this.tableData1 = {
  //         headerRow: ['Sr No.', 'Employee Code', 'Employee Name','Course Name', 'Start Date', 'End Date', 'Status','View Reports'],
  //         dataRows: data.map((item, index) => ({
  //           sr_no: (index + 1).toString(),
  //           emp_code: item.empCode,
  //           emp_name: item.empName,
  //           start_date: item.plannedStartDate ? new Date(item.plannedStartDate).toLocaleDateString() : '',
  //           end_date: item.plannedEndDate ? new Date(item.plannedEndDate).toLocaleDateString() : '',
  //           status: item.trainingStatus,
  //         })),
  //       };
  //       this.filteredData = [...this.tableData1.dataRows];
  //     },
  //     (error) => {
  //       console.error('Error fetching employee details:', error);
  //     }
  //   );
  // }
  fetchEmployeeDetails(): void {
    this.http
      .get<{
        empCode: string;
        empName: string;
        plannedStartDate: string;
        plannedEndDate: string;
        trainingStatus: string;
      }[]>(`http://localhost:8083/api/training-views/completed-course-details/${this.c_name}/${this.trainerName}/${this.plannedStartDate}/${this.plannedEndDate}`)
      .subscribe(
        (data) => {
          this.tableData1 = {
            headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Course Name', 'Start Date', 'End Date', 'Status', 'View Reports'],
            dataRows: data.map((item, index) => ({
              sr_no: (index + 1).toString(),
              emp_code: item.empCode,
              emp_name: item.empName,
              start_date: item.plannedStartDate ? new Date(item.plannedStartDate).toLocaleDateString() : '',
              end_date: item.plannedEndDate ? new Date(item.plannedEndDate).toLocaleDateString() : '',
              status: item.trainingStatus,
            })),
          };
          this.filteredData = [...this.tableData1.dataRows];
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
  }
  navigateToReportCourses(empCode: string): void {
    this.router.navigate(['/report-courses', { c_name: this.c_name, empCode: empCode }]);
  }
  // navigateToReportCourses(empCode: string): void {
  //   this.router.navigate(['/report-courses', { c_name: this.c_name, trainer_name: this.trainerName, empCode: empCode }]);
  // }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
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

  
}
