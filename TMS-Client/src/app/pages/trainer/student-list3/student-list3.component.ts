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
  status: string;

  currentPage = 1;
  itemsPerPage = 5;


  get pages(): number[] {
    if (this.filteredData.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }



  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; 
  }






  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      this.status = params['status'];
    })
    this.tableData1 = {
      headerRow: ['Sr No', 'Employee Code', 'Employee Name','Start Date', 'End Date', 'Status', 'Feedback'],
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
