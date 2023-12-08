import { Component, OnInit } from '@angular/core';
declare interface TableData {
  headerRow: string[];
  dataRows: {
      sr_no: string;
      c_name: string;
      t_name: string;
      s_date: string;
      e_date: string;
      t_status: string;
      view_attendees: string;
  }[];
}

interface TableRow {
  sr_no: string;
  c_name: string;
  t_name: string;
  s_date: string;
  e_date: string;
  t_status: string;
  view_attendees: string;
}

@Component({
  selector: 'feedback-details',
  moduleId: module.id,
  templateUrl: './feedback-details.component.html',
})
export class FeedbackDetailsComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Training Status', 'View Attendees'],
      dataRows: [
          { sr_no: '1',   c_name: 'Angular',      t_name: 'Amisha Jangipuria', s_date: '11-11-2023',  e_date: '20-11-2023', t_status: 'COMPLETED', view_attendees: 'View'},
          { sr_no: '2',   c_name: 'Node JS',      t_name: 'John Smith',        s_date: '15-11-2023',  e_date: '25-11-2023', t_status: 'COMPLETED',  view_attendees: 'View' },
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
}
