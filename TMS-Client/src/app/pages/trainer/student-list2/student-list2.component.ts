import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    attendance: string;
  }[];
}

interface TableRow {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    attendance: string;
}

@Component({
  selector: 'student-list2',
  moduleId: module.id,
  templateUrl: './student-list2.component.html',
})
export class StudentList2Component implements OnInit {

  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  s_date: string;
  e_date: string;

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.s_date = params['s_date'];
      this.e_date = params['e_date'];
    })
    this.tableData1 = {
      headerRow: ['Sr No', 'Employee Code', 'Employee Name','Start Date', 'End Date', 'Add Attendance'],
      dataRows: [
        {sr_no:'1', emp_code:'3647', emp_name:'Yash Gavanang', attendance:'Add'},
        {sr_no:'2', emp_code:'3646', emp_name:'Abhishek Pillai', attendance:'Add'},
        {sr_no:'3', emp_code:'3639', emp_name:'Mukul Gupta', attendance:'Add'},
        {sr_no:'4', emp_code:'3364', emp_name:'Yash Gole', attendance:'Add'},
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
