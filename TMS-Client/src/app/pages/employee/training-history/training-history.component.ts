/* training-history.component.ts */
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

declare interface TableData {
    headerRow: string[];
    dataRows: {

number: string;
course: string;
trainer_name: string;
status: string; 
start_date:string;
end_date:string; 
       
    }[];
}
interface TableRow {
number: string;
course: string;
trainer_name: string;
status: string; 
start_date:string;
end_date:string;

}

@Component({
    selector: 'training-history-cmp',
    moduleId:module.id,
  templateUrl: 'training-history.component.html',
})

export class TrainingHistoryComponent implements OnInit {

  constructor(private router: Router) {}
  
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
        this.tableData1 = {
            headerRow: ['No.','Course','Trainer Name','Start Date','End Date','Status'],
            dataRows: [{
number: '1',
course: 'Java',
trainer_name: 'Kishor',
start_date:'1-12-2023',
end_date:'5-12-2023',
status: 'Completed'  }
,
{
  number: '2',
  course: 'Spring Boot',
  trainer_name: 'Kishor',
  start_date:'6-12-2023',
  end_date:'9-12-2023',
  status: 'Completed' 
} ,
{
  number: '3',
course: 'PLSQL',
trainer_name: 'Girish',
start_date:'10-12-2023',
end_date:'15-12-2023',
status: 'Completed' 
}     ,
{
  number: '4',
  course: 'Angular',
  trainer_name: 'Bhavana',
  start_date:'1-12-2023',
  end_date:'5-12-2023',
  status: 'Completed' 
},

]
        };
        this.filteredData = [...this.tableData1.dataRows]

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








