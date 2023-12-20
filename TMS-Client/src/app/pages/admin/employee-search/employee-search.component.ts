import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    designation: string;
    department: string;
    email_id: string;
    view: string;
  }[];
}

interface TableRow {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    designation: string;
    department: string;
    email_id: string;
    view: string;
}
@Component({
  selector: 'employee-search',
  moduleId: module.id,
  templateUrl: './employee-search.component.html',
})
export class EmployeeSearchComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor() { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Designation', 'Department', 'Email ID', 'View'],
      dataRows: [
        {sr_no:'1', emp_code:'3647', emp_name:'Yash Gavanang',designation:'Associate Consultant', department:'Project & Managed Services', email_id:'abc@gmail.com', view:'View'},
        {sr_no:'2', emp_code:'3646', emp_name:'Abhishek Pillai',designation:'Associate Consultant', department:'Project & Managed Services', email_id:'abc@gmail.com', view:'View'},
        {sr_no:'3', emp_code:'3639', emp_name:'Mukul Gupta',designation:'Associate Consultant', department:'Project & Managed Services',  email_id:'abc@gmail.com', view:'View'},
        {sr_no:'4', emp_code:'3364', emp_name:'Yash Gole',designation:'Associate Consultant', department:'Project & Managed Services',  email_id:'abc@gmail.com', view:'View'},
        
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

  get pages(): number[] {
    if (this.filteredData.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value,
    this.currentPage = 1; 
  }
}
