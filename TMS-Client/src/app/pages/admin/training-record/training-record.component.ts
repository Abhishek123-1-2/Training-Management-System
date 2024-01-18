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
  selector: 'training-record',
  moduleId: module.id,
  templateUrl: './training-record.component.html',
})
export class TrainingRecordComponent implements OnInit {
  public tableData1: TableData = { headerRow: [], dataRows: [] };
  public filteredData: TableRow[] = [];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
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
            t_name: item.trainerName,
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
  // get pages(): number[] {
  //   if (this.filteredData.length === 0) {
  //     return [];
  //   }

  //   const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }
  // get pages(): number[] {
  //   return this.calculatePagesToShow();
  // }
  
  // onPageChange(page: number): void {
  //   this.currentPage = page;
  //   this.updateVisiblePages();
  //   this.applyFilter();
  // }
  // updateVisiblePages(): void {
  //   const totalPages = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
  //   const halfPaginatorSize = Math.floor(this.rollingPaginatorSize / 2);

  //   if (totalPages <= this.rollingPaginatorSize) {
  //     this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
  //   } else {
  //     if (this.currentPage <= halfPaginatorSize) {
  //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => i + 1);
  //     } else if (this.currentPage >= totalPages - halfPaginatorSize) {
  //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => totalPages - this.rollingPaginatorSize + i + 1);
  //     } else {
  //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => this.currentPage - halfPaginatorSize + i);
  //     }
  //   }
  // }
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
    this.applyFilter();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateVisiblePages();
    this.applyFilter();
  }

  updateVisiblePages(): void {
    const totalPages = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    const halfPaginatorSize = Math.floor(this.rollingPaginatorSize / 2);

    if (totalPages <= this.rollingPaginatorSize) {
      this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (this.currentPage <= halfPaginatorSize) {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => i + 1);
      } else if (this.currentPage >= totalPages - halfPaginatorSize) {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => totalPages - this.rollingPaginatorSize + i + 1);
      } else {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => this.currentPage - halfPaginatorSize + i);
      }
    }
  }
  // changeItemsPerPage(event: any): void {
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = 1;
  // }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  public get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }
  

  nextPage() {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
}
