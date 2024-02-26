import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-services/employee.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'app/pages/login/login.service';
import { NotificationService } from '../../employee/notification.service';
declare interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  number: string;
  c_name: string;
  action: string;
  status: string;
  comments: string;
  view: string;
  training_id?: string;
  isEnrolled?: boolean;
  emp_id?: string; 
}

@Component({
  selector: 'external-course',
  templateUrl: './external-course.component.html',
  styleUrls: ['./external-course.component.scss']
})
export class ExternalCourseComponent implements OnInit {

  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  enrollmentStatusData: TableRow[] = [];
  public currentPage = 1;
  public itemsPerPage = 5;
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;

  constructor(private employeeService: EmployeeService, private http: HttpClient, private loginService: UserService,private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Action', 'Status', 'Comments','View'],
      dataRows: [
        {number: '1', c_name: 'Angular', action: '', status:'', comments: '', view: ''}
      ]
    };

    this.filteredData = [...this.tableData1.dataRows];

    const empId = this.loginService.getEmpId();

    if (!empId) {
      console.error('EmpId not available.');
      return;
    }

    this.employeeService.getExternalCourseTrainings(empId).subscribe(
      (data: any[]) => {
        this.tableData1.dataRows = data.map(
          (schedule, index): TableRow => ({
            number: String(index + 1),
            c_name: schedule.course,
            action: '',
            status: schedule.registrationStatus,
            comments: schedule.registrationResponse,
            view: '',
            training_id: schedule.trainingId,
          })
        );
        this.filteredData = [...this.tableData1.dataRows];
        // this.loadEnrollmentStatusFromLocalStorage();
      },
      (error) => {
        console.error('Error fetching the external course details', error);
      }
    );
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value && value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  sendRequest(row: TableRow): void {
    const loggedInUserData = this.loginService.getLoggedInUserData();
    if(!loggedInUserData) {
      return;
    }
    const employeeName = loggedInUserData.employeeName;
    const courseName = row.c_name;
    const empId = loggedInUserData.empId;

    const alreadyEnrolled = this.enrollmentStatusData.some(
      (enrollment) => 
      enrollment.number === row.number &&
      enrollment.c_name === row.c_name
    );

    if (alreadyEnrolled) {
      alert(`You have already enrolled for ${row.c_name} course.`);
      return;
    }

    const registrationData = {
      training_id: row.training_id,
      emp_id: empId,
      registration_date: new Date(),
      registration_comments: '',
      registration_status: 'Registered',
      registration_response: '',
    };

    this.employeeService.enrollForExternalTraining(registrationData).subscribe(
      (registrationId: number) => {
        console.log(`Enrollment successful. Registration ID: ${registrationId}`);
        alert(`Your Enrollment Request has been successfully sent for ${row.c_name} course`);

        row.view = '';
        row.isEnrolled = true;
        this.enrollmentStatusData.push({
          number: row.number,
          c_name: row.c_name,
          status: row.status,
          comments: row.comments,
          training_id: row.training_id,
          view: '',
          isEnrolled: true,
          action: '',
          emp_id: empId,
        });

        // this.saveEnrollmentStatusToLocalStorage();
        this.notificationService.showEnrollmentNotification(employeeName, courseName);
      },
      (error) => {
        console.error('Error enrolling in training:', error);
      }
    );
  }

  // private saveEnrollmentStatusToLocalStorage(): void {
  //   localStorage.setItem('enrollmentStatusData', JSON.stringify(this.enrollmentStatusData));
  // }

  // private loadEnrollmentStatusFromLocalStorage(): void {
  //   const storedData = localStorage.getItem('enrollmentStatusData');
  //   if (storedData) {
  //     const storedEnrollmentStatus: TableRow[] = JSON.parse(storedData);
  //     this.tableData1.dataRows.forEach((row) => {
  //       const matchingStoredEntry = storedEnrollmentStatus.find(
  //         (storedEntry) =>
  //           storedEntry.training_id === row.training_id
  //       );
  //       if (matchingStoredEntry) {
  //         row.isEnrolled = matchingStoredEntry.isEnrolled;
  //       }
  //     });
  //     this.enrollmentStatusData = storedEnrollmentStatus;
  //   }
  // }

  // get pages(): number[] {
  //   if (this.tableData1.dataRows.length === 0) {
  //       return [];
  //     }
    
  // const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  //   }

  // changeItemsPerPage(event: any): void {
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = 1; // Reset to the first page when changing items per page
  //   }
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
