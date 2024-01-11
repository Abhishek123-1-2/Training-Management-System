  /* on-request.component.ts */

import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee-services/employee.service';
import { UserService } from 'app/pages/login/login.service';


declare interface TableData {
    headerRow: string[];
    dataRows: TableRow[];
}

interface TableRow {
t_id: string;
c_name: string;
trainer_name: string;
status: string;
action: string;
view: string;
isEnrolled?: boolean;
training_id?: string;
schedule_id?: string;
emp_id?: string;

}

@Component({
    selector: 'on-request-cmp',
    moduleId:module.id,
  templateUrl: 'on-request.component.html',
})

export class OnRequestComponent implements OnInit {

  constructor(private router: Router,private toastr: ToastrService, private employeeService: EmployeeService, private loginService: UserService) {}
  
    public tableData1: TableData;
    public filteredData: TableRow[];
    public searchValue: string = '';
    isEditMode: boolean = false;
    rowIndexBeingEdited: number | null = null;
    isAddParticipantsFormVisible = false;
    newParticipantName = '';
    display = 'none';
    enrollmentStatusData: TableRow[] = [];
    empId: string;
    currentPage=1;
    itemsPerPage=5;


    ngOnInit()  {
        this.tableData1 = {
            headerRow: ['No.','Course','Trainer Name', 'Action','Status', 'View' ],
            dataRows: [
              {t_id: '1',c_name: 'Java',trainer_name: 'Kishor', status: '', action: '', view: '' },
              {t_id: '2',c_name: 'Spring Boot',trainer_name: 'Kishor', status: '',action: '', view: '' } ,
              {t_id: '3',c_name: 'PLSQL',trainer_name: 'Girish', status: '',action: '', view: '' },
              {t_id: '4',c_name: 'Angular',trainer_name: 'Bhavana', status: '',action: '', view: '' },
              {t_id: '5',c_name: 'Javascript',trainer_name: 'Bhavana', status: '',action: '', view: '' },
              {t_id: '6',c_name: 'Spring Boot',trainer_name: 'Kishor', status: '',action: '' , view: ''},
              {t_id: '7',c_name: 'Spring Boot',trainer_name: 'Kishor', status: '',action: '', view: '' },
            ]
        };
        this.filteredData = [...this.tableData1.dataRows];
        this.employeeService.getTrainingSchedule().subscribe(
          (scheduleData: any[]) => {
            scheduleData.forEach(entry => {
              console.log(`Training ID: ${entry.trainingId}, Schedule ID: ${entry.scheduleId}`);
            })
            const onRequestSchedules = scheduleData.filter(schedule => schedule.trainingSchedule === 'ON-REQUEST');
            this.tableData1.dataRows = onRequestSchedules.map((schedule, index): TableRow => ({
              t_id: String(index + 1),
              c_name: schedule.course,
              trainer_name: schedule.trainerName.split('(')[0].trim(),
              status:'Registered',
              action:'',
              view: '',
              isEnrolled: false,
              training_id: String(schedule.trainingId),
              schedule_id: String(schedule.scheduleId),
              emp_id: String(schedule.empId)
            }));

            this.filteredData = [...this.tableData1.dataRows];
            this.loadEnrollmentStatusFromLocalStorage();
          },
          (error) => {
            console.error('Error fetching training schedule data:', error);
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
     
    
      startEdit(index: number) {
        this.rowIndexBeingEdited = index;
        this.isEditMode = true;
      }
    
      saveChanges(rowIndex: number): void {
        console.log('Saving changes for row:', rowIndex);
        this.isEditMode = false;
        this.rowIndexBeingEdited = null;
      }
    
      cancelEdit() {
        this.isEditMode = false;
      }

      sendRequest(row: TableRow): void {
        const loggedInUserData = this.loginService.getLoggedInUserData();
        if (!loggedInUserData) {
          // Handle the case where user data is not available
          return;
        }
        const empId = loggedInUserData.empId;
        const alreadyEnrolled = this.enrollmentStatusData.some(
          (enrollment) => 
          enrollment.t_id === row.t_id &&
          enrollment.c_name === row.c_name &&
          enrollment.trainer_name === row.trainer_name
        );

        if(alreadyEnrolled) {
          alert(`You have already enrolled for ${row.c_name} course.`);
          return;
        }
          const registrationData = {
            schedule_id: row.schedule_id,
            training_id: row.training_id,
            emp_id: empId,
            registration_date: new Date(),
            registration_comments: '',
            registration_status: 'Registered',
            registration_response: '', 
          };

          this.employeeService.enrollTraining(registrationData).subscribe(
            (registrationId: number) => {
              console.log(`Enrollment successful. Registration ID: ${registrationId}`);
              alert(`Your Enrollment Request has been successfully sent to Reporting Manager for ${row.c_name} course`);

              // row.status = 'Registered'
              row.view = '',
              row.isEnrolled = true;

              this.employeeService.getRegistrationStatus(row.training_id, row.schedule_id, empId).subscribe(
                (status: string) => {
                  row.status = status || 'Registered'; // Use the fetched status, fallback to 'Registered' if not available
                },
                (error) => {
                  console.error('Error fetching registration status:', error);
                }
              );

              this.enrollmentStatusData.push({
                t_id: row.t_id,
                c_name: row.c_name,
                trainer_name: row.trainer_name,
                status: row.status,
                view: '',
                training_id: row.training_id,
                schedule_id: row.schedule_id,
                emp_id: empId,
                isEnrolled: true,
                action: ''
              });

              this.saveEnrollmentStatusToLocalStorage();
            },
            (error) => {
              console.error('Error enrolling in training:', error)
            }
          );
        }

      private saveEnrollmentStatusToLocalStorage(): void {
        localStorage.setItem(
          'enrollmentStatusData',
          JSON.stringify(this.enrollmentStatusData)
        );
      }

      private loadEnrollmentStatusFromLocalStorage(): void {
        const storedData = localStorage.getItem('enrollmentStatusData');
        if (storedData) {
          const storedEnrollmentStatus: TableRow[] = JSON.parse(storedData);
          this.tableData1.dataRows.forEach((row) => {
            const matchingStoredEntry = storedEnrollmentStatus.find(
              (storedEntry) =>
                storedEntry.training_id === row.training_id &&
                storedEntry.schedule_id === row.schedule_id
            );
            if (matchingStoredEntry) {
              row.isEnrolled = matchingStoredEntry.isEnrolled;
            }
          });
          this.enrollmentStatusData = storedEnrollmentStatus;
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
        this.currentPage = 1; // Reset to the first page when changing items per page
      }

     

}








