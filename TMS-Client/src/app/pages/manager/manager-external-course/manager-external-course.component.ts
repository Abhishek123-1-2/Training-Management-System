import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StatusUpdateService } from '../status/status-update.service';

declare interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  number: string;
  emp_code: string;
  emp_name: string;
  c_name: string;
  status: string;
  action: string;
  registrationId: number;
  registrationDate: string;
  registrationComments: string;
  isApproved?: boolean;
  isRejected?: boolean;
}

interface ApiData {
  registrationId: number;
  empCode: string;
  empName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  courseName: string;
  status: string;
}

@Component({
  selector: 'manager-external-course',
  templateUrl: './manager-external-course.component.html',
  styleUrls: ['./manager-external-course.component.scss']
})
export class ManagerExternalCourseComponent implements OnInit {
  
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;

  constructor(private http: HttpClient, private statusUpdateService: StatusUpdateService) { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Course Name', 'Status', 'Action'],
      dataRows: [
        {number:'1', emp_code: '3647', emp_name: 'Yash Vinayak Gavanang', c_name: 'Angular', status: 'Registered', action: '', registrationId: 1, registrationDate: '', registrationComments: ''}
      ]
    };

    this.filteredData = [...this.tableData1.dataRows];

    const apiUrl = 'http://localhost:8083/api/registrations/details-for-external-course';

  this.http.get<ApiData[]>(apiUrl).subscribe(
    (data: any) => {
      // Assuming data is an array, you might need to adjust this based on your API response structure
      this.tableData1.dataRows = data
      .filter(item => item.status === 'Registered')
      .map((item, index): TableRow => ({
          number: String(index + 1),
          emp_code: item.empCode,
          emp_name: item.empName,
          c_name: item.courseName,
          status: item.status,
          action: '',
          registrationId: item.registrationId,
          registrationDate: item.registrationDate,
          registrationComments: item.registrationComments,
        })
      );

      this.filteredData = [...this.tableData1.dataRows];
    },
    (error) => {
      console.error('Error fetching data from API:', error);
    }
  );
  }

  approveRequest(row: any): void {
    console.log('Row object:', row);
  
    if (!row.isApproved) {
      // Check if registrationId is defined before making the request
      if (row.registrationId) {
        row.isApproved = true;
        alert('Request details have been approved');
  
        // Call the backend API to update the status to "confirmed"
        this.http.put(`http://localhost:8083/api/registrations/${row.registrationId}/status`, { registration_status: 'confirmed' })
          .subscribe(
            () => {
              console.log('Status updated to confirmed');
            },
            (error) => {
              console.error('Error updating status:', error);
            }
          );
  
        // Update the status in the local data
        row.status = 'Confirmed';
        this.statusUpdateService.updateStatus('Confirmed');
      } else {
        console.error('Invalid registrationId:', row.registrationId);
      }
    }
  }

  rejectRequest(row: any): void {
    if (!row.isRejected) {
      const reason = prompt("Please enter the reason for rejection:");
  
      if (reason === null) {
        return;
      }
  
      row.isRejected = true;
      alert("Request details have been rejected. Reason: " + reason);
      this.filteredData = this.filteredData.filter((r) => r !== row);
  
      // Call the backend API to update the status to "rejected" and set the rejection reason
      this.http.put(`http://localhost:8083/api/registrations/${row.registrationId}/status`, {
        registration_status: 'rejected',
        registrationResponse: reason
      }).subscribe(
        () => {
          console.log('Status updated to rejected');
        },
        (error) => {
          console.error('Error updating status:', error);
        }
      );
    }
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


}
