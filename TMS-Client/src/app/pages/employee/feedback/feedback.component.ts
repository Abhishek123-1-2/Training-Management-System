import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/pages/login/login.service';

declare interface TableData {
  headerRow: string[];
  dataRows: {

number: string;
course: string;
trainerName: string;
trainingStatus: string; 
plannedStartDate:string;
plannedEndDate:string; 
action: string; 
  }[];
}

interface TableRow {
  number: string;
  course: string;
  trainerName: string;
  trainingStatus: string; 
  plannedStartDate:string;
  plannedEndDate:string; 
  action: string; 
  scheduleId?: string;
}


@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['No.','Course','Trainer Name','Start Date','End Date','Status', 'Action'],
      dataRows: [{
        number:'1', course:'Java', trainerName:'Kishor', plannedStartDate:'1-12-2023', plannedEndDate:'5-12-2023', trainingStatus:'Completed', action:'Give Feedback'
      }]
  }

    const empId = this.userService.getEmpId();
    this.httpClient.get<any[]>(`http://localhost:8083/api/completed-courses/${empId}`)
      .subscribe(data => {
        // Transform the data received from the backend into the format expected by the table
        this.tableData1 = {
          headerRow: ['No.', 'Course', 'Trainer Name', 'Start Date', 'End Date', 'Status', 'Action'],
          dataRows: data.map((item, index) => ({
            scheduleId: item.scheduleId,
            number: (index + 1).toString(),
            course: item.course,
            trainerName: item.trainerName.split('(')[0].trim(),
            plannedStartDate: this.formatDate(item.plannedStartDate),
            plannedEndDate: this.formatDate(item.plannedEndDate),
            trainingStatus: item.trainingStatus,
            action: 'Give Feedback'
          }))
        };
        this.filteredData = [...this.tableData1.dataRows];
        this.currentPage = Math.min(this.currentPage, this.pages.length);
        console.log('Schedule Ids:', data.map(item => item.scheduleId).join(', '));
      });
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
  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  // get pages(): number[] {
  //   if (this.tableData1.dataRows.length === 0) {
  //     return [];
  //   }

  //   const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }

  // changeItemsPerPage(event: any): void {
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = 1;
  // }


}
