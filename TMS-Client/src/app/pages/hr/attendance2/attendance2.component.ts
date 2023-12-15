import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    emp_code: string;
    emp_name: string;
    status: string;
    
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
    this.tableData1 = {
      headerRow: ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
      dataRows: [
        { emp_code: '3647', emp_name: 'Yash Gavanang', status: 'Ongoing' }
      ],
    };
  }


  
}
