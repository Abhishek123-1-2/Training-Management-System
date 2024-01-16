/* training-history.component.ts */
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee-services/employee.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'app/pages/login/login.service';

declare interface TableData {
    headerRow: string[];
    dataRows: {

number: string;
course: string;
trainerName: string;
trainingStatus: string; 
plannedStartDate:string;
plannedEndDate:string; 
       
    }[];
}
interface TableRow {
  number: string;
  course: string;
  trainerName: string;
  trainingStatus: string; 
  plannedStartDate:string;
  plannedEndDate:string; 

}

interface TrainingHistory {
  empId: string;
  number: string;
  course: string;
  trainerName: string;
  trainingStatus: string;
  plannedStartDate: string;
  plannedEndDate: string;
}

@Component({
    selector: 'training-history-cmp',
    moduleId:module.id,
  templateUrl: 'training-history.component.html',
})

export class TrainingHistoryComponent implements OnInit {

  constructor(private router: Router, private employeeService: EmployeeService, private http: HttpClient, private userService: UserService, private route: ActivatedRoute) {}
  
    public tableData1: TableData;
    public filteredData: TableRow[];
    public searchValue: string = '';
    isEditMode: boolean = false;
    rowIndexBeingEdited: number | null = null;
    isAddParticipantsFormVisible = false;
    newParticipantName = '';
    display = 'none';

    currentPage=1;
    itemsPerPage=5;


    ngOnInit()  {
      this.route.params.subscribe(params => {
        const empId = params['empId'];
        if(empId) {
          this.fetchTrainingHistory(empId);
        }
      });
        this.tableData1 = {
            headerRow: ['No.','Course','Trainer Name','Start Date','End Date','Status'],
            dataRows: [{
number: '1',
course: 'Java',
trainerName: 'Kishor',
plannedStartDate:'1-12-2023',
plannedEndDate:'5-12-2023',
trainingStatus: 'Completed'  }
,
{
  number: '2',
  course: 'Spring Boot',
  trainerName: 'Kishor',
  plannedStartDate:'6-12-2023',
  plannedEndDate:'9-12-2023',
  trainingStatus: 'Completed' 
} ,
{
  number: '3',
course: 'PLSQL',
trainerName: 'Girish',
plannedStartDate:'10-12-2023',
plannedEndDate:'15-12-2023',
trainingStatus: 'Completed' 
} 

]
        };
        this.filteredData = [...this.tableData1.dataRows]

//         this.currentPage = Math.min(this.currentPage, this.pages.length);



const empId = this.userService.getEmpId();

if(empId) {
  this.fetchTrainingHistory(empId);
}


}

fetchTrainingHistory(empId: string) {
  const url = `http://localhost:8083/api/training-history/employee/${empId}`;

  this.http.get<TrainingHistory[]>(url).subscribe(
    (response) => {
      console.log('Training History Data:', response);
      this.tableData1.dataRows = response.map((item, index) => ({
        number: (index + 1).toString(),
        course: item.course,
        trainerName: item.trainerName.split('(')[0].trim(),
        plannedStartDate: this.formatDate(item.plannedStartDate),
        plannedEndDate: this.formatDate(item.plannedEndDate),
        trainingStatus: item.trainingStatus,
        empId: item.empId,
      }));

      this.filteredData = [...this.tableData1.dataRows];
      this.currentPage = Math.min(this.currentPage, this.pages.length)
    },
    (error) => {
      console.error('Error fetching training history:', error);
    }
  );
}

formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
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

      sendRequest(){
        window.alert('Your Request has been sent to Reporting Manager Successfully');
        console.log('Success');
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








