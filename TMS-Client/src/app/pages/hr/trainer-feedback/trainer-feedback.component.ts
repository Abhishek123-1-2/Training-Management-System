import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}


@Component({
  selector: 'trainer-feedback',
  templateUrl: './trainer-feedback.component.html',
  styleUrls: ['./trainer-feedback.component.scss']
})
export class TrainerFeedbackComponent implements OnInit {

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

  public tableData1: TableData;
  ngOnInit() {
    this.tableData1 = {
      headerRow: ['Sr. No', 'Trainer Name', 'Course Name', 'Effectiveness Rating', 'Content Rating', 'Methodology Rating', 'Trainer Rating', 'Organization Rating'],
      dataRows: [
        ['1', 'Daniels', 'Java', '4', '3', '2', '5', '4.2'],
        ['2', 'Sam', 'SQL', '3', '4', '5', '4', '3.8'],
        ['3', 'Jack', 'IBM', '5', '4', '3', '2', '4.0'],
        ['4', 'Sophie', 'Python', '4', '3', '4', '4', '4.0'],
        ['5', 'Alex', 'JavaScript', '3', '4', '3', '5', '3.8'],
        ['6', 'Emma', 'Angular', '5', '5', '4', '4', '4.6'],
        ['7', 'Charlie', 'React', '4', '3', '5', '3', '3.8'],
        ['8', 'Grace', 'C#', '5', '5', '5', '5', '4.8'],
        ['9', 'Henry', 'HTML/CSS', '3', '4', '3', '4', '3.6'],
        ['10', 'Lily', 'PHP', '4', '5', '4', '3', '4.0'],
      ]
    };
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value,
    this.currentPage = 1;
  }

}
