/* on-request.component.ts */

import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


declare interface TableData {
    headerRow: string[];
    dataRows: {
number: string;
course: string;
trainer_name: string;
action: string; 
start_date:string;
end_date:string; 
    }[];
}
interface TableRow {
number: string;
course: string;
trainer_name: string;
action: string; 
start_date:string;
end_date:string;

}

@Component({
    selector: 'on-request-cmp',
    moduleId:module.id,
  templateUrl: 'on-request.component.html',
})

export class OnRequestComponent implements OnInit {

  constructor(private router: Router,
    private toastr: ToastrService) {}
  
    public tableData1: TableData;
    public filteredData: TableRow[];
    public searchValue: string = '';
    isEditMode: boolean = false;
    rowIndexBeingEdited: number | null = null;
    isAddParticipantsFormVisible = false;
    newParticipantName = '';
    display = 'none';

    currentPage=1;
    itemsPerPage=2;


    ngOnInit()  {
        this.tableData1 = {
            headerRow: ['No.','Course','Trainer Name','Start Date','End Date','Action'],
            dataRows: [{
number: '1',
course: 'Java',
trainer_name: 'Kishor',
start_date:'1-12-2023',
end_date:'5-12-2023',
action: ''  }
,
{
  number: '2',
  course: 'Spring Boot',
  trainer_name: 'Kishor',
  start_date:'6-12-2023',
end_date:'9-12-2023',
  action: '' 
} ,
{
  number: '3',
course: 'PLSQL',
trainer_name: 'Girish',
start_date:'10-12-2023',
end_date:'15-12-2023',
action: '' 
}     ,
{
  number: '4',
  course: 'Angular',
  trainer_name: 'Bhavana',
  start_date:'1-12-2023',
end_date:'5-12-2023',
  action: '' 
},
{
  number: '5',
  course: 'Javascript',
  trainer_name: 'Bhavana',
  start_date:'1-12-2023',
end_date:'15-12-2023',
  action: '' 
},
{
    number: '6',
    course: 'Spring Boot',
    trainer_name: 'Kishor',
    start_date:'6-12-2023',
  end_date:'9-12-2023',
    action: '' 
  } ,
  {
    number: '7',
    course: 'Spring Boot',
    trainer_name: 'Kishor',
    start_date:'6-12-2023',
  end_date:'9-12-2023',
    action: '' 
  } ,
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

      showNotification(from, align) {
        const color = Math.floor(Math.random() * 5 + 1);
    
        switch (color) {
          case 1:
            this.toastr.info(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>TMS</b> - Your Request has been sent to <b>Reporting Manager</b> Successfully.</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-info alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          /* case 2:
            this.toastr.success(
              '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          case 3:
            this.toastr.warning(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          case 4:
            this.toastr.error(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
              "",
              {
                timeOut: 4000,
                enableHtml: true,/
                closeButton: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          case 5:
            this.toastr.show(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Welcome to <b>Paper Dashboard Angular</b> - a beautiful bootstrap dashboard for every web developer.</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-primary alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break; */
          default:
            break;
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








