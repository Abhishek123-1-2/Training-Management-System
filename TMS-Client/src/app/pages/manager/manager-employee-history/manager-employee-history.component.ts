
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// interface TableData {
//   headerRow: string[];
//   dataRows: TableRow[];
// }

// interface TableRow {
//   sr_no: string;
//   emp_code: string;
//   emp_name: string;
//   start_date: string;
//   end_date: string;
//   status: string;
// }

// interface EmployeeCourseDetails {
//   empId: number;
//   empCode: string;
//   empName: string;
//   courseName: string;
//   trainerName: string;
//   startDate: string;
//   endDate: string;
//   trainingStatus: string;
// }

// @Component({
//   selector: 'manager-employee-history',
//   templateUrl: './manager-employee-history.component.html',
//   styleUrls: ['./manager-employee-history.component.scss'],
// })
// export class ManagerEmployeeHistoryComponent implements OnInit {
//   public tableData: TableData = { headerRow: [], dataRows: [] };
//   public filteredData: TableRow[];
//   public searchValue: string = '';
//   public currentPage = 1;
//   public itemsPerPage = 5;
//   public courseName: string;

//   constructor(private http: HttpClient, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params) => {
//       const subordinateEmpIds = this.retrieveSubordinateEmpIdsFromLocalStorage();
//       this.courseName = params['course'];
//       this.fetchEmployeeCourseDetails(this.courseName, subordinateEmpIds);
//     });
//   }

//   retrieveSubordinateEmpIdsFromLocalStorage(): number[] {
//     const storedSubordinateEmpIds = localStorage.getItem('subordinateEmpIds');
//     let subordinateEmpIds: number[] = [];

//     if (storedSubordinateEmpIds) {
//       try {
//         subordinateEmpIds = JSON.parse(storedSubordinateEmpIds.replace(/"/g, ''));

//         if (!Array.isArray(subordinateEmpIds)) {
//           console.log('Stored value is not a valid array:', subordinateEmpIds);
//           subordinateEmpIds = [];
//         }
//       } catch (error) {
//         console.error('Error parsing stored value:', error);
//         subordinateEmpIds = [];
//       }
//     } else {
//       console.log('Stored value is null or undefined.');
//     }

//     console.log('Parsed subordinateEmpIds:', subordinateEmpIds);
//     return subordinateEmpIds;
//   }

//   fetchEmployeeCourseDetails(course: string, subordinateEmpIds: number[]): void {
//     const empIdsParam = subordinateEmpIds.join(',');
//     const url = `http://localhost:8083/api/training-views/completedDetailsForSubordinates/${course}?subordinateEmpIds=${empIdsParam}`;

//     this.http.get<EmployeeCourseDetails[]>(url).subscribe(
//       (response) => {
//         console.log('Employee Course Details Data:', response);

//         this.tableData.dataRows = response.map((item, index) => ({
//           sr_no: (index + 1).toString(),
//           emp_code: item.empCode,
//           emp_name: item.empName,
//           start_date: item.startDate,
//           end_date: item.endDate,
//           status: item.trainingStatus,
//         }));

//         this.filteredData = [...this.tableData.dataRows];
//         this.applyFilter();
//         this.currentPage = Math.min(this.currentPage, this.pages.length);
//       },
//       (error) => {
//         console.error('Error fetching employee course details:', error);
//       }
//     );
//   }

//   applyFilter() {
//     console.log('Applying filter. Search value:', this.searchValue);
//     this.filteredData = this.tableData.dataRows.filter((row) =>
//       Object.values(row).some((value) =>
//         value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
//       )
//     );
//     console.log('Filtered Data after applying filter:', this.filteredData);
//   }

//   get pages(): number[] {
//     if (this.tableData && this.tableData.dataRows.length === 0) {
//       return [];
//     }

//     const pageCount = Math.ceil(this.tableData.dataRows.length / this.itemsPerPage);
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   changeItemsPerPage(event: any): void {
//     this.itemsPerPage = +event.target.value;
//     this.currentPage = 1;
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  sr_no: string;
  emp_code: string;
  emp_name: string;
  start_date: string;
  end_date: string;
  status: string;
}

interface EmployeeCourseDetails {
  empId: number;
  empCode: string;
  empName: string;
  courseName: string;
  trainerName: string;
  startDate: string;
  endDate: string;
  trainingStatus: string;
}

@Component({
  selector: 'manager-employee-history',
  templateUrl: './manager-employee-history.component.html',
  styleUrls: ['./manager-employee-history.component.scss'],
})
export class ManagerEmployeeHistoryComponent implements OnInit {
  public tableData: TableData = { headerRow: [], dataRows: [] };
  public filteredData: TableRow[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;
  public courseName: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     const subordinateEmpIds = this.retrieveSubordinateEmpIdsFromLocalStorage();
  //     this.courseName = params['course'];
  //     this.fetchEmployeeCourseDetails(this.courseName, subordinateEmpIds);
  //   });
  // }
  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     const subordinateEmpIds = this.retrieveSubordinateEmpIdsFromLocalStorage();
  //     this.courseName = params['course'];
  //     const trainerName = params['trainerName']; // Retrieve trainerName from route params
  //     this.fetchEmployeeCourseDetails(this.courseName, subordinateEmpIds, trainerName);
  //   });
  // }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const subordinateEmpIds = this.retrieveSubordinateEmpIdsFromLocalStorage();
      this.courseName = params['course'];
      const trainerName = params['trainerName'];
      const plannedStartDate = params['plannedStartDate']; // Retrieve plannedStartDate from route params
      const plannedEndDate = params['plannedEndDate']; // Retrieve plannedEndDate from route params
  
      this.fetchEmployeeCourseDetails(this.courseName, subordinateEmpIds, trainerName, plannedStartDate, plannedEndDate);
    });
  }
  
  retrieveSubordinateEmpIdsFromLocalStorage(): number[] {
    const storedSubordinateEmpIds = localStorage.getItem('subordinateEmpIds');
    let subordinateEmpIds: number[] = [];

    if (storedSubordinateEmpIds) {
      try {
        subordinateEmpIds = JSON.parse(storedSubordinateEmpIds.replace(/"/g, ''));

        if (!Array.isArray(subordinateEmpIds)) {
          console.log('Stored value is not a valid array:', subordinateEmpIds);
          subordinateEmpIds = [];
        }
      } catch (error) {
        console.error('Error parsing stored value:', error);
        subordinateEmpIds = [];
      }
    } else {
      console.log('Stored value is null or undefined.');
    }

    console.log('Parsed subordinateEmpIds:', subordinateEmpIds);
    return subordinateEmpIds;
  }

  // fetchEmployeeCourseDetails(course: string, subordinateEmpIds: number[]): void {
  //   const empIdsParam = subordinateEmpIds.join(',');
  //   const url = `http://localhost:8083/api/training-views/completedDetailsForSubordinates/${course}?subordinateEmpIds=${empIdsParam}`;

  //   this.http.get<EmployeeCourseDetails[]>(url).subscribe(
  //     (response) => {
  //       console.log('Employee Course Details Data:', response);

  //       this.tableData = {
  //         headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Start Date', 'End Date', 'Status'],
  //         dataRows: response.map((item, index) => ({
  //           sr_no: (index + 1).toString(),
  //           emp_code: item.empCode,
  //           emp_name: item.empName,
  //           start_date: item.startDate,
  //           end_date: item.endDate,
  //           status: item.trainingStatus,
  //         })),
  //       };

  //       this.filteredData = [...this.tableData.dataRows];
  //       this.applyFilter();
  //       this.currentPage = Math.min(this.currentPage, this.pages.length);
  //     },
  //     (error) => {
  //       console.error('Error fetching employee course details:', error);
  //     }
  //   );
  // }
  // fetchEmployeeCourseDetails(course: string, subordinateEmpIds: number[], trainerName: string): void {
  //   const empIdsParam = subordinateEmpIds.join(',');
  //   const url = `http://localhost:8083/api/training-views/completedDetailsForSubordinates/${course}?subordinateEmpIds=${empIdsParam}&trainerName=${trainerName}`;
  
  //   this.http.get<EmployeeCourseDetails[]>(url).subscribe(
  //     (response) => {
  //       console.log('Employee Course Details Data:', response);
  
  //       this.tableData = {
  //         headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Start Date', 'End Date', 'Status'],
  //         dataRows: response.map((item, index) => ({
  //           sr_no: (index + 1).toString(),
  //           emp_code: item.empCode,
  //           emp_name: item.empName,
  //           start_date: item.startDate,
  //           end_date: item.endDate,
  //           status: item.trainingStatus,
  //         })),
  //       };
  
  //       this.filteredData = [...this.tableData.dataRows];
  //       this.applyFilter();
  //       this.currentPage = Math.min(this.currentPage, this.pages.length);
  //     },
  //     (error) => {
  //       console.error('Error fetching employee course details:', error);
  //     }
  //   );
  // }
  fetchEmployeeCourseDetails(course: string, subordinateEmpIds: number[], trainerName: string, plannedStartDate: string, plannedEndDate: string): void {
    const empIdsParam = subordinateEmpIds.join(',');
    const url = `http://localhost:8083/api/training-views/completedDetailsForSubordinates/${course}?subordinateEmpIds=${empIdsParam}&trainerName=${trainerName}&startDate=${plannedStartDate}&endDate=${plannedEndDate}`;
  
    this.http.get<EmployeeCourseDetails[]>(url).subscribe(
      (response) => {
        console.log('Employee Course Details Data:', response);
  
        this.tableData = {
          headerRow: ['Sr No.', 'Employee Code', 'Employee Name', 'Start Date', 'End Date', 'Status'],
          dataRows: response.map((item, index) => ({
            sr_no: (index + 1).toString(),
            emp_code: item.empCode,
            emp_name: item.empName,
            start_date: item.startDate,
            end_date: item.endDate,
            status: item.trainingStatus,
          })),
        };
  
        this.filteredData = [...this.tableData.dataRows];
        this.applyFilter();
        this.currentPage = Math.min(this.currentPage, this.pages.length);
      },
      (error) => {
        console.error('Error fetching employee course details:', error);
      }
    );
  }
  
  applyFilter() {
    console.log('Applying filter. Search value:', this.searchValue);
    this.filteredData = this.tableData.dataRows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
    console.log('Filtered Data after applying filter:', this.filteredData);
  }

  get pages(): number[] {
    if (this.tableData && this.tableData.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }
}
