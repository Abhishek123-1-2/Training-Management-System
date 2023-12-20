import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  selector: 'employee-history',
  templateUrl: './employee-history.component.html',
  styleUrls: ['./employee-history.component.scss'],
})
export class EmployeeHistoryComponent implements OnInit {
  c_name: string;
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.c_name = params['c_name'];
      this.fetchEmployeeDetails();
    });
  }

  fetchEmployeeDetails(): void {
    this.http.get<{ empCode: string, empName: string, plannedStartDate: string, plannedEndDate: string, trainingStatus: string }[]>(
      `http://localhost:8083/api/training-views/completed-course-details/${this.c_name}`
    ).subscribe(
      (data) => {
        this.tableData1 = {
          headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Start Date', 'End Date', 'Status'],
          dataRows: data.map((item, index) => ({
            sr_no: (index + 1).toString(),
            emp_code: item.empCode,
            emp_name: item.empName,
            start_date: item.plannedStartDate,
            end_date: item.plannedEndDate,
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
  }
}
