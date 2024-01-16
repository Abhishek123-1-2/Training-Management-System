// import { Component, OnInit } from '@angular/core';

// declare interface TableData {
//   headerRow: string[];
//   dataRows: {
//     sr_no: string;
//     emp_code: string;
//     emp_name: string;
//     c_name: string;
//     start_date: string;
//     end_date: string;
//     action: string;
//   }[];
// }

// interface TableRow {
//   sr_no: string;
//   emp_code: string;
//   emp_name: string;
//   c_name: string;
//   start_date: string;
//   end_date: string;
//   action: string;
//   isApproved?: boolean;  // Optional property for approval status
//   isRejected?: boolean;  // Optional property for rejection status
// }

// @Component({
//   selector: 'training-request',
//   templateUrl: './training-request.component.html',
//   styleUrls: ['./training-request.component.scss']
// })
// export class TrainingRequestComponent implements OnInit {
//   public tableData1: TableData;
//   public filteredData: TableRow[];
//   public searchValue: string = '';
//   currentPage = 1;
//   itemsPerPage = 5;

//   constructor() { }

//   ngOnInit(): void {
//     this.tableData1 = {
//       headerRow: ['Sr No', 'Employee Code', 'Employee Name', 'Course Name', 'Start Date', 'End Date', 'Action'],
//       dataRows: [
//         {sr_no:'1',emp_code:'3647',emp_name:'Yash Gavanang',c_name:'Angular', start_date:'11-12-2023', end_date:'15-12-2023', action:'Approve'},
//         {sr_no:'2',emp_code:'3646',emp_name:'Abhishek Pillai',c_name:'Angular', start_date:'14-12-2023', end_date:'19-12-2023', action:'Approve'},
//         {sr_no:'3',emp_code:'3639',emp_name:'Mukul Gupta',c_name:'Angular', start_date:'13-12-2023', end_date:'18-12-2023', action:'Approve'},
//       ] 
//     };
//     this.filteredData = [...this.tableData1.dataRows];
//   }

//   applyFilter() {
//     this.filteredData = this.tableData1.dataRows.filter(row =>
//       Object.values(row).some(value =>
//         value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
//       )
//     );
//   }

//   get pages(): number[] {
//     if (this.filteredData.length === 0) {
//       return [];
//     }

//     const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   changeItemsPerPage(event: any): void {
//     this.itemsPerPage = +event.target.value;
//     this.currentPage = 1; // Reset to the first page when changing items per page
//   }

//   approveRequest(row: TableRow): void {
//     if (!row.isApproved) {
//       // Perform approval logic here

//       // Update the row property to disable the button
//       row.isApproved = true;

//       // Show the alert
//       alert("Request details have been approved");

//       this.filteredData = this.filteredData.filter((r) => r !== row);
//     }
//   }

//   rejectRequest(row: TableRow): void {
//     if (!row.isRejected) {
//       const reason = prompt("Please enter the reason for rejection:");

//       // Check if the user clicked 'Cancel' in the prompt
//       if (reason === null) {
//         return;
//       }

//       // Perform rejection logic here

//       // Update the row property to disable the button
//       row.isRejected = true;

//       // Show the alert
//       alert("Request details have been rejected. Reason: " + reason);

//       this.filteredData = this.filteredData.filter((r) => r !== row);
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusUpdateService } from '../status/status-update.service';

interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    c_name: string;
    start_date: string;
    end_date: string;
    status: string;
    action: string;
    isApproved?: boolean;
    isRejected?: boolean;
  }[];
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
  selector: 'training-request',
  templateUrl: './training-request.component.html',
  styleUrls: ['./training-request.component.scss']
})
export class TrainingRequestComponent implements OnInit {
  public tableData1: TableData = {
    headerRow: ['Sr No', 'Employee Code', 'Employee Name', 'Course Name', 'Start Date', 'End Date', 'Status', 'Action'],
    dataRows: []
  };
  public filteredData: TableData['dataRows'];
  public searchValue: string = '';
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private httpClient: HttpClient, private statusUpdateService: StatusUpdateService) { }

  ngOnInit(): void {
    const apiEndpoint = 'http://localhost:8083/api/registrations/details-with-planned-dates';

    this.httpClient.get<ApiData[]>(apiEndpoint).subscribe(
      (data) => {
        this.tableData1.dataRows = data
          .filter(item => item.status === 'Registered')
          .map((item, index) => ({
            sr_no: (index + 1).toString(),
            emp_code: item.empCode,
            emp_name: item.empName,
            c_name: item.courseName,
            start_date: item.plannedStartDate ? item.plannedStartDate.split('T')[0] : '',
            end_date: item.plannedEndDate ? item.plannedEndDate.split('T')[0] : '',
            status: item.status,
            action: 'Approve',
            registrationId: item.registrationId,
          }));
        this.filteredData = [...this.tableData1.dataRows];
      },
      (error) => {
        console.error('Error fetching data from the API', error);
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

  // approveRequest(row: any): void {
  //   if (!row.isApproved) {
  //     row.isApproved = true;
  //     alert("Request details have been approved");
  //     this.filteredData = this.filteredData.filter((r) => r !== row);
  //   }
  // }

  approveRequest(row: any): void {
    console.log('Row object:', row);
  
    if (!row.isApproved) {
      // Check if registrationId is defined before making the request
      if (row.registrationId) {
        row.isApproved = true;
        alert('Request details have been approved');
  
        // Call the backend API to update the status to "confirmed"
        this.httpClient.put(`http://localhost:8083/api/registrations/${row.registrationId}/status`, { registration_status: 'confirmed' })
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
      this.httpClient.put(`http://localhost:8083/api/registrations/${row.registrationId}/status`, {
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
  
}
