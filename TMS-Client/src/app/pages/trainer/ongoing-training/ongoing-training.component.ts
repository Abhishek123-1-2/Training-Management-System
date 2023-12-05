import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    c_name: string;
    s_date: string;
    e_date: string;
    view: string;
  }[];
}

interface TableRow {
  sr_no: string;
  c_name: string;
  s_date: string;
  e_date: string;
  view: string;
}

@Component({
  selector: 'ongoing-training',
  moduleId: module.id,
  templateUrl: './ongoing-training.component.html',
})
export class OngoingTrainingComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Start Date', 'End Date', 'View'],
      dataRows: [
        {sr_no:'1', c_name:'Angular',s_date:'05-12-2023', e_date:'15-12-2023', view:'Attendees'}
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
