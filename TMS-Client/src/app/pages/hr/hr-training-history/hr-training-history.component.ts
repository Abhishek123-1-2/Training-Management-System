import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface TableRow {
  sr_no: string;
  c_name: string;
  t_name: string;
  s_date: string;
  e_date: string;
  t_status: string;
}

interface ApiTrainingRow {
  course: string;
  trainerName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  trainingStatus: string;
}

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

@Component({
  selector: 'hr-training-history',
  templateUrl: './hr-training-history.component.html',
  styleUrls: ['./hr-training-history.component.scss']
})
export class HrTrainingHistoryComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch data from the API endpoint
    this.http.get<ApiTrainingRow[]>('http://localhost:8083/api/training-views/completed-courses').subscribe(
      (data) => {
        // Map the API response to the TableRow format
        this.tableData1 = {
          headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Training Status'],
          dataRows: data.map((item, index) => ({
            sr_no: (index + 1).toString(),
            c_name: item.course,
            t_name: this.extractTrainerName(item.trainerName),
            s_date: item.plannedStartDate? item.plannedStartDate.split('T')[0] : '',
            e_date: item.plannedEndDate? item.plannedEndDate.split('T')[0] : '',
            t_status: item.trainingStatus,
          })),
        };
        this.filteredData = [...this.tableData1.dataRows];
      },
      (error) => {
        console.error('Error fetching training history:', error);
      }
    );
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  private extractTrainerName(fullName: string): string {
    const indexOfOpeningBracket = fullName.indexOf('(');
    if (indexOfOpeningBracket !== -1) {
      return fullName.substring(0, indexOfOpeningBracket).trim();
    } else {
      return fullName.trim();
    }
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
    this.currentPage = 1;
  }



}
