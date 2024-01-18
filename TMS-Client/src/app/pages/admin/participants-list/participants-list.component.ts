// participants-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface TableRow {
  sr_no: string;
  emp_code: string;
  emp_name: string;
  designation: string;
  department: string;
  email_id: string;
}

@Component({
  selector: 'participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {
  public tableData1: { headerRow: string[]; dataRows: TableRow[] } = { headerRow: [], dataRows: [] };
  public filteredData: TableRow[] = [];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe((params) => {
  //     const course = params['course'];
  //     const trainingStatus = params['trainingStatus'];

  //     this.fetchEmployeeData(course, trainingStatus);
  //   });
  // }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const course = params['course'];
      const trainingStatus = params['trainingStatus'];
      const trainerName = params['trainerName'];
  
      this.fetchEmployeeData(course, trainingStatus, trainerName);
    });
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
  // fetchEmployeeData(course: string, trainingStatus: string): void {
  //   // Check if trainingStatus is "On-going" before making the API request
  //   if (trainingStatus !== 'On-Going') {
  //     this.filteredData = [];
  //     return;
  //   }
  
  //   const apiUrl = `http://localhost:8083/api/registrations/attendees?course=${course}&trainingStatus=${trainingStatus}`;
  
  //   this.http.get<any[]>(apiUrl).subscribe(
  //     (data) => {
  //       // Map the API response properties to TableRow properties
  //       this.tableData1 = {
  //         headerRow: ['No.', 'Employee Code', 'Employee Name', 'Designation', 'Department', 'Email ID'], // Update these headers based on your HTML file
  //         dataRows: data.map((item, index) => ({
  //           sr_no: (index + 1).toString(),
  //           emp_code: item.empCode,
  //           emp_name: item.empName,
  //           designation: item.designationName,
  //           department: item.functionName,
  //           email_id: item.email,
  //         })),
  //       };
  //       this.filteredData = [...this.tableData1.dataRows];
  //     },
  //     (error) => {
  //       console.error('Error fetching employee data:', error);
  //     }
  //   );
  // }
  fetchEmployeeData(course: string, trainingStatus: string, trainerName: string): void {
    // Check if trainingStatus is "On-going" before making the API request
    if (trainingStatus !== 'On-Going') {
      this.filteredData = [];
      return;
    }
  
    const apiUrl = `http://localhost:8083/api/registrations/attendees?course=${course}&trainingStatus=${trainingStatus}&trainerName=${trainerName}`;
  
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        // Map the API response properties to TableRow properties
        this.tableData1 = {
          headerRow: ['No.', 'Employee Code', 'Employee Name', 'Designation', 'Department', 'Email ID'],
          dataRows: data.map((item, index) => ({
            sr_no: (index + 1).toString(),
            emp_code: item.empCode,
            emp_name: item.empName,
            designation: item.designationName,
            department: item.functionName,
            email_id: item.email,
          })),
        };
        this.filteredData = [...this.tableData1.dataRows];
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }
  
  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  // applyFilter() {
  //   const searchTerm = this.searchValue.toLowerCase().trim();

  //   if (!searchTerm) {
  //     this.filteredData = [...this.tableData1.dataRows];
  //     return;
  //   }

  //   this.filteredData = this.tableData1.dataRows.filter(row =>
  //     Object.values(row).some(value =>
  //       value.toString().toLowerCase().includes(searchTerm)
  //     )
  //   );
  // }

 
}
