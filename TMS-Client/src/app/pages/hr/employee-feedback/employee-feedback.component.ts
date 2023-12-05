import { Component, OnInit } from '@angular/core';

declare interface TableData
{
  headerRow: string[];
  dataRows: string[][];
}




@Component({
  selector: 'employee-feedback',
  templateUrl: './employee-feedback.component.html',
  styleUrls: ['./employee-feedback.component.scss']
})
export class EmployeeFeedbackComponent implements OnInit {

  public tableData1: TableData;
  public currentPage = 1;
  public itemsPerPage = 5;

  public searchTerm = '';


  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }




  constructor() { }

  ngOnInit(): void {

    this.tableData1 = {
      headerRow: [
        'Sr. no', 'Employee Name', 'Technical Skills', 'Grasping Power', 'Responsive/Proactive', 'Smartness', 'Interest Level',
        'Leadership Quality', 'Ability to Explain Problems', 'Spoken English', 'Total Rate', 'Assignment Status', 'It Security Quiz Score'
      ],
      dataRows: [
        ['1', 'John Doe', '5', '4.5', '4.2', '4.8', '4.5', '4.6', '4.3', '4.7', '4.2', 'Completed', '90'],
        ['2', 'Jane Doe', '6', '3.5', '3.8', '4.0', '3.7', '3.9', '3.5', '3.8', '3.6', 'In Progress', '60'],
        ['3', 'Michael Johnson', '7', '4.4', '4.1', '4.7', '4.5', '4.3', '4.6', '4.2', '4.4', 'In Progress', '92'],
        ['4', 'David Smith', '8', '4.8', '4.6', '4.9', '4.7', '4.5', '4.8', '4.6', '4.9', 'Completed', '95'],
        ['5', 'Emily Brown', '6', '3.9', '3.7', '4.0', '3.8', '3.5', '3.9', '3.7', '3.8', 'In Progress', '75'],
        ['6', 'Christopher Lee', '5', '4.6', '4.3', '4.8', '4.5', '4.4', '4.7', '4.3', '4.6', 'Completed', '88'],
        ['7', 'Olivia Wilson', '3', '4.3', '4.0', '4.5', '4.2', '4.1', '4.4', '4.0', '4.3', 'In Progress', '82'],
        ['8', 'William Taylor', '5', '3.8', '3.5', '3.9', '3.7', '3.6', '3.8', '3.5', '3.8', 'Not Started', '68'],
        ['9', 'Sophia Miller', '9', '4.7', '4.4', '4.9', '4.6', '4.5', '4.8', '4.4', '4.7', 'In Progress', '91'],
        ['10', 'Daniel Brown', '7', '3.6', '3.3', '3.8', '3.5', '3.4', '3.7', '3.3', '3.6', 'Not Started', '72']
      ]
    };
    




  }


  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value,
    this.currentPage = 1; // Reset to the first page when changing items per page
  }


  performSearch(): void {
    if (this.searchTerm.trim() === '') {
      // If the search term is empty, revert back to the original data
      this.reloadTable();
    } else {
      // Filter the data based on the search term
      this.tableData1.dataRows = this.tableData1.dataRows.filter(row =>
        row.some(cell => cell.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );

    }
  }


  reloadTable(): void {
    this.tableData1.dataRows =[
      ['1', 'John Doe', '5', '4.5', '4.2', '4.8', '4.5', '4.6', '4.3', '4.7', '4.2', 'Completed', '90'],
      ['2', 'Jane Doe', '6', '3.5', '3.8', '4.0', '3.7', '3.9', '3.5', '3.8', '3.6', 'In Progress', '60'],
      ['3', 'Michael Johnson', '7', '4.4', '4.1', '4.7', '4.5', '4.3', '4.6', '4.2', '4.4', 'In Progress', '92'],
      ['4', 'David Smith', '8', '4.8', '4.6', '4.9', '4.7', '4.5', '4.8', '4.6', '4.9', 'Completed', '95'],
      ['5', 'Emily Brown', '6', '3.9', '3.7', '4.0', '3.8', '3.5', '3.9', '3.7', '3.8', 'In Progress', '75'],
      ['6', 'Christopher Lee', '5', '4.6', '4.3', '4.8', '4.5', '4.4', '4.7', '4.3', '4.6', 'Completed', '88'],
      ['7', 'Olivia Wilson', '3', '4.3', '4.0', '4.5', '4.2', '4.1', '4.4', '4.0', '4.3', 'In Progress', '82'],
      ['8', 'William Taylor', '5', '3.8', '3.5', '3.9', '3.7', '3.6', '3.8', '3.5', '3.8', 'Not Started', '68'],
      ['9', 'Sophia Miller', '9', '4.7', '4.4', '4.9', '4.6', '4.5', '4.8', '4.4', '4.7', 'In Progress', '91'],
      ['10', 'Daniel Brown', '7', '3.6', '3.3', '3.8', '3.5', '3.4', '3.7', '3.3', '3.6', 'Not Started', '72']
    ];
  }






}
