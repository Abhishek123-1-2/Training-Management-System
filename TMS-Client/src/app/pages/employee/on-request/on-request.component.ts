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
number: string;
course: string;
trainer_name: string;
action: string;
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
    enrollmentStatusData = [];
    empId: string;
    currentPage=1;
    itemsPerPage=5;


    ngOnInit()  {
        this.tableData1 = {
            headerRow: ['No.','Course','Trainer Name','Action'],
            dataRows: [
              {number: '1',course: 'Java',trainer_name: 'Kishor',action: '' },
              {number: '2',course: 'Spring Boot',trainer_name: 'Kishor',action: '' } ,
              {number: '3',course: 'PLSQL',trainer_name: 'Girish',action: '' },
              {number: '4',course: 'Angular',trainer_name: 'Bhavana',action: '' },
              {number: '5',course: 'Javascript',trainer_name: 'Bhavana',action: '' },
              {number: '6',course: 'Spring Boot',trainer_name: 'Kishor',action: '' },
              {number: '7',course: 'Spring Boot',trainer_name: 'Kishor',action: '' },
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
              number: String(index + 1),
              course: schedule.course,
              trainer_name: schedule.trainerName.split('(')[0].trim(),
              action:'',
              isEnrolled: false,
              training_id: String(schedule.trainingId),
              schedule_id: String(schedule.scheduleId),
              emp_id: String(schedule.empId)
            }));

            this.filteredData = [...this.tableData1.dataRows];
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
        const empId = this.loginService.getEmpId()
        // const empId = loggedInUserData ? loggedInUserData.empId : null;
        if(loggedInUserData) {
          const empId = loggedInUserData.empId;
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
              alert(`Your Enrollment Request has been successfully sent to Reporting Manager for ${row.course} course`);
            },
            (error) => {
              console.error('Error enrolling in training:', error)
            }
          );
        }
      }

      showNotification() {
        alert("Request has been successfully sent to Reporting Manager")
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








