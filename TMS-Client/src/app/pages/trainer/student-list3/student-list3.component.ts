import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    feedback: string;
  }[];
}

interface TableRow {
  sr_no: string;
  emp_code: string;
  emp_name: string;
  feedback: string;
}


@Component({
  selector: 'student-list3',
  moduleId: module.id,
  templateUrl: './student-list3.component.html',
})
export class StudentList3Component implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  start_date: string;
  end_date: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
    })
    this.tableData1 = {
      headerRow: ['Sr No', 'Employee Code', 'Employee Name','Start Date', 'End Date', 'Feedback'],
      dataRows: [
        {sr_no:'1', emp_code:'3647', emp_name:'Yash Gavanang', feedback:'Give'},
        {sr_no:'2', emp_code:'3646', emp_name:'Abhishek Pillai', feedback:'Give'},
        {sr_no:'3', emp_code:'3639', emp_name:'Mukul Gupta', feedback:'Give'},
        {sr_no:'4', emp_code:'3364', emp_name:'Yash Gole', feedback:'Give'},
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
