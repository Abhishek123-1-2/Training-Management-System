import { Component, OnInit } from '@angular/core'
import { AddParticipantsComponent } from '../add_participants/add_participants.component';
import { Router } from '@angular/router';

declare interface TableData {
    headerRow: string[];
    dataRows: {
        reg_id: string;
        emp_code: string;
        emp_name: string;
        reg_date: string;
        c_name: string
        comments: string;
        status: string;
        response: string;
        actions: string;  
    }[];
}
interface TableRow {
    reg_id: string;
    emp_code: string;
    emp_name: string;
    reg_date: string;
    c_name: string;
    comments: string;
    status: string;
    response: string;
    actions: string;
}

@Component({
    selector: 'registration-cmp',
    moduleId: module.id,
    templateUrl: 'admin_registration.component.html'
})

export class AdminRegistrationComponent implements OnInit {

  constructor(private router: Router) {}
  
    public tableData1: TableData;
    public filteredData: TableRow[];
    public searchValue: string = '';
    isEditMode: boolean = false;
    rowIndexBeingEdited: number | null = null;
    isAddParticipantsFormVisible = false;
    newParticipantName = '';
    display = 'none';
    public currentPage = 1;
    public itemsPerPage = 5;

    ngOnInit()  {
        this.tableData1 = {
            headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Registration Date', 'Course Name', 'Comments', 'Status', 'Reason', 'Actions'],
            dataRows: [
                {reg_id:'1', emp_code:'3647', emp_name: 'Yash Gavanang',   reg_date:'20-11-2023', c_name:'Angular', comments:'Have a basic knowledge about this course but want to learn in deep', status:'Confirmed', response:'', actions:'Edit'},
                {reg_id:'2', emp_code:'3646', emp_name: 'Abhishek Pillai', reg_date:'21-11-2023', c_name:'Python', comments:'On bench so want to learn new skills', status:'Registered', response:'', actions:'Edit'},
                {reg_id:'3', emp_code:'3639', emp_name: 'Mukul Gupta',     reg_date:'22-11-2023', c_name:'Java', comments:'Interested in this course', status:'Joined', response:'', actions:'Edit'},
                {reg_id:'4', emp_code:'3364', emp_name: 'Yash Gole',       reg_date:'23-11-2023', c_name:'Node JS', comments:'Eager to learn the latest design principles and tools in this course', status:'Absent', response:'', actions:'Edit'},
                {reg_id:'5', emp_code:'3642', emp_name: 'Joel Dsouza',     reg_date:'24-11-2023', c_name:'Full Stack Web Development', comments:'Interested in gaining practical knowledge in data science', status:'Rejected', response:'Already attended the training', actions:'Edit'},
                {reg_id:'6', emp_code:'3649', emp_name: 'Kshitij Rai',     reg_date:'25-11-2023', c_name:'PLSQL', comments:'To explore the fundamentals of web development and enhance my coding skills', status:'Confirmed', response:'', actions:'Edit'},
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
      }
    
      cancelEdit() {
        this.isEditMode = false;
        // If you want to revert changes, you may need to reload the original data
      }
      toggleModal() {
        console.log('Opening Modal form')
        this.isAddParticipantsFormVisible = !this.isAddParticipantsFormVisible;
        this.display = 'block';
    }
    navigateToAddParticipants() {
      this.router.navigate(['/add-participants']);
    }

    get pages(): number[] {
      if (this.tableData1.dataRows.length === 0) {
        return [];
      }

      const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    changeItemsPerPage(event: any): void {
      this.itemsPerPage = +event.target.value,
      this.currentPage = 1; 
    }
}