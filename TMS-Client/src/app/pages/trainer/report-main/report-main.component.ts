import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface TrainingSchedule {
  scheduleId: number;
  course: string;
  trainerName: string;
}

interface TableRow {
  sr_no: string;
  scheduleId: number; // Added scheduleId
  c_name: string; // Course Name
  t_name: string; // Trainer Name
  view: string;
}

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

@Component({
  selector: 'report-main',
  moduleId: module.id,
  templateUrl: './report-main.component.html',
})
export class ReportMainComponent implements OnInit {
  public tableData1: TableData = { headerRow: [], dataRows: [] };
  public filteredData: TableRow[] = [];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTrainingScheduleList();
  }

  fetchTrainingScheduleList(): void {
    this.http.get<TrainingSchedule[]>('http://localhost:8083/api/training-views/schedule-list').subscribe(
      (data) => {
        this.tableData1 = {
          headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Records'],
          dataRows: data.map((item, index) => ({
            sr_no: (index + 1).toString(),
            scheduleId: item.scheduleId, // Added scheduleId
            c_name: item.course,
            t_name: this.extractTrainerName(item.trainerName),
            view: 'View',
          })),
        };
        this.applyFilter();
      },
      (error) => {
        console.error('Error fetching training schedule list:', error);
      }
    );
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter((row) =>
      Object.values(row).some((value) =>
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
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }
}
