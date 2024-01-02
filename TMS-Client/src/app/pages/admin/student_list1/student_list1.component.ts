// student-list1.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    emp_code: string;
    emp_name: string;
    c_name: string;
    t_name: string;
    start_date: string;
    end_date: string;
    status: string;
    view: string;
  }[];
}

@Component({
  selector: 'student-list1-cmp',
  moduleId: module.id,
  templateUrl: './student_list1.component.html',
})
export class StudentList1Component implements OnInit {
  course: string;
  start_date: string;  // Add these declarations
  end_date: string;
  status: string;
  public studentList: TableData;
  public filteredData: any[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course = params['course'];
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      this.status = params['status'];
      this.fetchStudentList(this.course);
    });
    
  }

  // fetchStudentList(course: string): void {
  //   this.http.get<any[]>(`http://localhost:8083/api/training-views/completedDetails/${course}`)
  //     .subscribe(data => {
  //       this.studentList = {
  //         headerRow: ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status', 'Reports'],
  //         dataRows: data.map(item => ({
  //           emp_code: item.empCode,
  //           emp_name: item.empName,
  //           c_name: item.courseName,
  //           t_name: item.trainerName,
  //           start_date: new Date(item.startDate).toLocaleDateString(),
  //           end_date: new Date(item.endDate).toLocaleDateString(),
  //           status: item.trainingStatus,
  //           view: 'View',
  //         })),
  //       };
  //       this.filteredData = [...this.studentList.dataRows];
  //     });
  // }
  fetchStudentList(course: string): void {
    this.http.get<any[]>(`http://localhost:8083/api/training-views/completedDetails/${course}`)
      .subscribe(data => {
        this.studentList = {
          headerRow: ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status', 'Reports'],
          dataRows: data.map(item => ({
            emp_code: item.empCode,
            emp_name: item.empName,
            c_name: item.courseName,
            t_name: item.trainerName,
            start_date: new Date(item.startDate).toLocaleDateString(),
            end_date: new Date(item.endDate).toLocaleDateString(),
            status: item.trainingStatus,
            view: 'View',
          })),
        };
        this.filteredData = [...this.studentList.dataRows];
      });
  }
  

  applyFilter(): void {
    this.filteredData = this.studentList.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  get pages(): number[] {
    if (this.studentList.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.studentList.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }
}
