/* view-training.component.ts */
import { Component, OnInit } from '@angular/core'
import { AddParticipantsComponent } from '../add_participants/add_participants.component';
import { Router } from '@angular/router';

declare interface TableData {
    headerRow: string[];
    dataRows: {

number: string;
course: string;
trainer_name: string;
meeting_link: string;
username: string;
password:string;
action: string;  
       
    }[];
}
interface TableRow {
number: string;
course: string;
trainer_name: string;
meeting_link: string;
username: string;
password:string;
action: string; 

}

@Component({
    selector: 'view-training-cmp',
    moduleId: module.id,
    templateUrl: 'view-training.component.html'
})

export class ViewTrainingComponent implements OnInit {

  constructor(private router: Router) {}
  
    public tableData1: TableData;
    public filteredData: TableRow[];
    public searchValue: string = '';
    isEditMode: boolean = false;
    rowIndexBeingEdited: number | null = null;
    isAddParticipantsFormVisible = false;
    newParticipantName = '';
    display = 'none';

    ngOnInit()  {
        this.tableData1 = {
            headerRow: ['No.','Course','Trainer Name','Meeting Link','Username','Password','Action'],
            dataRows: [{
number: '1',
course: 'Java',
trainer_name: 'Kishor',
meeting_link: 'www.meet.gooogle.com',
username: 'mukul',
password:'123',
action: ''  }
,
{
  number: '2',
  course: 'Spring Boot',
  trainer_name: 'Kishor',
  meeting_link: 'www.meet.ms.com',
  username: 'abhi',
  password:'456',
  action: '' 
} ,
{
  number: '3',
course: 'PLSQL',
trainer_name: 'Girish',
meeting_link: 'www.meet.gooogle.com',
username: 'yash',
password:'789',
action: '' 
}     ,
{
  number: '4',
  course: 'Angular',
  trainer_name: 'Bhavana',
  meeting_link: 'www.angular.com',
  username: 'mukul',
  password:'012',
  action: '' 
},
{
  number: '5',
  course: 'Javascript',
  trainer_name: 'Bhavana',
  meeting_link: 'www.mdnwebdocs.com',
  username: 'mukul',
  password:'012',
  action: '' 
}
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

}





















  /*  navigateToAddParticipants() {
      this.router.navigate(['/tid']);
    } */

    /* number: string;
    category: string;
    schedule: string;
    course: string;
    trainer_name: string;
    start_date: string;
    end_date: string;
    status:string;
    action: string; */


/* // viewtraining.component.ts

import { Component, OnInit } from '@angular/core';
import { TableFilterService } from '../filtersearch/filterpipe.component';
import { TrainingService } from '../admin-services/training.service';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    training_id: number;
    training_category: string;
    training_type: string;
    training_schedule: string;
    course: string;
    trainer_names: string;
    prerequisites: string;
    course_description: string;
    daily_hrs: string;
    total_days: string;
    url: string;
    username: string;
    password: string;
  }[];
}

@Component({
  selector: 'view-training-cmp',
  moduleId: module.id,
  templateUrl: 'view-training.component.html'
})
export class ViewTrainingComponent implements OnInit {

  tableData1: TableData = {
    headerRow: ['Training Id', 'Category', 'Type', 'Schedule', 'Course', 'Trainer Names', 'Prerequisites', 'Description', 'Daily Hrs', 'Total Days', 'URL', 'Username', 'Password'],
    dataRows: []
  };

  originalTableData: any[] = [];
  searchText: string = '';

  constructor(
    private tableFilterService: TableFilterService,
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.fetchTableData();
  }

  fetchTableData() {
    this.trainingService.getTrainingData().subscribe(
      (data: any[]) => {
        this.originalTableData = data;
        this.applyFilter();  // Apply filter after data is fetched
      },
      error => {
        console.error('Error fetching training data:', error);
      }
    );
  }

  onSearchInputChange() {
    this.applyFilter();  // Apply filter when the user types in the search box
  }

  applyFilter() {
    if (this.searchText.trim() !== '') {
      this.tableData1.dataRows = this.originalTableData.filter(row =>
        Object.values(row).some(val =>
          val.toString().toLowerCase().includes(this.searchText.toLowerCase())
        )
      );
    } else {
      this.resetTable();
    }
  }

  resetTable() {
    this.searchText = '';
    this.tableData1.dataRows = [...this.originalTableData];
  }
}
 */