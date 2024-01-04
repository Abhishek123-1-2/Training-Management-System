import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Import the Router module

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    designation: string;
    department: string;
    email_id: string;
    view: string;
  }[];
}

interface TableRow {
  sr_no: string;
  emp_code: string;
  emp_name: string;
  designation: string;
  department: string;
  email_id: string;
  view: string;
}

@Component({
  selector: 'employee-search',
  moduleId: module.id,
  templateUrl: './employee-search.component.html',
})
export class EmployeeSearchComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private http: HttpClient, private router: Router) { }  // Inject the Router module

  ngOnInit(): void {
    // Fetch data from the API endpoint
    this.http.get<any[]>('http://localhost:8083/api/employee-details/all')
      .subscribe(data => {
        this.tableData1 = {
          headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Designation', 'Department', 'Email ID', 'View'],
          dataRows: data.map((item, index) => ({
            sr_no: (index + 1).toString(),
            emp_code: item.empCode,
            emp_name: item.empName,
            designation: item.designationName,
            department: item.functionName,
            email_id: item.email,
            view: 'View',
          })),
        };
        this.filteredData = [...this.tableData1.dataRows];
      });
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  // Modify this function to navigate to CourseDetailsComponent with emp_code as a parameter
  viewDetails(emp_code: string) {
    this.router.navigate(['/course-details', emp_code]);
  }

  get pages(): number[] {
    if (this.filteredData.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value,
    this.currentPage = 1; 
  }
}
