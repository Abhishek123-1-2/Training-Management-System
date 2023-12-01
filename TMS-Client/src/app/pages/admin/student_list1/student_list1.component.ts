// student-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare interface TableData {
    headerRow: string[];
    dataRows: {
        emp_code: string;
        emp_name: string;
        c_name: string;
        t_name: string;
        status: string;
        view: string;
    }[];
}

interface TableRow {
    emp_code: string;
    emp_name: string;
    c_name: string;
    t_name: string;
    status: string;
    view: string;
}

@Component({
  selector: 'student-list1-cmp',
  moduleId: module.id,
  templateUrl: './student_list1.component.html',
})
export class StudentList1Component implements OnInit {
  t_id: string;
  start_date: string;
  end_date: string;
  public studentList: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.t_id = params['t_id'];
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      // Now, fetch the list of students based on the trainingId and update the component.
      // You might want to create a service to handle data retrieval.
      this.fetchStudentList(this.t_id);
    });
  }
  fetchStudentList(t_id: string): void {
    this.studentList = {
        headerRow: ['Employee Code','Employee Name', 'Course Name', 'Trainer Name', 'Status', 'Start Date', 'End Date', 'View Attendance'],
        dataRows: [
            {emp_code:'3647', emp_name:'Yash Gavanang',   c_name:'Angular', t_name:'Amisha Jangipuria', status:'On-Going', view:'View'},
            {emp_code:'3646', emp_name:'Abhishek Pillai', c_name:'Angular', t_name:'Amisha Jangipuria', status:'On-Going', view:'View'},
            {emp_code:'3639', emp_name:'Mukul Gupta',     c_name:'Angular', t_name:'Amisha Jangipuria', status:'On-Going', view:'View'},
            {emp_code:'3364', emp_name:'Yash Gole',       c_name:'Angular', t_name:'Amisha Jangipuria', status:'On-Going', view:'View'},
        ]
    };
    this.filteredData = [...this.studentList.dataRows];
}
applyFilter() {
    this.filteredData = this.studentList.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

}
