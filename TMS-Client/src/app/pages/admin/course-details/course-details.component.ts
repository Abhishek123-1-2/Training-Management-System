import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  }[];
}

interface TableRow {
  sr_no: string;
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
  public tableData1: TableData;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.emp_code = params['emp_code'];

      // Fetch data from the API endpoint
      this.http.get<any[]>(`http://localhost:8083/api/training-views/completed-courses/${this.emp_code}`)
        .subscribe(data => {
          this.tableData1 = {
            headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
            dataRows: data.map((item, index) => ({
              sr_no: (index + 1).toString(),
              c_name: item.course,
              t_name: item.trainerName,
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

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
  }
}
