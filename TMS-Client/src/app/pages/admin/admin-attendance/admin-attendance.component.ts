/* admin-attendance.component.ts */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    c_name: string;
    t_name: string;
    status: string;
    s_date: string;
    e_date: string;
    v_attendees: string;
  }[];
}
declare interface TableRow {
  sr_no: string;
  c_name: string;
  t_name: string;
  status: string;
  s_date: string;
  e_date: string;
  v_attendees: string;
}

  
@Component({
    selector: 'admin-training-cmp',
    moduleId: module.id,
    templateUrl: 'admin-attendance.component.html'
})



export class AdminAttendanceComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';

  currentPage = 1;
  itemsPerPage = 5;


  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }





  ngOnInit(){
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Status', 'Start Date', 'End Date', 'View Attendees'],
      dataRows: [
        { sr_no: '1', c_name: 'Angular', t_name: 'Amisha', status: 'On-Going', s_date:'30-11-2023', e_date: '12-12-2023', v_attendees: 'View'},
        { sr_no: '2', c_name: 'Node JS', t_name: 'John Doe', status: 'On-Going', s_date:'01-12-2023', e_date: '07-12-2023', v_attendees: 'View'},
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

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; 
  }





}
