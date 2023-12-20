import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    start_date:string;
    end_date:string;
    status: string;
  }[];
}

interface TableRow {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    start_date:string;
    end_date:string;
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
      headerRow: ['Sr No.', 'Employee Code', 'Employee Name','Start Date','End Date','Status'],
      dataRows: [
        {sr_no:'1',emp_code: '3647', emp_name:'Yash Gavanang',start_date:'1-12-2023',end_date:'5-12-2023',status: 'Completed'},
        {sr_no:'2',emp_code: '3646', emp_name:'Abhishek Pillai',start_date:'2-12-2023',end_date:'6-12-2023',status: 'Completed'},
        {sr_no:'3',emp_code: '3639', emp_name:'Mukul Gupta',start_date:'3-12-2023',end_date:'7-12-2023', status: 'Completed'},
        {sr_no:'4',emp_code: '3364', emp_name:'Yash Gole',start_date:'4-12-2023',end_date:'8-12-2023', status: 'Completed'},
        
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
