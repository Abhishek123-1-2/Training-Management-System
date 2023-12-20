import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

interface TableData {
  headerRow: string[];
  dataRows: {
    emp_code: string;
    emp_name: string;
    status: string;
    attendance: { [date: string]: string };
  }[];
}

@Component({
  selector: 'attendance2',
  templateUrl: './attendance2.component.html',
  styleUrls: ['./attendance2.component.scss'],
})
export class Attendance2Component implements OnInit {
  public tableData1: TableData;
  start_date: any;
  end_date: any;
  course_name: any;
  trainer_name: any;
  showExpandedDates: boolean = false;
  editAttendanceStatus: string;
  isEdit: boolean = false;

 
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      this.course_name = params['course_name'];
      this.trainer_name = params['trainer_name'];

      this.fetchList(this.start_date);
    });
  }

  fetchList(start_date: string): void {
    const allDays = this.getAllDatesInRange(start_date, this.end_date);

    this.tableData1 = {
      headerRow: ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
      dataRows: [
        {
          emp_code: '3647',
          emp_name: 'Yash Gavanang',
          attendance: {},
          status: 'Ongoing',
          
        },
      ],
    };

    this.tableData1.dataRows.forEach((row) => {
      allDays.forEach((day) => {
        row.attendance[day] = '';
      });
    });
  }

  getAllDatesInRange(startDate, endDate): string[] {
    const dates = [];
    const startDateObj = moment(startDate, 'DD-MM-YYYY');
    const endDateObj = moment(endDate, 'DD-MM-YYYY');
    while (startDateObj.isSameOrBefore(endDateObj)) {
      dates.push(startDateObj.format('DD-MM-YYYY'));
      startDateObj.add(1, 'days');
    }
    return dates;
  }

  toggleExpandedDates(): void {
    if (!this.showExpandedDates) {
      const allDates = this.getAllDatesInRange(this.start_date, this.end_date);
      this.tableData1.headerRow.push(...allDates);
    }
    this.showExpandedDates = true;
  }

  markAttendance(row: any, date: string, status: string): void {
    row.attendance[date] = status;
    row.showButtons = false;
  }

  reloadTable(): void 
  {
    this.fetchList(this.start_date);
    this.showExpandedDates = false;
  }

  startEdit(row: any, date: string)
  {
    row.attendance[date] = this.editAttendanceStatus;
    this.isEdit = true;
  }

  cancel()
  {
    this.isEdit = false;

  }


}