import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    c_name: string;
    t_name: string;
    view: string;
  }[];
}

interface TableRow {
  sr_no: string;
  c_name: string;
  t_name: string;
  view: string;
}
@Component({
  selector: 'report-main',
  moduleId: module.id,
  templateUrl: 'report-main.component.html',
})
export class ReportMainComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  c_name: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.c_name = params['c_name'];
    })
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Records'],
      dataRows: [
        {sr_no:'1', c_name:'Angular', t_name:'Steve Smith', view:''},
        {sr_no:'2', c_name:'Node JS', t_name:'Mathew Wade', view:''},
        {sr_no:'3', c_name:'PLSQL', t_name:'Marcus Stoinis', view:''},
        {sr_no:'4', c_name:'Java', t_name:'Mitch Starc', view:''},
        {sr_no:'5', c_name:'SpringBoot', t_name:'Nathan Lyon', view:''},
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

  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value,
    this.currentPage = 1; 
  }

}
