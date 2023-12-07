/* schedule-list.component.ts */
import { Component, OnInit } from '@angular/core'
import { AddParticipantsComponent } from '../add_participants/add_participants.component';
import { Router } from '@angular/router';

declare interface TableData {
    headerRow: string[];
    dataRows: {

number: string;
course: string;
trainer_name: string;
planned_start_date: string;
planned_end_date:string;
from_time: string;
to_time:string;
status:string;
action: string;  
       
    }[];
}
interface TableRow {
number: string;
course: string;
trainer_name: string;
planned_start_date: string;
planned_end_date:string;
from_time: string;
to_time:string;
status:string;
action: string; 

}

@Component({
    selector: 'schedule-list-cmp',
    moduleId: module.id,
    templateUrl: 'schedule-list.component.html'
})

export class ScheduleListComponent implements OnInit {

  constructor(private router: Router) {}
  
    public tableData1: TableData;
    public filteredData: TableRow[];
    public searchValue: string = '';
    public isEditMode: boolean = false;
    public rowIndexBeingEdited: number | null = null;
    isAddParticipantsFormVisible = false;
    newParticipantName = '';
    display = 'none';

    
 currentPage = 1;
 itemsPerPage = 5;


 get pages(): number[] {
   if (this.tableData1.dataRows.length === 0) {
     return [];
   }

   const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
   return Array.from({ length: pageCount }, (_, index) => index + 1);
 }

    ngOnInit()  {
        this.tableData1 = {
            headerRow: ['No.','Course','Trainer Name','Start Date','End Date','From Time','To Time','Status','Action'],
            dataRows: [{
number: '1',
course: 'Java',
trainer_name: 'Kishor',
planned_start_date: '20-11-2023',
planned_end_date:'22-11-2023',
from_time: '6:00',
to_time:'7:00',
status:'Ongoing',
action: ''  }
,
{
  number: '2',
  course: 'Spring Boot',
  trainer_name: 'Kishor',
  planned_start_date: '24-10-2023',
  planned_end_date:'26-10-2023',
  from_time: '8:00',
  to_time:'9:00',
  status:'On-going',
  action: '' 
} ,
{
  number: '3',
course: 'PLSQL',
trainer_name: 'Girish',
planned_start_date: '-',
planned_end_date:'-',
from_time: '-',
to_time:'-',
status:'Ongoing',
action: '' 
}     ,
{
  number: '4',
  course: 'Angular',
  trainer_name: 'Bhavana',
  planned_start_date: '1-9-2023',
  planned_end_date:'19-9-2023',
  from_time: '5:00',
  to_time:'6:00',
  status:'Ongoing',
  action: '' 
},
/* 
{
  number: '5',
  course: 'Javascript',
  trainer_name: 'Bhavana',
  planned_start_date: 'www.mdnwebdocs.com',
  planned_end_date:'string',
  from_time: 'mukul',
  to_time:'012',
  status:'',
  action: '' 
} */
]
        };
        this.filteredData = [...this.tableData1.dataRows]
    }
    applyFilter() {
        this.filteredData = this.tableData1.dataRows.filter(row =>
          Object.values(row).some(value =>
            value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
          )
        );
      }
      toggleEditMode(rowIndex: number): void {
        this.isEditMode = !this.isEditMode;
        this.rowIndexBeingEdited = this.isEditMode ? rowIndex : null;
      }
    
      startEdit(index: number) {
        this.rowIndexBeingEdited = index;
        this.isEditMode = true;
      }
    
      saveChanges(rowIndex: number): void {
        // Implement logic to save changes (update your data array, send to server, etc.)
        console.log('Saving changes for row:', rowIndex);
        this.isEditMode = false;
        this.rowIndexBeingEdited = null;

        console.log(this.filteredData[rowIndex]);
      }
    
      cancelEdit() {
        this.isEditMode = false;
        this.rowIndexBeingEdited=null;
        // If you want to revert changes, you may need to reload the original data
      }
      toggleModal() {
        console.log('Opening Modal form')
        this.isAddParticipantsFormVisible = !this.isAddParticipantsFormVisible;
        this.display = 'block';
    }

    changeItemsPerPage(event: any): void {
      this.itemsPerPage = +event.target.value;
      this.currentPage = 1; // Reset to the first page when changing items per page
    }

}
