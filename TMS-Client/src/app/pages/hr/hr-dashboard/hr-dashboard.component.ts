import { Component, OnInit } from '@angular/core';


declare interface TableData
{
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'hr-dashboard',
  moduleId: module.id,
  templateUrl: './hr-dashboard.component.html',
})
export class HrDashboardComponent implements OnInit {




  public tableData1: TableData;
  public currentPage = 1;
  public itemsPerPage = 5;

  public searchTerm = '';
  

 

  


  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }



  ngOnInit(){

    


    this.tableData1={
      headerRow: ['Sr. no', 'Training Id', 'Course Code', 'Course', 'Employee Code', 'Employee Name', 'Start Date', 'End Date', 'Attended Y/N', 'Technical Skills', 'Grasping Power', 'Responsive/Proactive', 'Smartness', 'Interest Level', 'Leadership Quality', 'Ability to Explain Problems', 'Spoken English', 'Total Rate', 'Assignment Status', 'It Security Quiz Score'],
      dataRows: [
        ['1', 'TID001', 'CSE101', 'Introduction to Programming', 'EMP001',
         'John Doe', '2023-01-01', '2023-01-10', 'Yes', '4.5', '4.2', '4.8',
         '4.5', '4.6', '4.3', '4.7', '4.2', '4.4', 'Completed', '90'],
        ['2', 'TID002', 'ENG202', 'Advanced English', 'EMP002',
         'Jane Doe', '2023-02-01', '2023-02-15', 'No', '3.5', '3.8', '4.0',
         '3.7', '3.9', '3.5', '3.8', '3.6', '3.7', 'In Progress', '60'],
        ['3', 'TID003', 'CSE103', 'Database Management', 'EMP003',
         'Michael Johnson', '2023-03-10', '2023-03-20', 'Yes', '4.4', '4.1', '4.7',
         '4.5', '4.3', '4.6', '4.2', '4.4', '4.6', 'In Progress', '92'],
         ['4', 'TID004', 'MAT301', 'Advanced Mathematics', 'EMP004',
         'David Smith', '2023-04-05', '2023-04-20', 'Yes', '4.8', '4.6', '4.9',
         '4.7', '4.5', '4.8', '4.6', '4.9', '4.7', 'Completed', '95'],
        ['5', 'TID005', 'PHY201', 'Physics Principles', 'EMP005',
         'Emily Brown', '2023-05-15', '2023-05-30', 'No', '3.9', '3.7', '4.0',
         '3.8', '3.5', '3.9', '3.7', '3.8', '3.6', 'In Progress', '75'],
        ['6', 'TID006', 'CSE105', 'Software Engineering', 'EMP006',
         'Christopher Lee', '2023-06-10', '2023-06-25', 'Yes', '4.6', '4.3', '4.8',
         '4.5', '4.4', '4.7', '4.3', '4.6', '4.5', 'Completed', '88'],
        ['7', 'TID007', 'BIO202', 'Genetics and Evolution', 'EMP007',
         'Olivia Wilson', '2023-07-01', '2023-07-15', 'Yes', '4.3', '4.0', '4.5',
         '4.2', '4.1', '4.4', '4.0', '4.3', '4.1', 'In Progress', '82'],
        ['8', 'TID008', 'CHEM203', 'Organic Chemistry', 'EMP008',
         'William Taylor', '2023-08-10', '2023-08-25', 'No', '3.8', '3.5', '3.9',
         '3.7', '3.6', '3.8', '3.5', '3.8', '3.6', 'Not Started', '68'],
        ['9', 'TID009', 'PHY204', 'Astrophysics', 'EMP009',
         'Sophia Miller', '2023-09-05', '2023-09-20', 'Yes', '4.7', '4.4', '4.9',
         '4.6', '4.5', '4.8', '4.4', '4.7', '4.5', 'In Progress', '91'],
        ['10', 'TID010', 'CSE107', 'Artificial Intelligence', 'EMP010',
         'Daniel Brown', '2023-10-01', '2023-10-15', 'No', '3.6', '3.3', '3.8',
         '3.5', '3.4', '3.7', '3.3', '3.6', '3.4', 'Not Started', '72']
    ]
    };

    
   
      
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value,
    this.currentPage = 1; // Reset to the first page when changing items per page
  }


  performSearch(): void {
    if (this.searchTerm.trim() === '') {
      // If the search term is empty, revert back to the original data
      this.reloadTable();
    } else {
      // Filter the data based on the search term
      this.tableData1.dataRows = this.tableData1.dataRows.filter(row =>
        row.some(cell => cell.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );

    }
  }

  reloadTable(): void {
    this.tableData1.dataRows =[
      ['1', 'TID001', 'CSE101', 'Introduction to Programming', 'EMP001',
       'John Doe', '2023-01-01', '2023-01-10', 'Yes', '4.5', '4.2', '4.8',
       '4.5', '4.6', '4.3', '4.7', '4.2', '4.4', 'Completed', '90'],
      ['2', 'TID002', 'ENG202', 'Advanced English', 'EMP002',
       'Jane Doe', '2023-02-01', '2023-02-15', 'No', '3.5', '3.8', '4.0',
       '3.7', '3.9', '3.5', '3.8', '3.6', '3.7', 'In Progress', '60'],
      ['3', 'TID003', 'CSE103', 'Database Management', 'EMP003',
       'Michael Johnson', '2023-03-10', '2023-03-20', 'Yes', '4.4', '4.1', '4.7',
       '4.5', '4.3', '4.6', '4.2', '4.4', '4.6', 'In Progress', '92'],
       ['4', 'TID004', 'MAT301', 'Advanced Mathematics', 'EMP004',
       'David Smith', '2023-04-05', '2023-04-20', 'Yes', '4.8', '4.6', '4.9',
       '4.7', '4.5', '4.8', '4.6', '4.9', '4.7', 'Completed', '95'],
      ['5', 'TID005', 'PHY201', 'Physics Principles', 'EMP005',
       'Emily Brown', '2023-05-15', '2023-05-30', 'No', '3.9', '3.7', '4.0',
       '3.8', '3.5', '3.9', '3.7', '3.8', '3.6', 'In Progress', '75'],
      ['6', 'TID006', 'CSE105', 'Software Engineering', 'EMP006',
       'Christopher Lee', '2023-06-10', '2023-06-25', 'Yes', '4.6', '4.3', '4.8',
       '4.5', '4.4', '4.7', '4.3', '4.6', '4.5', 'Completed', '88'],
      ['7', 'TID007', 'BIO202', 'Genetics and Evolution', 'EMP007',
       'Olivia Wilson', '2023-07-01', '2023-07-15', 'Yes', '4.3', '4.0', '4.5',
       '4.2', '4.1', '4.4', '4.0', '4.3', '4.1', 'In Progress', '82'],
      ['8', 'TID008', 'CHEM203', 'Organic Chemistry', 'EMP008',
       'William Taylor', '2023-08-10', '2023-08-25', 'No', '3.8', '3.5', '3.9',
       '3.7', '3.6', '3.8', '3.5', '3.8', '3.6', 'Not Started', '68'],
      ['9', 'TID009', 'PHY204', 'Astrophysics', 'EMP009',
       'Sophia Miller', '2023-09-05', '2023-09-20', 'Yes', '4.7', '4.4', '4.9',
       '4.6', '4.5', '4.8', '4.4', '4.7', '4.5', 'In Progress', '91'],
      ['10', 'TID010', 'CSE107', 'Artificial Intelligence', 'EMP010',
       'Daniel Brown', '2023-10-01', '2023-10-15', 'No', '3.6', '3.3', '3.8',
       '3.5', '3.4', '3.7', '3.3', '3.6', '3.4', 'Not Started', '72']
  ];
  }


  



}