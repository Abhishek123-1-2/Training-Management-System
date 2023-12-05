import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    c_name: string;
    t_name: string;
    view: string;
  }[];
}

interface TableRow {
  sr_no: string;
  c_name: string;
  t_name: string;
  view: string;
}
@Component({
  selector: 'training-record',
  moduleId: module.id,
  templateUrl: './training-record.component.html',
})
export class TrainingRecordComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Records'],
      dataRows: [
        {sr_no:'1', c_name:'Angular', t_name:'Steve Smith', view:'View'},
        {sr_no:'2', c_name:'Node JS', t_name:'Mathew Wade', view:'View'},
        {sr_no:'3', c_name:'PLSQL', t_name:'Marcus Stoinis', view:'View'},
        {sr_no:'4', c_name:'Java', t_name:'Mitch Starc', view:'View'},
        {sr_no:'5', c_name:'SpringBoot', t_name:'Nathan Lyon', view:'View'},
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
