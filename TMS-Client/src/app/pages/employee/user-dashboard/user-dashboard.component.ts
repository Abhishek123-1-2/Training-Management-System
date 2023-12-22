// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../employee-services/employee.service';
// import { response } from 'express';
// declare interface TableData {
//   headerRow: string[];
//   dataRows: {
//     t_id: string;
//     c_name: string;
//     t_name: string;
//     s_date: string;
//     e_date: string;
//     status: string;
//     enroll: string;
//   }[],
// }

// interface TableRow {
//     t_id: string;
//     c_name: string;
//     t_name: string;
//     s_date: string;
//     e_date: string;
//     status: string;
//     enroll: string;
//     isEnrolled?: boolean;
//     // training_id: string;
//     // schedule_id: string;
//     training_id?: string;
//     schedule_id?: string;
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

//   enrollmentStatusData = [];


//   currentPage = 1;
//   itemsPerPage = 5;


//   get pages(): number[] {
//     if (this.tableData1.dataRows.length === 0) {
//       return [];
//     }

//     const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }





//   constructor(private employeeService: EmployeeService) { }

//   ngOnInit(): void {
//     this.tableData1 = {
//       headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status', 'Enroll'],
//       dataRows: [
//         { t_id: '1', c_name: 'Angular', t_name: 'Amisha Jangipuria', s_date: '29-11-2023', e_date: '04-12-2023', status: 'Upcoming', enroll: 'Enroll'},
//         { t_id: '2', c_name: 'Introduction to Web Development', t_name: 'John Doe', s_date: '30-11-2023', e_date: '07-12-2023', status: 'Upcoming', enroll: 'Enroll'},
//         { t_id: '3', c_name: 'Advanced JavaScript', t_name: 'Jane Smith', s_date: '01-12-2023', e_date: '12-12-2023', status: 'Upcoming', enroll: 'Enroll'},
//       ]
//     };
//     this.filteredData = [...this.tableData1.dataRows]
//     // Fetch training schedule data from the new service
//     enrollTraining(row: any) {
//       const enrollmentRequest = {
//         schedule_id: row.schedule_id,
//         training_id: row.training_id,
//         // Other required fields...
//       };
//     this.employeeService.getTrainingSchedule().subscribe(
//       (scheduleData: any[]) => {
//         scheduleData.forEach(entry => {
//           console.log(`Training ID: ${entry.trainingId}, Schedule ID: ${entry.scheduleId}`)
//         })
//         const preDefinedSchedules = scheduleData.filter(schedule => schedule.trainingSchedule === 'PRE-DEFINED');
//         // Update your dataRows with the fetched scheduleData
//         this.tableData1.dataRows = preDefinedSchedules.map((schedule, index): TableRow => ({
//           t_id: String(index + 1),
//           c_name: schedule.course,
//           t_name: schedule.trainerName,
//           s_date: schedule.plannedStartDate ? schedule.plannedStartDate.split('T')[0] : '',
//           e_date: schedule.plannedEndDate ? schedule.plannedEndDate.split('T')[0] : '',
//           status: schedule.trainingStatus,
//           enroll: 'Enroll',  // Modify this based on your logic
//           isEnrolled: false,
//         }));

//         // Update the filteredData as well
//         this.filteredData = [...this.tableData1.dataRows];
//       },
//       (error) => {
//         console.error('Error fetching training schedule data:', error);
//       }
//     );
//   }

  
//   applyFilter() {
//     this.filteredData = this.tableData1.dataRows.filter(row =>
//       Object.values(row).some(value =>
//         value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
//       )
//     );
//   }

//   enrollButtonClicked(row: any) {
//     // console.log('Row object:', row);
//     // const { t_id, c_name, status, training_id, schedule_id } = row;
//     // console.log(`Training ID: ${training_id}, Schedule ID: ${schedule_id}`);
//     // this.enrollmentStatusData = [{ trainingId: training_id, courseName: c_name, status: 'Pending'}];
//     // // alert(`Successfully enrolled in Training ID: ${this.enrollmentStatusData[0].trainingId}`);
//     // // row.isEnrolled = true;
//     // this.employeeService.enrollTraining(row).subscribe(
//     //   (response: any) => {
//     //     alert(`Successfully enrolled in Training ID: ${this.enrollmentStatusData[0].trainingId}`);
//     //     row.isEnrolled = true;
//     //   },
//     //   (error) => {
//     //     console.error('Error enrolling in training:', error);
//     //   }
//     // );
//     const { training_id, schedule_id, c_name } = row;
//     this.employeeService.enrollTraining(training_id, schedule_id).subscribe(
//       (response: any) => {
//         alert(`Successfully enrolled in Training ID: ${training_id}`);
//         row.isEnrolled = true;
//       },
//       (error) => {
//         console.error('Error enrolling in training:', error);
//       }
//     );

//   }


//   changeItemsPerPage(event: any): void {
//     this.itemsPerPage = +event.target.value;
//     this.currentPage = 1; // Reset to the first page when changing items per page
//   }


// }

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-services/employee.service';

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
  enrollmentStatusData = [];

  currentPage = 1;
  itemsPerPage = 5;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status', 'Enroll'],
      dataRows: [
        { t_id: '1', c_name: 'Angular', t_name: 'Amisha Jangipuria', s_date: '29-11-2023', e_date: '04-12-2023', status: 'Upcoming', enroll: 'Enroll'},
        { t_id: '2', c_name: 'Introduction to Web Development', t_name: 'John Doe', s_date: '30-11-2023', e_date: '07-12-2023', status: 'Upcoming', enroll: 'Enroll'},
        { t_id: '3', c_name: 'Advanced JavaScript', t_name: 'Jane Smith', s_date: '01-12-2023', e_date: '12-12-2023', status: 'Upcoming', enroll: 'Enroll'},
      ]
    };
    this.filteredData = [...this.tableData1.dataRows];
    this.fetchTrainingSchedule();
  }

  fetchTrainingSchedule(): void {
    this.employeeService.getTrainingSchedule().subscribe(
      (scheduleData: any[]) => {
        scheduleData.forEach(entry => {
          console.log(`Training ID: ${entry.trainingId}, Schedule ID: ${entry.scheduleId}`);
        });

        const preDefinedSchedules = scheduleData.filter(schedule => schedule.trainingSchedule === 'PRE-DEFINED');

        // Update your dataRows with the fetched scheduleData
        this.tableData1.dataRows = preDefinedSchedules.map((schedule, index): TableRow => ({
          t_id: String(index + 1),
          c_name: schedule.course,
          t_name: schedule.trainerName,
          s_date: schedule.plannedStartDate ? schedule.plannedStartDate.split('T')[0] : '',
          e_date: schedule.plannedEndDate ? schedule.plannedEndDate.split('T')[0] : '',
          status: schedule.trainingStatus,
          enroll: 'Enroll',  // Modify this based on your logic
          isEnrolled: false,
          training_id: String(schedule.trainingId),  // Add the correct property name
          schedule_id: String(schedule.scheduleId),  // Add the correct property name
          emp_id: String(schedule.empId)
        }));

        // Update the filteredData as well
        this.filteredData = [...this.tableData1.dataRows];
      },
      (error) => {
        console.error('Error fetching training schedule data:', error);
      }
    );
  }

  applyFilter(): void {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  enrollButtonClicked(row: TableRow): void {
    const { training_id, schedule_id, emp_id, c_name } = row;
    this.employeeService.enrollTraining(training_id, schedule_id, emp_id).subscribe(
      (response: any) => {
        alert(`Successfully enrolled in Training ID: ${training_id}`);
        row.isEnrolled = true;
      },
      (error) => {
        console.error('Error enrolling in training:', error);
      }
    );
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
  }

  get pages(): number[] {
        if (this.tableData1.dataRows.length === 0) {
          return [];
        }
    
        const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
        return Array.from({ length: pageCount }, (_, index) => index + 1);
      }
}

