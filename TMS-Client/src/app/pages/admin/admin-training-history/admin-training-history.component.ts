import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: {
      sr_no: string;
      c_name: string;
      t_name: string;
      s_date: string;
      e_date: string;
      t_status: string;
  }[];
}

interface TableRow {
  sr_no: string;
  c_name: string;
  t_name: string;
  s_date: string;
  e_date: string;
  t_status: string;
}

@Component({
  selector: 'admin-training-history',
  moduleId: module.id,
  templateUrl: './admin-training-history.component.html',
})
export class AdminTrainingHistoryComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';

  currentPage = 1;
  itemsPerPage = 5;


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
      headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Training Status'],
      dataRows: [
          { sr_no: '1',   c_name: 'Angular',      t_name: 'Amisha Jangipuria', s_date: '11-11-2023',  e_date: '20-11-2023', t_status: 'COMPLETED'},
          { sr_no: '2',   c_name: 'Node JS',      t_name: 'John Smith',        s_date: '15-11-2023',  e_date: '25-11-2023', t_status: 'COMPLETED'},
          { sr_no: '3',   c_name: 'HTML CSS',     t_name: 'Alice Johnson',     s_date: '18-11-2023',  e_date: '28-11-2023', t_status: 'COMPLETED'},
          { sr_no: '4',   c_name: 'Data Science', t_name: 'Michael Brown',     s_date: '22-11-2023',  e_date: '02-12-2023', t_status: 'COMPLETED'},
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

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
  }



}
