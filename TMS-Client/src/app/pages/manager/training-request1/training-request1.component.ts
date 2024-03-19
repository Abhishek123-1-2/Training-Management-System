import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  selector: 'training-request1',
  templateUrl: './training-request1.component.html',
  styleUrls: ['./training-request1.component.scss']
})
export class TrainingRequest1Component implements OnInit {
  public tableData1: TableData = {
    headerRow: ['Sr No', 'Employee Code', 'Employee Name', 'Course Name', 'Start Date', 'End Date', 'Status', 'Action'],
    dataRows: []
  };
  public filteredData: TableData['dataRows'];
  public searchValue: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  constructor(private httpClient: HttpClient) { }

  // ngOnInit(): void {
  //   const apiEndpoint = 'http://localhost:8083/api/registrations/details-with-planned-dates-on-request';

  //   this.httpClient.get<ApiData[]>(apiEndpoint).subscribe(
  //     (data) => {
  //       this.tableData1.dataRows = data
  //         .filter(item => item.status === 'Registered')
  //         .map((item, index) => ({
  //           sr_no: (index + 1).toString(),
  //           emp_code: item.empCode,
  //           emp_name: item.empName,
  //           c_name: item.courseName,
  //           start_date: item.plannedStartDate ? item.plannedStartDate.split('T')[0] : '',
  //           end_date: item.plannedEndDate ? item.plannedEndDate.split('T')[0] : '',
  //           status: item.status,
  //           action: 'Approve',
  //           registrationId: item.registrationId,
  //         }));
  //       this.filteredData = [...this.tableData1.dataRows];
  //     },
  //     (error) => {
  //       console.error('Error fetching data from the API', error);
  //     }
  //   );
  // }
  ngOnInit(): void {
    const apiEndpoint = 'http://localhost:8083/api/registrations/details-with-planned-dates-on-request';
  
    // Retrieve subordinateEmpCodes from localStorage
    const subordinateEmpCodes = JSON.parse(localStorage.getItem('subordinateEmpCodes'));
  
    this.httpClient.get<ApiData[]>(apiEndpoint).subscribe(
      (data) => {
        this.tableData1.dataRows = data
          .filter(item => item.status === 'Registered' && subordinateEmpCodes.includes(item.empCode)) // Filter based on subordinateEmpCodes
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

  // get pages(): number[] {
  //   if (this.filteredData.length === 0) {
  //     return [];
  //   }

  //   const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }

  // changeItemsPerPage(event: any): void {
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = 1;
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

  // approveRequest(row: any): void {
  //   console.log('Row object:', row);
  
  //   if (!row.isApproved) {
  //     // Check if registrationId is defined before making the request
  //     if (row.registrationId) {
  //       row.isApproved = true;
  //       alert('Request details have been approved');
  
  //       // Call the backend API to update the status to "confirmed"
  //       this.httpClient.put(`http://localhost:8083/api/registrations/${row.registrationId}/status`, { registration_status: 'confirmed' })
  //         .subscribe(
  //           () => {
  //             console.log('Status updated to confirmed');
  //           },
  //           (error) => {
  //             console.error('Error updating status:', error);
  //           }
  //         );
  
  //       // Update the status in the local data
  //       row.status = 'confirmed';
  //     } else {
  //       console.error('Invalid registrationId:', row.registrationId);
  //     }
  //   }
  // }

  
  // rejectRequest(row: any): void {
  //   if (!row.isRejected) {
  //     const reason = prompt("Please enter the reason for rejection:");
  
  //     if (reason === null) {
  //       return;
  //     }
  
  //     row.isRejected = true;
  //     alert("Request details have been rejected. Reason: " + reason);
  //     this.filteredData = this.filteredData.filter((r) => r !== row);
  
  //     // Call the backend API to update the status to "rejected" and set the rejection reason
  //     this.httpClient.put(`http://localhost:8083/api/registrations/${row.registrationId}/status`, {
  //       registration_status: 'rejected',
  //       registrationResponse: reason
  //     }).subscribe(
  //       () => {
  //         console.log('Status updated to rejected');
  //       },
  //       (error) => {
  //         console.error('Error updating status:', error);
  //       }
  //     );
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
  
        // Retrieve employee email based on employee name
        this.httpClient.get(`http://localhost:8083/api/employees/email?empName=${row.emp_name}`)
          .subscribe(
            (data: any) => {
              const employeeEmail = data.email;
  
              // Construct email body
              const emailBody = `
                <div style="background-color: #f2f2f2; padding: 20px;">
                  <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                    <h2 style="color: #333333;">Course Enrollment Confirmation</h2>
                    <p>Dear ${row.emp_name},</p>
                    <p>Your Course Enrollment Request for ${row.c_name}, which will be scheduled from ${row.start_date} to ${row.end_date}, has been accepted.</p>
                    <p>Thank you!</p>
                    <p style="color: red;"><strong>Disclaimer:</strong> This is a system-generated email. Please do not reply to this email.</p>
                  </div>
                </div>
              `;
  
              // Send email
              this.sendEmail(employeeEmail, 'Course Enrollment Confirmation', emailBody);
            },
            (error) => {
              console.error('Error fetching employee email:', error);
            }
          );
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
  
          // Retrieve employee email based on employee name
          this.httpClient.get(`http://localhost:8083/api/employees/email?empName=${row.emp_name}`)
            .subscribe(
              (data: any) => {
                const employeeEmail = data.email;
  
                // Construct email body
                const emailBody = `
                  <div style="background-color: #f2f2f2; padding: 20px;">
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                      <h2 style="color: #333333;">Enrollment Request Rejected</h2>
                      <p>Dear ${row.emp_name},</p>
                      <p>Your Course Enrollment Request for ${row.c_name}, which was scheduled from ${row.start_date} to ${row.end_date}, has been rejected.</p>
                      <p>Reason: ${reason}</p>
                      <p style="color: red;"><strong>Disclaimer:</strong> This is a system-generated email. Please do not reply to this email.</p>
                    </div>
                  </div>
                `;
  
                // Send email
                this.sendEmail(employeeEmail, 'Enrollment Request Rejected', emailBody);
              },
              (error) => {
                console.error('Error fetching employee email:', error);
              }
            );
        },
        (error) => {
          console.error('Error updating status:', error);
        }
      );
    }
  }
  
  sendEmail(email: string, subject: string, body: string): void {
    this.httpClient.post('http://localhost:8083/api/send-email', { email, subject, body }).subscribe(
      () => {
        console.log('Email sent successfully!');
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
  }
}
