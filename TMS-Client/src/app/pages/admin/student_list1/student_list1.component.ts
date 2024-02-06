// student-list1.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
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
  providers: [DatePipe],
})
export class StudentList1Component implements OnInit {
  course: string;
  start_date: string;  // Add these declarations
  end_date: string;
  status: string;
  trainerName:string;
  public studentList: TableData;
  public filteredData: any[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
 public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  constructor(private route: ActivatedRoute, private http: HttpClient,private datePipe: DatePipe) {}

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.course = params['course'];
  //     this.start_date = params['start_date'];
  //     this.end_date = params['end_date'];
  //     this.status = params['status'];
  //     this.fetchStudentList(this.course);
  //   });
    
  // }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.course = params['course'];
      this.trainerName = params['trainerName'];
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      this.status = params['status'];
      this.fetchStudentList(this.course, this.trainerName,this.start_date,this.end_date);
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
  // fetchStudentList(course: string, trainerName: string): void {
  //   this.http.get<any[]>(`http://localhost:8083/api/training-views/completed-course-details/${course}/${trainerName}`)
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
  fetchStudentList(course: string, trainerName: string,start_date:string,end_date:string): void {
    const formattedStartDate = this.datePipe.transform(new Date(start_date), 'yyyy-MM-dd');
  const formattedEndDate = this.datePipe.transform(new Date(end_date), 'yyyy-MM-dd');

    this.http.get<any[]>(`http://localhost:8083/api/training-views/completed-course-details/${course}/${trainerName}/${formattedStartDate}/${formattedEndDate}`)
      .subscribe(data => {
        this.studentList = {
          headerRow: ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status', 'Reports'],
          dataRows: data.map(item => ({
            emp_code: item.empCode,
            emp_name: item.empName,
            c_name: item.course,
            t_name: item.trainerName,
            start_date: this.formatDate(item.startDate),
            end_date: this.formatDate(item.endDate),
            status: item.trainingStatus,
            view: 'View',
          })),
        };
        this.filteredData = [...this.studentList.dataRows];
      });
}
// fetchStudentList(course: string, trainerName: string, start_date: string, end_date: string): void {
//   this.http.get<any[]>(`http://localhost:8083/api/training-views/completed-course-details/${course}/${trainerName}/${start_date}/${end_date}`)
//     .subscribe(data => {
//       // Check if 'data' is an array and not empty
//       if (Array.isArray(data) && data.length > 0) {
//         this.studentList = {
//           headerRow: ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status', 'Reports'],
//           dataRows: data.map(item => ({
//             emp_code: item.empCode,
//             emp_name: item.empName,
//             c_name: item.course,
//             t_name: item.trainerName,
//             start_date: new Date(item.plannedStartDate).toLocaleDateString(),
//             end_date: new Date(item.plannedEndDate).toLocaleDateString(),
//             status: item.trainingStatus,
//             view: 'View',
//           })),
//         };
//         this.filteredData = [...this.studentList.dataRows];
//       } else {
//         console.error('Invalid or empty response from the API');
//       }
//     }, error => {
//       console.error('Error fetching data from the API', error);
//     });
// }


formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
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
    this.applyFilter();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateVisiblePages();
    this.applyFilter();
  }

  updateVisiblePages(): void {
    const totalPages = Math.ceil(this.studentList.dataRows.length / this.itemsPerPage);
    const halfPaginatorSize = Math.floor(this.rollingPaginatorSize / 2);

    if (totalPages <= this.rollingPaginatorSize) {
      this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (this.currentPage <= halfPaginatorSize) {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => i + 1);
      } else if (this.currentPage >= totalPages - halfPaginatorSize) {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => totalPages - this.rollingPaginatorSize + i + 1);
      } else {
        this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => this.currentPage - halfPaginatorSize + i);
      }
    }
  }
}
