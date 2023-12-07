import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    attendance: string;
    attendanceStatus: { [day: string]: string };
  }[];
}

interface TableRow {
    sr_no: string;
    emp_code: string;
    emp_name: string;
    attendance: string;
    attendanceStatus: { [day: string]: string };
}

@Component({
  selector: 'student-list2',
  moduleId: module.id,
  templateUrl: './student-list2.component.html',
})
export class StudentList2Component implements OnInit {

  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  start_date: string;
  end_date: string;
  trainingDays: string[] = [];
  

  constructor( private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
    });

    this.tableData1 = {
      headerRow: ['Sr No', 'Employee Code', 'Employee Name','Start Date', 'End Date', 'Attendance', ...this.trainingDays],
      dataRows: [
        {sr_no:'1', emp_code:'3647', emp_name:'Yash Gavanang', attendance:'Add', attendanceStatus: {}},
        {sr_no:'2', emp_code:'3646', emp_name:'Abhishek Pillai', attendance:'Add', attendanceStatus: {}},
        {sr_no:'3', emp_code:'3639', emp_name:'Mukul Gupta', attendance:'Add', attendanceStatus: {}},
        {sr_no:'4', emp_code:'3364', emp_name:'Yash Gole', attendance:'Add', attendanceStatus: {}},
      ]
    };

    this.filteredData = [...this.tableData1.dataRows];
  }


  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  addTrainingDay(): void {
    const dayNumber = this.trainingDays.length + 1;
    const dayHeader = `Day${dayNumber}`;
    this.trainingDays.push(dayHeader);
  }

  toggleAttendanceStatus(row: TableRow, day: string): void {
    if (row.attendanceStatus[day] === 'Present') {
      row.attendanceStatus[day] = 'Absent';
    } else if (row.attendanceStatus[day] === 'Absent') {
      row.attendanceStatus[day] = 'Present';
    } else {
      row.attendanceStatus[day] = 'Present'; // Default to 'Present' if not marked
    }
  }


}

