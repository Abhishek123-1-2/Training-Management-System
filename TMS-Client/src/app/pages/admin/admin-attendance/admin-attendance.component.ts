import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
            s_date: new Date(item.plannedStartDate).toLocaleDateString(),
            e_date: new Date(item.plannedEndDate).toLocaleDateString(),
            status: item.trainingStatus,
            v_attendees: 'View'
          }))
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
