import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_name: string;
    c_name: string;
    t_name: string;
    s_date: string;
    e_date: string;
    status: string;
  }[];
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
  public tableData1: TableData;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.emp_code = params['emp_code'];
      this.emp_name = params['emp_name'];

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
        }, error => {
          console.error('Error fetching data:', error);
        });
    });
  }

  private formatDate(timestamp: string): string {
    // const date = new Date(dateString);
    // const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
    // return date.toLocaleDateString(undefined, options);
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
  }

  exportToExcel(): void {
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
  }


}
