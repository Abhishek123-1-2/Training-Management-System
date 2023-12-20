import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    c_name: string;
    t_name: string;
    s_date: string;
    e_date: string;
    status: string;
  }[];
}

interface TableRow {
  sr_no: string;
  c_name: string;
  t_name: string;
  s_date: string;
  e_date: string;
  status: string;
}
@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  emp_code : string;
  completedCourses: any[];
  public tableData1: TableData;

  
  currentPage = 1;
  itemsPerPage = 5;



  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }




  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.emp_code = params['emp_code'];
      this.tableData1 = {
        headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
        dataRows: [
          { sr_no: '1', c_name: 'Angular', t_name:'John Doe', s_date: '30-11-2023', e_date: '03-12-2023', status: 'Completed'},
          { sr_no: '2', c_name: 'Node JS', t_name:'Jane Smith', s_date: '12-10-2023', e_date: '18-10-2023', status: 'Completed'},
          { sr_no: '3', c_name: 'Full Stack Web Development', t_name: 'Shaun Marsh', s_date: '02-08-2023', e_date: '10-08-2023', status: 'Completed'},
          
        ]
      }
    })
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; 
  }

  

}
