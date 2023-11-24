/* admin-attendance.component.ts */
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { TableFilterService } from '../../filtersearch/filterpipe.component';

declare interface TableRow {
serial_no:number;
courses: string;
trainer_names:string;
attendance: string;
start_date:string;
end_date:string;
}

declare interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

  
@Component({
    selector: 'admin-training-cmp',
    moduleId: module.id,
    templateUrl: 'admin-attendance.component.html'
})



export class AdminAttendanceComponent implements OnInit {
  public tableData2: any ={
    headerRow: ['No.', 'Course Name', 'Trainer Names','Start Date','End Date', 'Attendance'],
    dataRows: [
      { serial_no: 1, courses: 'Angular', trainer_names: 'Bhavana Desai',start_date:'12-11-2023',end_date:'20-11-2023', attendance: 'View' },
      { serial_no: 2, courses: 'Spring Boot', trainer_names: 'Tushar Kale',start_date:'11-11-2023',end_date:'19-11-2023', attendance: 'View' },
      { serial_no: 3, courses: 'Core Java', trainer_names: 'Tushar Kale',start_date:'10-11-2023',end_date:'18-11-2023', attendance: 'View' },
      { serial_no: 4, courses: 'PLSQL', trainer_names: 'Girish Mehta',start_date:'9-11-2023',end_date:'17-11-2023', attendance: 'View' },
    ]};

    originalTableData: any[] = [];
  searchText: string='';

  constructor( private router:Router,
    private tableFilterService:TableFilterService){}

  ngOnInit(){
    this.fetchTableData();
  }

  fetchTableData() {
    // Simulating data retrieval or initialization
    this.originalTableData = [
      { serial_no: 1, courses: 'Angular', trainer_names: 'Bhavana Desai', start_date: '12-11-2023', end_date: '20-11-2023', attendance: 'View' },
      { serial_no: 2, courses: 'Spring Boot', trainer_names: 'Tushar Kale', start_date: '11-11-2023', end_date: '19-11-2023', attendance: 'View' },
      { serial_no: 3, courses: 'Core Java', trainer_names: 'Tushar Kale', start_date: '10-11-2023', end_date: '18-11-2023', attendance: 'View' },
      { serial_no: 4, courses: 'PLSQL', trainer_names: 'Girish Mehta', start_date: '9-11-2023', end_date: '17-11-2023', attendance: 'View' },
    ];
  
    // Assign originalTableData to tableData2.dataRows
    this.tableData2.dataRows = [...this.originalTableData];
  }


  showAttendance(courses: string, event: Event) {
    event.preventDefault();

}

applyFilter() {
  if (this.searchText.trim() !== '') {
    const filteredData = this.originalTableData.filter(row => {
      return (
        row.courses.toLowerCase().includes(this.searchText.toLowerCase()) ||
        row.trainer_names.toLowerCase().includes(this.searchText.toLowerCase()) ||
        row.start_date.includes(this.searchText) ||
        row.end_date.includes(this.searchText) ||
        row.attendance.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
    this.tableData2.dataRows = filteredData;
  } else {
    this.resetTable();
  }
}

  onSearchInputChange() {
    if (this.searchText.trim() !== '') {
      const filteredData = this.originalTableData.filter(row => {
        return (
          row.courses.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.trainer_names.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.start_date.includes(this.searchText) ||
          row.end_date.includes(this.searchText) ||
          row.attendance.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
      this.tableData2.dataRows = filteredData;
    } else {
      this.resetTable();
    }

  }

  onSubmit(){}

  
  resetTable() {
    this.searchText = '';
    // Reset table to its original state
    this.tableData2 = {
      headerRow: ['No.', 'Course Name', 'Trainer Names', 'Start Date', 'End Date', 'Attendance'],
      dataRows: [
        { serial_no: 1, courses: 'Angular', trainer_names: 'Bhavana Desai', start_date: '12-11-2023', end_date: '20-11-2023', attendance: 'View' },
        { serial_no: 2, courses: 'Spring Boot', trainer_names: 'Tushar Kale', start_date: '11-11-2023', end_date: '19-11-2023', attendance: 'View' },
        { serial_no: 3, courses: 'Core Java', trainer_names: 'Tushar Kale', start_date: '10-11-2023', end_date: '18-11-2023', attendance: 'View' },
        { serial_no: 4, courses: 'PLSQL', trainer_names: 'Girish Mehta', start_date: '9-11-2023', end_date: '17-11-2023', attendance: 'View' },
      ]
    };
  }
}
