import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    t_id: string;
    c_name: string;
    t_name: string;
    s_date: string;
    e_date: string;
    status: string;
    enroll: string;
  }[],
}

interface TableRow {
    t_id: string;
    c_name: string;
    t_name: string;
    s_date: string;
    e_date: string;
    status: string;
    enroll: string;
}

@Component({
  selector: 'user-dashboard',
  moduleId: module.id,
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';

  enrollmentStatusData = [];


  currentPage = 1;
  itemsPerPage = 5;


  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }





  constructor() { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status', 'Enroll'],
      dataRows: [
        { t_id: '1', c_name: 'Angular', t_name: 'Amisha Jangipuria', s_date: '29-11-2023', e_date: '04-12-2023', status: 'Upcoming', enroll: 'Enroll'},
        { t_id: '2', c_name: 'Introduction to Web Development', t_name: 'John Doe', s_date: '30-11-2023', e_date: '07-12-2023', status: 'Upcoming', enroll: 'Enroll'},
        { t_id: '3', c_name: 'Advanced JavaScript', t_name: 'Jane Smith', s_date: '01-12-2023', e_date: '12-12-2023', status: 'Upcoming', enroll: 'Enroll'},
      ]
    };
    this.filteredData = [...this.tableData1.dataRows]
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  enrollButtonClicked(row: any) {
    const { t_id, c_name, status } = row;
    this.enrollmentStatusData = [{ trainingId: t_id, courseName: c_name, status: 'Pending'}];
    alert(`Successfully enrolled in Training ID: ${this.enrollmentStatusData[0].trainingId}`);
  }


  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
  }
  


}
