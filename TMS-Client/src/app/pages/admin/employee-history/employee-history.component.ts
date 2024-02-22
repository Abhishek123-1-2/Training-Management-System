import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

interface TableRow {
  sr_no: string;
  emp_code: string; 
  emp_name: string;
  course: string;
  start_date: string; 
  end_date: string; 
  status: string; 
}

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

@Component({
  selector: 'employee-history',
  templateUrl: './employee-history.component.html',
  styleUrls: ['./employee-history.component.scss'],
})
export class EmployeeHistoryComponent implements OnInit {
  c_name: string;
  trainerName: string; 
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  plannedStartDate: string; // Add this line
  plannedEndDate: string;
  constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router) {}

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.c_name = params['c_name'];
  //     this.fetchEmployeeDetails();
  //   });
  // }
  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.c_name = params['courseName'];
  //     this.trainerName = params['trainerName']; // Add this line
  //     this.plannedStartDate = params['plannedStartDate']; // Add this line
  //     this.plannedEndDate = params['plannedEndDate'];
  //     this.fetchEmployeeDetails();
  //   });
  // }
  // ngOnInit(): void {
  //   const navigationState = window.history.state;
  //   this.c_name = navigationState.courseName;
  //   this.trainerName = navigationState.trainerName;
  //   this.plannedStartDate = navigationState.plannedStartDate;
  //   this.plannedEndDate = navigationState.plannedEndDate;
  
  //   // Call your data-fetching function here with the retrieved parameters
  //   this.fetchEmployeeDetails();
  // }
  ngOnInit(): void {
    // Retrieve parameters from local storage
    this.c_name = localStorage.getItem('courseName');
    this.trainerName = localStorage.getItem('trainerName');
    this.plannedStartDate = localStorage.getItem('plannedStartDate');
    this.plannedEndDate = localStorage.getItem('plannedEndDate');

   
    // Call your data-fetching function here with the retrieved parameters
    this.fetchEmployeeDetails();
}

  
  // ngOnInit(): void {
  //   const navigationState = this.router.getCurrentNavigation().extras.state;
  //   if (navigationState) {
  //     this.c_name = navigationState.courseName;
  //     this.trainerName = navigationState.trainerName;
  //     this.plannedStartDate = navigationState.plannedStartDate;
  //     this.plannedEndDate = navigationState.plannedEndDate;
  //     this.fetchEmployeeDetails();
  //   } else {
  //     // Handle case where parameters are not passed
  //   }
  // }
  // ngOnInit(): void {
  //   const navigation = this.router.getCurrentNavigation();
  //   if (navigation && navigation.extras.state) {
  //     const state = navigation.extras.state;
  //     this.c_name = state.courseName;
  //     this.trainerName = state.trainerName;
  //     this.plannedStartDate = state.plannedStartDate;
  //     this.plannedEndDate = state.plannedEndDate;
  //     this.fetchEmployeeDetails();
  //   }
  // }
  
  

  // fetchEmployeeDetails(): void {
  //   this.http.get<{ empCode: string, empName: string, plannedStartDate: string, plannedEndDate: string, trainingStatus: string }[]>(
  //     `http://localhost:8083/api/training-views/completed-course-details/${this.c_name}`
  //   ).subscribe(
  //     (data) => {
  //       this.tableData1 = {
  //         headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Course Name', 'Start Date', 'End Date', 'Status'],
  //         dataRows: data.map((item, index) => ({
  //           sr_no: (index + 1).toString(),
  //           emp_code: item.empCode,
  //           emp_name: item.empName,
  //           course: this.c_name,
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
      .get<{ empCode: string; empName: string; plannedStartDate: string; plannedEndDate: string; trainingStatus: string }[]>(
        `http://localhost:8083/api/training-views/completed-course-details/${this.c_name}/${this.trainerName}/${this.plannedStartDate}/${this.plannedEndDate}`
      )
      .subscribe(
        (data) => {
          this.tableData1 = {
            headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Course Name', 'Start Date', 'End Date', 'Status'],
            dataRows: data.map((item, index) => ({
              sr_no: (index + 1).toString(),
              emp_code: item.empCode,
              emp_name: item.empName,
              course: this.c_name,
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
    this.filteredData = this.tableData1.dataRows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  // get pages(): number[] {
  //   if (this.filteredData.length === 0) {
  //     return [];
  //   }

  //   const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }

  // changeItemsPerPage(event: any): void {
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = 1;
  // }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${this.c_name}_records.xlsx`);
  }
}
