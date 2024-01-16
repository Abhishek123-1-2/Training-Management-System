// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../employee-services/employee.service';
// import { UserService } from 'app/pages/login/login.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// interface TableData {
//   headerRow: string[];
//   dataRows: TableRow[];
// }

// interface TableRow {
//   t_id: string;
//   c_name: string;
//   t_name: string;
//   s_date: string;
//   e_date: string;
//   status: string;
//   enroll: string;
//   isEnrolled?: boolean;
//   training_id?: string;
//   schedule_id?: string;
//   emp_id?: string;
// }

// @Component({
//   selector: 'user-dashboard',
//   moduleId: module.id,
//   templateUrl: './user-dashboard.component.html',
// })
// export class UserDashboardComponent implements OnInit {
//   public tableData1: TableData;
//   public filteredData: TableRow[];
//   public searchValue: string = '';
//   enrollmentStatusData: TableRow[] = [];

//   currentPage = 1;
//   itemsPerPage = 5;

//   enrollmentStatusPage = 1;
//   enrollmentStatusItemsPerPage = 3;

//   confirmationStatusPage = 1;
//   confirmationStatusItemsPerPage = 3;

//   empId: string;

  
//   confirmationStatusData: TableRow[] = [];

//   constructor(
//     private employeeService: EmployeeService,
//     private loginService: UserService,
//     private route: ActivatedRoute,
//     private httpClient: HttpClient,
//     private router: Router 
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.empId = params['empId'];
//       console.log('EmpId:', this.empId);
//       this.fetchDataForUser(this.empId);
//     });

//     this.tableData1 = {
//       headerRow: [
//         'Sr No.',
//         'Course Name',
//         'Trainer Name',
//         'Start Date',
//         'End Date',
//         'Status',
//         'Enroll',
//       ],
//       dataRows: [
//         {
//           t_id: '1',
//           c_name: 'Angular',
//           t_name: 'Amisha Jangipuria',
//           s_date: '29-11-2023',
//           e_date: '04-12-2023',
//           status: 'Upcoming',
//           enroll: 'Enroll',
//         },
//         {
//           t_id: '2',
//           c_name: 'Introduction to Web Development',
//           t_name: 'John Doe',
//           s_date: '30-11-2023',
//           e_date: '07-12-2023',
//           status: 'Upcoming',
//           enroll: 'Enroll',
//         },
//         {
//           t_id: '3',
//           c_name: 'Advanced JavaScript',
//           t_name: 'Jane Smith',
//           s_date: '01-12-2023',
//           e_date: '12-12-2023',
//           status: 'Upcoming',
//           enroll: 'Enroll',
//         },
//       ],
//     };

//     this.filteredData = [...this.tableData1.dataRows];
//     this.fetchTrainingSchedule();
//     this.loadEnrollmentStatusFromLocalStorage();
//     this.fetchConfirmationStatusData();
//   }
//   // fetchConfirmationStatusData(): void {
//   //   const empId = this.empId; // Use the employee ID as needed

//   //   this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/details-with-additional/${empId}`).subscribe(
//   //     (data: any[]) => {
//   //       // Process the API response and extract the courseName
//   //       const confirmationStatusData = data.map((entry, index) => ({
//   //         t_id: String(index + 1),
//   //         c_name: entry.courseName, // Display courseName in the table
//   //         t_name: entry.trainerName,
//   //         s_date: entry.startDate,
//   //         e_date: entry.endDate,
//   //         status: entry.status,
//   //         enroll: 'Enroll',
//   //       }));

//   //       this.confirmationStatusData = confirmationStatusData;
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching confirmation status data:', error);
//   //     }
//   //   );
//   // }
//   // fetchConfirmationStatusData(): void {
//   //   // Use the stored empId from localStorage
//   //   const empId = this.loginService.getEmpId();
  
//   //   if (!empId) {
//   //     // Handle the case where empId is not available
//   //     console.error('EmpId not available.');
//   //     return;
//   //   }
  
//   //   this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/details-with-additional/${empId}`).subscribe(
//   //     (data: any[]) => {
//   //       // Process the API response and extract the courseName
//   //       const confirmationStatusData = data.map((entry, index) => ({
//   //         t_id: String(index + 1),
//   //         c_name: entry.courseName, // Display courseName in the table
//   //         t_name: entry.trainerName,
//   //         s_date: entry.startDate,
//   //         e_date: entry.endDate,
//   //         status: entry.status,
//   //         enroll: 'Enroll',
//   //       }));
  
//   //       this.confirmationStatusData = confirmationStatusData;
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching confirmation status data:', error);
//   //     }
//   //   );
//   // }
//   // fetchConfirmationStatusData(): void {
//   //   const empId = this.loginService.getEmpId();
  
//   //   if (!empId) {
//   //     console.error('EmpId not available.');
//   //     return;
//   //   }
  
//   //   this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/details-with-additional/${empId}`).subscribe(
//   //     (data: any[]) => {
//   //       // Filter data based on "trainingStatus" being "Completed"
//   //       const completedStatusData = data.filter(entry => entry.trainingStatus === 'Completed');
  
//   //       // Process the filtered data and extract the courseName
//   //       const confirmationStatusData = completedStatusData.map((entry, index) => ({
//   //         t_id: String(index + 1),
//   //         c_name: entry.courseName,
//   //         t_name: entry.trainerName,
//   //         s_date: entry.startDate,
//   //         e_date: entry.endDate,
//   //         status: entry.status,
//   //         enroll: 'Enroll',
//   //       }));
  
//   //       this.confirmationStatusData = confirmationStatusData;
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching confirmation status data:', error);
//   //     }
//   //   );
//   // }
//   fetchConfirmationStatusData(): void {
//     const empId = this.loginService.getEmpId();
  
//     if (!empId) {
//       console.error('EmpId not available.');
//       return;
//     }
  
//     this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/details-with-additional/${empId}`).subscribe(
//       (data: any[]) => {
//         // Filter data based on "trainingStatus" being "Upcoming" or "On-Going"
//         const filteredStatusData = data.filter(entry => entry.trainingStatus !== 'Completed');
  
//         // Process the filtered data and extract the courseName
//         const confirmationStatusData = filteredStatusData.map((entry, index) => ({
//           t_id: String(index + 1),
//           c_name: entry.courseName,
//           t_name: entry.trainerName,
//           s_date: entry.startDate,
//           e_date: entry.endDate,
//           status: entry.status,
//           enroll: 'Enroll',
//         }));
  
//         this.confirmationStatusData = confirmationStatusData;
//       },
//       (error) => {
//         console.error('Error fetching confirmation status data:', error);
//       }
//     );
//   }
  
  
//   viewConfirmationDetails(courseName: string): void {
//     // Navigate to confirmationstatus-details component with the selected courseName
//     this.router.navigate(['/confirmationstatus-details', courseName]);
//   }

//   fetchDataForUser(empId: string): void {
//     console.log(`Fetching data for user with empId: ${empId}`);
//     // Implement logic to fetch data for the user based on empId
//   }

//   fetchTrainingSchedule(): void {
//     this.employeeService.getTrainingPreDefinedSchedule().subscribe(
//       (scheduleData: any[]) => {
//         scheduleData.forEach((entry) => {
//           console.log(
//             `Training ID: ${entry.trainingId}, Schedule ID: ${entry.scheduleId}`
//           );
//         });

//         // const preDefinedSchedules = scheduleData.filter(
//         //   (schedule) =>
//         //     // schedule.trainingStatus === 'Upcoming'
//         // );

//         this.tableData1.dataRows = scheduleData.map(
//           (schedule, index): TableRow => ({
//             t_id: String(index + 1),
//             c_name: schedule.course,
//             t_name: schedule.trainerName.split('(')[0].trim(),
//             s_date: schedule.plannedStartDate
//               ? schedule.plannedStartDate.split('T')[0]
//               : '',
//             e_date: schedule.plannedEndDate
//               ? schedule.plannedEndDate.split('T')[0]
//               : '',
//             status: schedule.trainingStatus,
//             enroll: 'Enroll',
//             isEnrolled: false,
//             training_id: String(schedule.trainingId),
//             schedule_id: String(schedule.scheduleId),
//             emp_id: String(schedule.empId),
//           })
//         );

//         this.filteredData = [...this.tableData1.dataRows];
//       },
//       (error) => {
//         console.error('Error fetching training schedule data:', error);
//       }
//     );
//   }

//   applyFilter(): void {
//     this.filteredData = this.tableData1.dataRows.filter((row) =>
//       Object.values(row).some((value) =>
//         value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
//       )
//     );
//   }

//   enrollButtonClicked(training: TableRow): void {
//     const loggedInUserData = this.loginService.getLoggedInUserData();

//     if (!loggedInUserData) {
//       // Handle the case where user data is not available
//       return;
//     }

//     const empId = loggedInUserData.empId;

//     const alreadyEnrolled = this.enrollmentStatusData.some(
//       (enrollment) =>
//         enrollment.t_id === training.t_id &&
//         enrollment.c_name === training.c_name &&
//         enrollment.t_name === training.t_name &&
//         enrollment.s_date === training.s_date &&
//         enrollment.e_date === training.e_date
//     );

//     if (alreadyEnrolled) {
//       alert(`You have already enrolled for ${training.c_name} course.`);
//       return;
//     }

//     const registrationData = {
//       schedule_id: training.schedule_id,
//       training_id: training.training_id,
//       emp_id: empId,
//       registration_date: new Date(),
//       registration_comments: '',
//       registration_status: 'Registered',
//       registration_response: '',
//     };

//     this.employeeService.enrollTraining(registrationData).subscribe(
//       (registrationId: number) => {
//         console.log(`Enrollment successful. Registration ID: ${registrationId}`);
  //         alert(
  //           `Your Enrollment Request has been successfully sent to Reporting Manager for ${training.c_name} course`
  //         );

//         training.isEnrolled = true;

//         this.enrollmentStatusData.push({
//           t_id: training.t_id,
//           c_name: training.c_name,
//           t_name: training.t_name,
//           s_date: training.s_date,
//           e_date: training.e_date,
//           status: 'Pending',
//           enroll: 'Enroll',
//           isEnrolled: true,
//           training_id: training.training_id,
//           schedule_id: training.schedule_id,
//           emp_id: empId,
//         });

//         this.enrollmentStatusData = this.enrollmentStatusData.filter(entry => entry.emp_id === empId);

//         this.saveEnrollmentStatusToLocalStorage();
//       },
//       (error) => {
//         console.error('Error enrolling in training:', error);
//       }
//     );
//   }

//   changeItemsPerPage(event: any, tableType: string): void {
//     if (tableType === 'upcomingCourse') {
//       this.itemsPerPage = +event.target.value;
//       this.currentPage = 1;
//     } else if (tableType === 'enrollmentStatus') {
//       this.enrollmentStatusItemsPerPage = +event.target.value;
//       this.enrollmentStatusPage = 1;
//     } else if (tableType === 'confirmationStatus') {
//       this.confirmationStatusItemsPerPage = +event.target.value;
//       this.confirmationStatusPage = 1;
//     }
//   }

//   get pages(): number[] {
//     if (this.tableData1.dataRows.length === 0) {
//       return [];
//     }

//     const pageCount = Math.ceil(
//       this.tableData1.dataRows.length / this.itemsPerPage
//     );
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   get enrollmentStatusPages(): number[] {
//     if (this.enrollmentStatusData.length === 0) {
//       return [];
//     }
//     const pageCount = Math.ceil(
//       this.enrollmentStatusData.length / this.enrollmentStatusItemsPerPage
//     );
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   get confirmationStatusPages(): number[] {
//     if (this.confirmationStatusData.length === 0) {
//       return [];
//     }
//     const pageCount = Math.ceil(
//       this.confirmationStatusData.length / this.confirmationStatusItemsPerPage
//     );
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   private saveEnrollmentStatusToLocalStorage(): void {
//     localStorage.setItem(
//       'enrollmentStatusData',
//       JSON.stringify(this.enrollmentStatusData)
//     );
//   }

//   private loadEnrollmentStatusFromLocalStorage(): void {
//     const storedData = localStorage.getItem('enrollmentStatusData');

//     if (storedData) {
//       const storedEnrollmentStatus: TableRow[] = JSON.parse(storedData);

//        // Filter out entries not related to the logged-in user
//     this.enrollmentStatusData = storedEnrollmentStatus.filter(entry => entry.emp_id === this.loginService.getEmpId());

//       this.tableData1.dataRows.forEach((row) => {
//         const matchingStoredEntry = this.enrollmentStatusData.find(
//           (storedEntry) =>
//             storedEntry.training_id === row.training_id &&
//             storedEntry.schedule_id === row.schedule_id
//         );

//         if (matchingStoredEntry) {
//           row.isEnrolled = matchingStoredEntry.isEnrolled;
//         }
//       });

//       this.enrollmentStatusData = storedEnrollmentStatus;
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../employee-services/employee.service';
// import { UserService } from 'app/pages/login/login.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// interface TableData {
//   headerRow: string[];
//   dataRows: TableRow[];
// }

// interface TableRow {
//   t_id: string;
//   c_name: string;
//   t_name: string;
//   s_date: string;
//   e_date: string;
//   status: string;
//   enroll: string;
//   isEnrolled?: boolean;
//   training_id?: string;
//   schedule_id?: string;
//   emp_id?: string;
// }

// @Component({
//   selector: 'user-dashboard',
//   moduleId: module.id,
//   templateUrl: './user-dashboard.component.html',
// })
// export class UserDashboardComponent implements OnInit {
//   public tableData1: TableData;
//   public filteredData: TableRow[];
//   public searchValue: string = '';
//   enrollmentStatusData: TableRow[] = [];

//   currentPage = 1;
//   itemsPerPage = 5;

//   enrollmentStatusPage = 1;
//   enrollmentStatusItemsPerPage = 3;

//   confirmationStatusPage = 1;
//   confirmationStatusItemsPerPage = 3;

//   empId: string;

//   confirmationStatusData: TableRow[] = [];

//   constructor(
//     private employeeService: EmployeeService,
//     private loginService: UserService,
//     private route: ActivatedRoute,
//     private httpClient: HttpClient,
//     private router: Router 
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       this.empId = params['empId'];
//       console.log('EmpId:', this.empId);
//       this.fetchDataForUser(this.empId);
//     });

//     this.tableData1 = {
//       headerRow: [
//         'Sr No.',
//         'Course Name',
//         'Trainer Name',
//         'Start Date',
//         'End Date',
//         'Status',
//         'Enroll',
//       ],
//       dataRows: [
//         {
//           t_id: '1',
//           c_name: 'Angular',
//           t_name: 'Amisha Jangipuria',
//           s_date: '29-11-2023',
//           e_date: '04-12-2023',
//           status: 'Upcoming',
//           enroll: 'Enroll',
//         },
//         {
//           t_id: '2',
//           c_name: 'Introduction to Web Development',
//           t_name: 'John Doe',
//           s_date: '30-11-2023',
//           e_date: '07-12-2023',
//           status: 'Upcoming',
//           enroll: 'Enroll',
//         },
//         {
//           t_id: '3',
//           c_name: 'Advanced JavaScript',
//           t_name: 'Jane Smith',
//           s_date: '01-12-2023',
//           e_date: '12-12-2023',
//           status: 'Upcoming',
//           enroll: 'Enroll',
//         },
//       ],
//     };

//     this.filteredData = [...this.tableData1.dataRows];
//     this.fetchTrainingSchedule();
//     this.loadEnrollmentStatusFromLocalStorage();
//     this.fetchConfirmationStatusData();
//   }

//   fetchConfirmationStatusData(): void {
//     const empId = this.loginService.getEmpId();
  
//     if (!empId) {
//       console.error('EmpId not available.');
//       return;
//     }
  
//     this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/details-with-additional/${empId}`).subscribe(
//       (data: any[]) => {
//         // Filter data based on "trainingStatus" being "Upcoming" or "On-Going"
//         const filteredStatusData = data.filter(entry => entry.trainingStatus !== 'Completed');
  
//         // Process the filtered data and extract the courseName
//         const confirmationStatusData = filteredStatusData.map((entry, index) => ({
//           t_id: String(index + 1),
//           c_name: entry.courseName,
//           t_name: entry.trainerName,
//           s_date: entry.startDate,
//           e_date: entry.endDate,
//           status: entry.status,
//           enroll: 'Enroll',
//         }));
  
//         this.confirmationStatusData = confirmationStatusData;
//       },
//       (error) => {
//         console.error('Error fetching confirmation status data:', error);
//       }
//     );
//   }

//   enrollButtonClicked(training: TableRow): void {
//     const loggedInUserData = this.loginService.getLoggedInUserData();

//     if (!loggedInUserData) {
//       // Handle the case where user data is not available
//       return;
//     }

//     const empId = loggedInUserData.empId;

//     const alreadyEnrolled = this.enrollmentStatusData.some(
//       (enrollment) =>
//         enrollment.training_id === training.training_id &&
//         enrollment.schedule_id === training.schedule_id &&
//         enrollment.emp_id === empId
//     );

//     if (alreadyEnrolled) {
//       alert(`You have already enrolled for ${training.c_name} course.`);
//       return;
//     }

//     const registrationData = {
//       schedule_id: training.schedule_id,
//       training_id: training.training_id,
//       emp_id: empId,
//       registration_date: new Date(),
//       registration_comments: '',
//       registration_status: 'Registered',
//       registration_response: '',
//     };

//     // Call the API to enroll and get the updated enrollment details
//     this.employeeService.enrollTraining(registrationData).subscribe(
//       (registrationId: number) => {
//         console.log(`Enrollment successful. Registration ID: ${registrationId}`);
//         alert(`Your Enrollment Request has been successfully sent to Reporting Manager for ${training.c_name} course`);

//         // Fetch enrollment details from the specified API
//         this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/registered-details/${empId}`).subscribe(
//           (data: any[]) => {
//             const enrollmentDetails = data[0];

//             const uniqueEnrollmentData = this.enrollmentStatusData.filter(
//               (existingEnrollment) =>
//                 existingEnrollment.training_id !== training.training_id ||
//                 existingEnrollment.schedule_id !== training.schedule_id
//             );

//             uniqueEnrollmentData.push({
//               t_id: String(uniqueEnrollmentData.length + 1),
//               c_name: training.c_name,
//               t_name: training.t_name,
//               s_date: training.s_date,
//               e_date: training.e_date,
//               status: enrollmentDetails.status, // Update this based on the API response
//               enroll: 'Enroll',
//               isEnrolled: true,
//               training_id: training.training_id,
//               schedule_id: training.schedule_id,
//               emp_id: empId,
//             });

//             this.enrollmentStatusData = uniqueEnrollmentData;
//             this.saveEnrollmentStatusToLocalStorage();

//             // Optional: You may update the isEnrolled property in tableData1.dataRows based on the updated enrollmentStatusData
//             this.tableData1.dataRows.forEach((row) => {
//               const matchingEnrollment = this.enrollmentStatusData.find(
//                 (enrollment) =>
//                   enrollment.training_id === row.training_id &&
//                   enrollment.schedule_id === row.schedule_id
//               );

//               if (matchingEnrollment) {
//                 row.isEnrolled = matchingEnrollment.isEnrolled;
//               }
//             });

//             // Optional: You may also trigger any other necessary actions based on the updated data
//           },
//           (error) => {
//             console.error('Error fetching enrollment details:', error);
//           }
//         );
//       },
//       (error) => {
//         console.error('Error enrolling in training:', error);
//       }
//     );
//   }

//   fetchDataForUser(empId: string): void {
//     console.log(`Fetching data for user with empId: ${empId}`);
//     // Implement logic to fetch data for the user based on empId
//   }

//   fetchTrainingSchedule(): void {
//     this.employeeService.getTrainingPreDefinedSchedule().subscribe(
//       (scheduleData: any[]) => {
//         scheduleData.forEach((entry) => {
//           console.log(
//             `Training ID: ${entry.trainingId}, Schedule ID: ${entry.scheduleId}`
//           );
//         });

//         this.tableData1.dataRows = scheduleData.map(
//           (schedule, index): TableRow => ({
//             t_id: String(index + 1),
//             c_name: schedule.course,
//             t_name: schedule.trainerName.split('(')[0].trim(),
//             s_date: schedule.plannedStartDate
//               ? schedule.plannedStartDate.split('T')[0]
//               : '',
//             e_date: schedule.plannedEndDate
//               ? schedule.plannedEndDate.split('T')[0]
//               : '',
//             status: schedule.trainingStatus,
//             enroll: 'Enroll',
//             isEnrolled: false,
//             training_id: String(schedule.trainingId),
//             schedule_id: String(schedule.scheduleId),
//             emp_id: String(schedule.empId),
//           })
//         );

//         this.filteredData = [...this.tableData1.dataRows];
//       },
//       (error) => {
//         console.error('Error fetching training schedule data:', error);
//       }
//     );
//   }

//   applyFilter(): void {
//     this.filteredData = this.tableData1.dataRows.filter((row) =>
//       Object.values(row).some((value) =>
//         value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
//       )
//     );
//   }

//   changeItemsPerPage(event: any, tableType: string): void {
//     if (tableType === 'upcomingCourse') {
//       this.itemsPerPage = +event.target.value;
//       this.currentPage = 1;
//     } else if (tableType === 'enrollmentStatus') {
//       this.enrollmentStatusItemsPerPage = +event.target.value;
//       this.enrollmentStatusPage = 1;
//     } else if (tableType === 'confirmationStatus') {
//       this.confirmationStatusItemsPerPage = +event.target.value;
//       this.confirmationStatusPage = 1;
//     }
//   }

//   get pages(): number[] {
//     if (this.tableData1.dataRows.length === 0) {
//       return [];
//     }

//     const pageCount = Math.ceil(
//       this.tableData1.dataRows.length / this.itemsPerPage
//     );
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   get enrollmentStatusPages(): number[] {
//     if (this.enrollmentStatusData.length === 0) {
//       return [];
//     }
//     const pageCount = Math.ceil(
//       this.enrollmentStatusData.length / this.enrollmentStatusItemsPerPage
//     );
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   get confirmationStatusPages(): number[] {
//     if (this.confirmationStatusData.length === 0) {
//       return [];
//     }
//     const pageCount = Math.ceil(
//       this.confirmationStatusData.length / this.confirmationStatusItemsPerPage
//     );
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   private saveEnrollmentStatusToLocalStorage(): void {
//     const filteredEnrollmentData = this.enrollmentStatusData.filter(entry => entry.emp_id  === this.loginService.getEmpId());
//     localStorage.setItem(
//       'enrollmentStatusData',
//       JSON.stringify(this.enrollmentStatusData)
//     );
//   }

//   private loadEnrollmentStatusFromLocalStorage(): void {
//     const storedData = localStorage.getItem('enrollmentStatusData');

//     if (storedData) {
//       const storedEnrollmentStatus: TableRow[] = JSON.parse(storedData);

//       // this.enrollmentStatusData = [];

//       // Filter out entries not related to the logged-in user
//       this.enrollmentStatusData = storedEnrollmentStatus.filter(entry => entry.emp_id === this.loginService.getEmpId());

//       this.enrollmentStatusData = [...this.enrollmentStatusData, ...this.enrollmentStatusData];

//       this.tableData1.dataRows.forEach((row) => {
//         const matchingStoredEntry = this.enrollmentStatusData.find(
//           (storedEntry) =>
//             storedEntry.training_id === row.training_id &&
//             storedEntry.schedule_id === row.schedule_id
//         );

//         if (matchingStoredEntry) {
//           row.isEnrolled = matchingStoredEntry.isEnrolled;
//         }
//       });

//       this.enrollmentStatusData = storedEnrollmentStatus;
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-services/employee.service';
import { UserService } from 'app/pages/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  t_id: string;
  c_name: string;
  t_name: string;
  s_date: string;
  e_date: string;
  status: string;
  enroll: string;
  registration_status: string;
  reason: string;
  isEnrolled?: boolean;
  training_id?: string;
  schedule_id?: string;
  emp_id?: string;
}

@Component({
  selector: 'user-dashboard',
  moduleId: module.id,
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  enrollmentStatusData: TableRow[] = [];

  currentPage = 1;
  itemsPerPage = 5;

  enrollmentStatusPage = 1;
  enrollmentStatusItemsPerPage = 3;

  confirmationStatusPage = 1;
  confirmationStatusItemsPerPage = 3;

  empId: string;

  confirmationStatusData: TableRow[] = [];

  constructor(
    private employeeService: EmployeeService,
    private loginService: UserService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.empId = params['empId'];
      console.log('EmpId:', this.empId);
      this.fetchDataForUser(this.empId);
    });

    this.tableData1 = {
      headerRow: [
        'Sr No.',
        'Course Name',
        'Trainer Name',
        'Start Date',
        'End Date',
        'Status',
        'Enroll',
        'Registration Status',
        'Reason',
      ],
      dataRows: [
        {
          t_id: '1',
          c_name: 'Angular',
          t_name: 'Amisha Jangipuria',
          s_date: '29-11-2023',
          e_date: '04-12-2023',
          status: 'Upcoming',
          enroll: 'Enroll',
          registration_status:'Registered',
          reason: '',
        },
        {
          t_id: '2',
          c_name: 'Introduction to Web Development',
          t_name: 'John Doe',
          s_date: '30-11-2023',
          e_date: '07-12-2023',
          status: 'Upcoming',
          enroll: 'Enroll',
          registration_status:'Registered',
          reason: '',
        },
        {
          t_id: '3',
          c_name: 'Advanced JavaScript',
          t_name: 'Jane Smith',
          s_date: '01-12-2023',
          e_date: '12-12-2023',
          status: 'Upcoming',
          enroll: 'Enroll',
          registration_status:'Registered',
          reason: '',
        },
      ],
    };

    this.filteredData = [...this.tableData1.dataRows];
    this.fetchTrainingSchedule();
    this.loadEnrollmentStatusFromBackend(); // Load enrollment status from the backend
    this.fetchConfirmationStatusData();
  }

  fetchConfirmationStatusData(): void {
    const empId = this.loginService.getEmpId();
  
    if (!empId) {
      console.error('EmpId not available.');
      return;
    }
  
    this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/details-with-additional/${empId}`).subscribe(
      (data: any[]) => {
        // Filter data based on "trainingStatus" being "Upcoming" or "On-Going"
        const filteredStatusData = data.filter(entry => entry.trainingStatus !== 'Completed');
  
        // Process the filtered data and extract the courseName
        const confirmationStatusData = filteredStatusData.map((entry, index) => ({
          t_id: String(index + 1),
          c_name: entry.courseName,
          t_name: entry.trainerName,
          s_date: entry.startDate,
          e_date: entry.endDate,
          status: entry.status,
          registration_status: entry.registration_status,
          reason: '',
          enroll: 'Enroll',
        }));
  
        this.confirmationStatusData = confirmationStatusData;
      },
      (error) => {
        console.error('Error fetching confirmation status data:', error);
      }
    );
  }

  enrollButtonClicked(training: TableRow): void {
    const loggedInUserData = this.loginService.getLoggedInUserData();

    if (!loggedInUserData) {
      // Handle the case where user data is not available
      return;
    }

    const empId = loggedInUserData.empId;

    const alreadyEnrolled = this.enrollmentStatusData.some(
      (enrollment) =>
        enrollment.training_id === training.training_id &&
        enrollment.schedule_id === training.schedule_id &&
        enrollment.emp_id === empId
    );

    if (alreadyEnrolled) {
      alert(`You have already enrolled for ${training.c_name} course.`);
      return;
    }

    const registrationData = {
      schedule_id: training.schedule_id,
      training_id: training.training_id,
      emp_id: empId,
      registration_date: new Date(),
      registration_comments: '',
      registration_status: 'Registered',
      registration_response: '',
    };

    // Call the API to enroll and get the updated enrollment details
    this.employeeService.enrollTraining(registrationData).subscribe(
      (registrationId: number) => {
        console.log(`Enrollment successful. Registration ID: ${registrationId}`);
        alert(`Your Enrollment Request has been successfully sent to Reporting Manager for ${training.c_name} course`);

        // Fetch enrollment details from the specified API
        this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/registered-details/${empId}`).subscribe(
          (data: any[]) => {
            const enrollmentDetails = data[0];

            const uniqueEnrollmentData = this.enrollmentStatusData.filter(
              (existingEnrollment) =>
                existingEnrollment.training_id !== training.training_id ||
                existingEnrollment.schedule_id !== training.schedule_id
            );

            uniqueEnrollmentData.push({
              t_id: String(uniqueEnrollmentData.length + 1),
              c_name: training.c_name,
              t_name: training.t_name,
              s_date: training.s_date,
              e_date: training.e_date,
              status: enrollmentDetails.status, // Update this based on the API response
              enroll: 'Enroll',
              registration_status: training.registration_status,
              reason: training.reason,
              isEnrolled: true,
              training_id: training.training_id,
              schedule_id: training.schedule_id,
              emp_id: empId,
            });

            this.enrollmentStatusData = uniqueEnrollmentData;

            // Optional: You may update the isEnrolled property in tableData1.dataRows based on the updated enrollmentStatusData
            this.tableData1.dataRows.forEach((row) => {
              const matchingEnrollment = this.enrollmentStatusData.find(
                (enrollment) =>
                  enrollment.training_id === row.training_id &&
                  enrollment.schedule_id === row.schedule_id
              );

              if (matchingEnrollment) {
                row.isEnrolled = matchingEnrollment.isEnrolled;
              }
            });

            // Optional: You may also trigger any other necessary actions based on the updated data
          },
          (error) => {
            console.error('Error fetching enrollment details:', error);
          }
        );
      },
      (error) => {
        console.error('Error enrolling in training:', error);
      }
    );
  }

  fetchDataForUser(empId: string): void {
    console.log(`Fetching data for user with empId: ${empId}`);
    // Implement logic to fetch data for the user based on empId
  }

  fetchTrainingSchedule(): void {
    this.employeeService.getTrainingPreDefinedSchedule().subscribe(
      (scheduleData: any[]) => {
        scheduleData.forEach((entry) => {
          console.log(
            `Training ID: ${entry.trainingId}, Schedule ID: ${entry.scheduleId}`
          );
        });

        this.tableData1.dataRows = scheduleData.map(
          (schedule, index): TableRow => ({
            t_id: String(index + 1),
            c_name: schedule.course,
            t_name: schedule.trainerName.split('(')[0].trim(),
            s_date: schedule.plannedStartDate
              ? schedule.plannedStartDate.split('T')[0]
              : '',
            e_date: schedule.plannedEndDate
              ? schedule.plannedEndDate.split('T')[0]
              : '',
            status: schedule.trainingStatus,
            enroll: 'Enroll',
            registration_status: schedule.registrationStatus,
            reason: schedule.registrationResponse,
            isEnrolled: false,
            training_id: String(schedule.trainingId),
            schedule_id: String(schedule.scheduleId),
            emp_id: String(schedule.empId),
          })
        );

        this.filteredData = [...this.tableData1.dataRows];
      },
      (error) => {
        console.error('Error fetching training schedule data:', error);
      }
    );
  }

  applyFilter(): void {
    this.filteredData = this.tableData1.dataRows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  changeItemsPerPage(event: any, tableType: string): void {
    if (tableType === 'upcomingCourse') {
      this.itemsPerPage = +event.target.value;
      this.currentPage = 1;
    } else if (tableType === 'enrollmentStatus') {
      this.enrollmentStatusItemsPerPage = +event.target.value;
      this.enrollmentStatusPage = 1;
    } else if (tableType === 'confirmationStatus') {
      this.confirmationStatusItemsPerPage = +event.target.value;
      this.confirmationStatusPage = 1;
    }
  }

  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(
      this.tableData1.dataRows.length / this.itemsPerPage
    );
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  get enrollmentStatusPages(): number[] {
    if (this.enrollmentStatusData.length === 0) {
      return [];
    }
    const pageCount = Math.ceil(
      this.enrollmentStatusData.length / this.enrollmentStatusItemsPerPage
    );
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  get confirmationStatusPages(): number[] {
    if (this.confirmationStatusData.length === 0) {
      return [];
    }
    const pageCount = Math.ceil(
      this.confirmationStatusData.length / this.confirmationStatusItemsPerPage
    );
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  private loadEnrollmentStatusFromBackend(): void {
    const empId = this.loginService.getEmpId();
  
    if (!empId) {
      console.error('EmpId not available.');
      return;
    }

    this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/registered-details/${empId}`).subscribe(
      (data: any[]) => {
        // Process the fetched data and extract the enrollment status
        const enrollmentStatusData = data.map((entry, index) => ({
          t_id: String(index + 1),
          c_name: entry.courseName,
          t_name: entry.trainerName,
          s_date: entry.startDate,
          e_date: entry.endDate,
          status: entry.status,
          enroll: 'Enroll',
          registration_status: entry.status,
          reason: '',
          isEnrolled: true, // Assuming that the backend provides the enrollment status
          training_id: entry.trainingId,
          schedule_id: entry.scheduleId,
          emp_id: empId,
        }));

        this.enrollmentStatusData = enrollmentStatusData;

        this.tableData1.dataRows.forEach((row) => {
          const matchingEnrollment = this.enrollmentStatusData.find(
            (enrollment) =>
              enrollment.training_id === row.training_id &&
              enrollment.schedule_id === row.schedule_id
          );

          if (matchingEnrollment) {
            row.isEnrolled = matchingEnrollment.isEnrolled;
          }
        });
      },
      (error) => {
        console.error('Error fetching enrollment status data:', error);
      }
    );
  }

  viewConfirmationDetails(courseName: string): void {
    // Navigate to confirmationstatus-details component with the selected courseName
    this.router.navigate(['/confirmationstatus-details', courseName]);
  }
}

