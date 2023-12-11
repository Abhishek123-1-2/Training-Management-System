import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    c_name: string;
    s_date: string;
    e_date: string;
    status: string;
  }[];
}

interface TableRow {
  sr_no: string;
  c_name: string;
  s_date: string;
  e_date: string;
  status: string;
}

@Component({
  selector: 'upcoming-training',
  moduleId: module.id,
  templateUrl: './upcoming-training.component.html',
})
export class UpcomingTrainingComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Start Date', 'End Date', 'Status'],
      dataRows: [
        {sr_no:'1', c_name:'Angular',s_date:'10-12-2023', e_date:'15-12-2023', status:'Upcoming'},
        {sr_no:'2', c_name:'Angular',s_date:'20-12-2023', e_date:'25-12-2023', status:'Upcoming'}
      ]
    };

    this.filteredData = [...this.tableData1.dataRows];
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }
}
