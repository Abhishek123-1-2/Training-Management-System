import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    status: string;
  }[];
}

interface TableRow {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    status: string;
}

@Component({
  selector: 'employee-history',
  templateUrl: './employee-history.component.html',
  styleUrls: ['./employee-history.component.scss']
})
export class EmployeeHistoryComponent implements OnInit {
  c_name: string;
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.c_name = params['c_name'];
    })
    this.tableData1 = {
      headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Status'],
      dataRows: [
        {sr_no:'1',emp_code: '3647', emp_name:'Yash Gavanang', status: 'Completed'},
        {sr_no:'2',emp_code: '3646', emp_name:'Abhishek Pillai', status: 'Completed'},
        {sr_no:'3',emp_code: '3639', emp_name:'Mukul Gupta', status: 'Completed'},
        {sr_no:'4',emp_code: '3364', emp_name:'Yash Gole', status: 'Completed'},
      ]
    }
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
    this.itemsPerPage = +event.target.value,
    this.currentPage = 1; // Reset to the first page when changing items per page
  }

}
