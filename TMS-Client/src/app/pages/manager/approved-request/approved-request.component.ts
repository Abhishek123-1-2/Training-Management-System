import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    c_name: string;
    start_date: string;
    end_date: string;
    status: string;
    comments: string;
  }[];
}

interface TableRow {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    c_name: string;
    start_date: string;
    end_date: string;
    status: string;
    comments: string;
}

@Component({
  selector: 'approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.scss']
})
export class ApprovedRequestComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  currentPage = 1;
  itemsPerPage = 5;

  constructor() { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No', 'Employee Code', 'Employee Name', 'Course Name', 'Start Date', 'End Date', 'Status', 'Comments'],
      dataRows: [
        {sr_no:'1',emp_code:'3647',emp_name:'Yash Gavanang',c_name:'Angular', start_date:'11-12-2023', end_date:'15-12-2023', status:'Approved', comments:''},
        {sr_no:'2',emp_code:'3646',emp_name:'Abhishek Pillai',c_name:'Angular', start_date:'14-12-2023', end_date:'19-12-2023', status:'Approved', comments:''},
        {sr_no:'3',emp_code:'3639',emp_name:'Mukul Gupta',c_name:'Angular', start_date:'13-12-2023', end_date:'18-12-2023', status:'Rejected', comments:'Already attended the course'},
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
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
  }

}
