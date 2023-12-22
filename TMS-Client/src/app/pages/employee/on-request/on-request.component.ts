/* on-request.component.ts */

import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee-services/employee.service';


declare interface TableData {
    headerRow: string[];
    dataRows: {
number: string;
course: string;
trainer_name: string;
action: string; 
    }[];
}
interface TableRow {
number: string;
course: string;
trainer_name: string;
action: string;
isEnrolled?: boolean; 

}

@Component({
    selector: 'on-request-cmp',
    moduleId:module.id,
  templateUrl: 'on-request.component.html',
})

export class OnRequestComponent implements OnInit {

  constructor(private router: Router,private toastr: ToastrService, private employeeService: EmployeeService) {}
  
    public tableData1: TableData;
    public filteredData: TableRow[];
    public searchValue: string = '';
    isEditMode: boolean = false;
    rowIndexBeingEdited: number | null = null;
    isAddParticipantsFormVisible = false;
    newParticipantName = '';
    display = 'none';
    enrollmentStatusData = [];

    currentPage=1;
    itemsPerPage=5;


    ngOnInit()  {
        this.tableData1 = {
            headerRow: ['No.','Course','Trainer Name','Action'],
            dataRows: [{
number: '1',
course: 'Java',
trainer_name: 'Kishor',
action: ''  }
,
{
  number: '2',
  course: 'Spring Boot',
  trainer_name: 'Kishor',
  action: '' 
} ,
{
  number: '3',
course: 'PLSQL',
trainer_name: 'Girish',
action: '' 
}     ,
{
  number: '4',
  course: 'Angular',
  trainer_name: 'Bhavana',
  action: '' 
},
{
  number: '5',
  course: 'Javascript',
  trainer_name: 'Bhavana',
  action: '' 
},
{
    number: '6',
    course: 'Spring Boot',
    trainer_name: 'Kishor',
    action: '' 
  } ,
  {
    number: '7',
    course: 'Spring Boot',
    trainer_name: 'Kishor',
    action: '' 
  } ,
]
        };
        this.filteredData = [...this.tableData1.dataRows];

        this.employeeService.getTrainingSchedule().subscribe(
          (scheduleData: any[]) => {
            const onRequestSchedules = scheduleData.filter(schedule => schedule.trainingSchedule === 'ON-REQUEST');
            this.tableData1.dataRows = onRequestSchedules.map((schedule, index): TableRow => ({
              number: String(index + 1),
              course: schedule.course,
              trainer_name: schedule.trainerName,
              action:'',
              isEnrolled: false,
            }));

            this.filteredData = [...this.tableData1.dataRows];
          },
          (error) => {
            console.error('Error fetching training schedule data:', error);
          }

        )

        this.currentPage = Math.min(this.currentPage, this.pages.length);


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

      sendRequest(row: any){
        const{ number, course, trainer_name, action } = row;
        this.enrollmentStatusData = [{sr_no: number, courseName: course, trainer_name: trainer_name}]
        alert('Your Request has been sent to Reporting Manager Successfully');
        row.isEnrolled = true;
      }

      // showNotification(from, align) {
      //   const color = Math.floor(Math.random() * 5 + 1);
    
      //   switch (color) {
      //     case 1:
      //       this.toastr.info(
      //       '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>TMS</b> - Your Request has been sent to <b>Reporting Manager</b> Successfully.</span>',
      //         "",
      //         {
                
      //           timeOut: 4000,
      //           closeButton: true,
      //           enableHtml: true,
      //           toastClass: "alert alert-info alert-with-icon",
      //           positionClass: "toast-" + from + "-" + align
      //         }
      //       );
      //       break;

      //     default:
      //       break;
      //   }
      // }

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








