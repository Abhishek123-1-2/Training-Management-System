// participants-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// interface TableRow {
//   sr_no: string;
//   emp_code: string;
//   emp_name: string;
//   designation: string;
//   department: string;
//   email_id: string;
// }
interface TableRow {
  sr_no: string;
  emp_code: string;
  emp_name: string;
  course: string; // Add this line
  designation: string;
  department: string;
  email_id: string;
}

@Component({
  selector: 'participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {
  public tableData1: { headerRow: string[]; dataRows: TableRow[] } = { headerRow: [], dataRows: [] };
  public filteredData: TableRow[] = [];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  private courseName: string = "Computer Vision";
  public course: string = '';
  public trainingStatus: string = '';
  public trainerName: string = '';
  public plannedStartDate: string = '';
  public plannedEndDate: string = '';
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

 
  // ngOnInit(): void {
  //   this.route.queryParams.subscribe((params) => {
  //     this.course = params['course'] || ''; // Assign the fetched course value or an empty string if not provided
  //     const trainingStatus = params['trainingStatus'];
  //     const trainerName = params['trainerName'];
  //     const plannedStartDate = params['plannedStartDate'];
  //     const plannedEndDate = params['plannedEndDate'];
  
  //     this.fetchEmployeeData(this.course, trainingStatus, trainerName, plannedStartDate, plannedEndDate);
  //     console.log('Course:', this.course);
  //   });
  // }
  // ngOnInit(): void {
  //   const navigationState = window.history.state;
  //   this.course = navigationState.course;
  //   this.trainingStatus = navigationState.trainingStatus;
  //   this.trainerName = navigationState.trainerName;
  //   this.plannedStartDate = navigationState.plannedStartDate;
  //   this.plannedEndDate = navigationState.plannedEndDate;
  
  //   // Call your data-fetching function here with the retrieved parameters
  //   this.fetchEmployeeData(this.course, this.trainingStatus, this.trainerName, this.plannedStartDate, this.plannedEndDate);
  // }
  ngOnInit(): void {
    // Retrieve parameters from local storage
    this.course = localStorage.getItem('course') || '';
    this.trainingStatus = localStorage.getItem('trainingStatus') || '';
    this.trainerName = localStorage.getItem('trainerName') || '';
    this.plannedStartDate = localStorage.getItem('plannedStartDate') || '';
    this.plannedEndDate = localStorage.getItem('plannedEndDate') || '';

    // Call your data-fetching function here with the retrieved parameters
    this.fetchEmployeeData(this.course, this.trainingStatus, this.trainerName, this.plannedStartDate, this.plannedEndDate);
}
  // ngOnInit(): void {
  //   const navigation = this.router.getCurrentNavigation();
  //   if (navigation && navigation.extras && navigation.extras.state) {
  //     const state = navigation.extras.state;
  //     this.course = state.course || '';
  //     const trainingStatus = state.trainingStatus;
  //     const trainerName = state.trainerName;
  //     const plannedStartDate = state.plannedStartDate;
  //     const plannedEndDate = state.plannedEndDate;
  
  //     this.fetchEmployeeData(this.course, trainingStatus, trainerName, plannedStartDate, plannedEndDate);
  //     console.log('Course:', this.course);
  //   }
  // }
 
  // ngOnInit(): void {
  //   const navigationState = this.router.getCurrentNavigation()?.extras.state;
  //   if (navigationState) {
  //     this.course = navigationState.course;
  //     this.trainingStatus = navigationState.trainingStatus;
  //     this.trainerName = navigationState.trainerName;
  //     this.plannedStartDate = navigationState.plannedStartDate;
  //     this.plannedEndDate = navigationState.plannedEndDate;
  //   }
  // }
  
  sendEmails(): void {
    const emailBodyTemplate = `
      <div style="background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
          <h2 style="color: #333333;">Course Completion Feedback Form</h2>
          <p>Dear {empName},</p>
          <p>Congratulations for completing the ${this.course} course. We have provided a feedback form for the ${this.course} course that you have completed. Please fill out the feedback form as soon as possible.</p>
          <p>Feedback Form Link: <a href="https://forms.office.com/r/vif9DV5UuY">Feedback Form</a></p>
          <p>Best Regards</p>
          <p style="color: red;"><strong>Disclaimer:</strong> This is an auto-generated email. Please do not reply to this email.</p>
        </div>
      </div>
    `;
  
    this.filteredData.forEach(employee => {
      const emailBody = emailBodyTemplate.replace('{empName}', employee.emp_name);
      this.sendEmail(employee.email_id, emailBody);
    });
  }
  
  
  sendEmail(email: string, emailBody: string): void {
    const emailData = {
      emails: [email],
      subject: 'Course Completion Feedback Form',
      body: emailBody
    };

    this.http.post('http://localhost:8083/api/send-multiple-emails', emailData).subscribe(
      () => {
        console.log(`Email sent successfully to ${email}`);
      },
      (error) => {
        console.error(`Error sending email to ${email}:`, error);
      }
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
//   fetchEmployeeData(): void {
//     const apiUrl = `http://localhost:8083/api/registrations/attendees?course=${this.course}&trainingStatus=${this.trainingStatus}&trainerName=${this.trainerName}&plannedStartDate=${this.plannedStartDate}&plannedEndDate=${this.plannedEndDate}`;

//     this.http.get<any[]>(apiUrl).subscribe(
//       (data) => {
//         this.tableData1 = {
//           headerRow: ['No.', 'Employee Code', 'Employee Name','Course', 'Designation', 'Department', 'Email ID'],
//           dataRows: data.map((item, index) => ({
//             sr_no: (index + 1).toString(),
//             emp_code: item.empCode,
//             emp_name: item.empName,
//             course: item.course,
//             designation: item.designationName,
//             department: item.functionName,
//             email_id: item.email,
//           })),
//         };
//       },
//       (error) => {
//         console.error('Error fetching employee data:', error);
//       }
//     );
//   }
// }
  fetchEmployeeData(course: string, trainingStatus: string, trainerName: string, plannedStartDate: string, plannedEndDate: string): void {
    // Check if trainingStatus is "On-Going" before making the API request
    if (trainingStatus !== 'On-Going') {
      this.filteredData = [];
      return;
    }

    const apiUrl = `http://localhost:8083/api/registrations/attendees?course=${course}&trainingStatus=${trainingStatus}&trainerName=${trainerName}&plannedStartDate=${plannedStartDate}&plannedEndDate=${plannedEndDate}`;

    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        // Map the API response properties to TableRow properties
        this.tableData1 = {
          headerRow: ['No.', 'Employee Code', 'Employee Name','Course', 'Designation', 'Department', 'Email ID'],
          dataRows: data.map((item, index) => ({
            sr_no: (index + 1).toString(),
            emp_code: item.empCode,
            emp_name: item.empName,
            course: item.course,
            designation: item.designationName,
            department: item.functionName,
            email_id: item.email,
          })),
        };
        this.filteredData = [...this.tableData1.dataRows];
      },
      (error) => {
        console.error('Error fetching employee data:', error);
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

 
 
}
