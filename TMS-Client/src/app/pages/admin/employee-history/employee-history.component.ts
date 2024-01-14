import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.c_name = params['c_name'];
  //     this.fetchEmployeeDetails();
  //   });
  // }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.c_name = params['courseName'];
      this.trainerName = params['trainerName']; // Add this line
      this.fetchEmployeeDetails();
    });
  }
  
  

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
        `http://localhost:8083/api/training-views/completed-course-details/${this.c_name}/${this.trainerName}`
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

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  get pages(): number[] {
    if (this.filteredData.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${this.c_name}_records.xlsx`);
  }
}
