import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

declare interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  sr_no: string;
  emp_name: string;
  c_name: string;
  t_name: string;
  s_date: string;
  e_date: string;
  status: string;
}

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  emp_code: string;
  emp_name: string;
  public searchValue: string = '';
  public tableData1: TableData;
  currentPage = 1;
  itemsPerPage = 5;
  public filteredData: TableRow[] = [];
  totalPages: number;
  visiblePages: number[];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    // Initialize visible pages with the first page
    this.visiblePages = [1];
  }

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.emp_code = params['emp_code'];
  //     this.emp_name = params['emp_name'];

  //     // Fetch data from the API endpoint
  //     this.http.get<any[]>(`http://localhost:8083/api/training-views/completed-courses/${this.emp_code}`)
  //       .subscribe(data => {
  //         this.tableData1 = {
  //           headerRow: ['Sr No.', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
  //           dataRows: data.map((item, index) => ({
  //             sr_no: (index + 1).toString(),
  //             emp_name: this.emp_name,
  //             c_name: item.course,
  //             t_name: item.trainerName.split('(')[0].trim(),
  //             s_date: this.formatDate(item.plannedStartDate),
  //             e_date: this.formatDate(item.plannedEndDate),
  //             status: item.trainingStatus,
  //           })),
  //         };

  //         // Initialize the filteredData array with the original data
  //         this.filteredData = [...this.tableData1.dataRows];

  //         // Update the visible pages and data after fetching the data
  //         this.updateVisiblePages();
  //         this.updateVisibleData();
  //       }, error => {
  //         console.error('Error fetching data:', error);
  //       });
  //   });
  // }
  // ngOnInit(): void {
  //   const state = window.history.state;
  //   this.emp_code = state.empCode;
  //   this.emp_name = state.empName;
  
  //   // Fetch data from the API endpoint using emp_code
  //   this.http.get<any[]>(`http://localhost:8083/api/training-views/completed-courses/${this.emp_code}`)
  //     .subscribe(data => {
  //       this.tableData1 = {
  //         headerRow: ['Sr No.', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
  //         dataRows: data.map((item, index) => ({
  //           sr_no: (index + 1).toString(),
  //           emp_name: this.emp_name,
  //           c_name: item.course,
  //           t_name: item.trainerName.split('(')[0].trim(),
  //           s_date: this.formatDate(item.plannedStartDate),
  //           e_date: this.formatDate(item.plannedEndDate),
  //           status: item.trainingStatus,
  //         })),
  //       };
  
  //       // Initialize the filteredData array with the original data
  //       this.filteredData = [...this.tableData1.dataRows];
  
  //       // Update the visible pages and data after fetching the data
  //       this.updateVisiblePages();
  //       this.updateVisibleData();
  //     }, error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }
  ngOnInit(): void {
    // Retrieve parameters from local storage
    const empCode = localStorage.getItem('empCode');
    const empName = localStorage.getItem('empName');
  
    // Check if parameters exist
    if (empCode && empName) {
      this.emp_code = empCode;
      this.emp_name = empName;
  
      // Fetch data from the API endpoint
      this.http.get<any[]>(`http://localhost:8083/api/training-views/completed-courses/${this.emp_code}`)
        .subscribe(data => {
          this.tableData1 = {
            headerRow: ['Sr No.', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
            dataRows: data.map((item, index) => ({
              sr_no: (index + 1).toString(),
              emp_name: this.emp_name,
              c_name: item.course,
              t_name: item.trainerName.split('(')[0].trim(),
              s_date: this.formatDate(item.plannedStartDate),
              e_date: this.formatDate(item.plannedEndDate),
              status: item.trainingStatus,
            })),
          };
  
          // Initialize the filteredData array with the original data
          this.filteredData = [...this.tableData1.dataRows];
  
          // Update the visible pages and data after fetching the data
          this.updateVisiblePages();
          this.updateVisibleData();
        }, error => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.error('Employee code or name not found in local storage');
    }
  }
  
  private formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  // exportToExcel(): void {
  //   const exportData: any[] = this.tableData1.dataRows.map((row) => ({
  //     'Sr No.': row.sr_no,
  //     'Employee Name': row.emp_name,
  //     'Course Name': row.c_name,
  //     'Trainer Name': row.t_name,
  //     'Start Date': row.s_date,
  //     'End Date': row.e_date,
  //     'Status': row.status,
  //   }));

  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   // Save the Excel file
  //   XLSX.writeFile(wb, `${this.emp_name} course_details.xlsx`);
  // }
  exportToExcel(): void {
    if (this.tableData1 && this.tableData1.dataRows && this.tableData1.dataRows.length > 0) {
      const exportData: any[] = this.tableData1.dataRows.map((row) => ({
        'Sr No.': row.sr_no,
        'Employee Name': row.emp_name,
        'Course Name': row.c_name,
        'Trainer Name': row.t_name,
        'Start Date': row.s_date,
        'End Date': row.e_date,
        'Status': row.status,
      }));
  
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      // Save the Excel file
      XLSX.writeFile(wb, `${this.emp_name} course_details.xlsx`);
    } else {
      alert('No data available to export.');
    }
  }
  

  private updateVisiblePages(): void {
    const totalPages = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);

    // Update visible pages based on the current page and total pages
    const currentPage = this.currentPage;
    const maxVisiblePages = 5; // You can adjust this based on your preference

    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    this.visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
    this.totalPages = totalPages;
  }

  private updateVisibleData(): void {
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    this.filteredData = this.tableData1.dataRows.slice(startIdx, endIdx);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateVisiblePages();
      this.updateVisibleData();
    }
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage + 1);
  }
}
