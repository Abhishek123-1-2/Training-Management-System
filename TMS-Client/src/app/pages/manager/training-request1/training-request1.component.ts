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
    action: string;
  }[];
}

interface TableRow {
  sr_no: string;
  emp_code: string;
  emp_name: string;
  c_name: string;
  start_date: string;
  end_date: string;
  action: string;
  isApproved?: boolean;  // Optional property for approval status
  isRejected?: boolean;  // Optional property for rejection status
}

@Component({
  selector: 'training-request1',
  templateUrl: './training-request1.component.html',
  styleUrls: ['./training-request1.component.scss']
})
export class TrainingRequest1Component implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  currentPage = 1;
  itemsPerPage = 5;

  constructor() { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No', 'Employee Code', 'Employee Name', 'Course Name', 'Start Date', 'End Date', 'Action'],
      dataRows: [
        {sr_no:'1',emp_code:'3647',emp_name:'Yash Gavanang',c_name:'Angular', start_date:'11-12-2023', end_date:'15-12-2023', action:'Approve'},
        {sr_no:'2',emp_code:'3646',emp_name:'Abhishek Pillai',c_name:'Java', start_date:'14-12-2023', end_date:'19-12-2023', action:'Approve'},
        {sr_no:'3',emp_code:'3639',emp_name:'Mukul Gupta',c_name:'Node JS', start_date:'13-12-2023', end_date:'18-12-2023', action:'Approve'},
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
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
  }

  approveRequest(row: TableRow): void {
    if (!row.isApproved) {
      // Perform approval logic here

      // Update the row property to disable the button
      row.isApproved = true;

      // Show the alert
      alert("Request details have been approved");

      this.filteredData = this.filteredData.filter((r) => r !== row);
    }
  }

  rejectRequest(row: TableRow): void {
    if (!row.isRejected) {
      const reason = prompt("Please enter the reason for rejection:");

      // Check if the user clicked 'Cancel' in the prompt
      if (reason === null) {
        return;
      }

      // Perform rejection logic here

      // Update the row property to disable the button
      row.isRejected = true;

      // Show the alert
      alert("Request details have been rejected. Reason: " + reason);

      this.filteredData = this.filteredData.filter((r) => r !== row);
    }
  }



}
