// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// interface TrainingSchedule {
//   scheduleId: number;
//   course: string;
//   trainerName: string;
// }

// interface TableRow {
//   sr_no: string;
//   scheduleId: number; // Added scheduleId
//   c_name: string; // Course Name
//   t_name: string; // Trainer Name
//   view: string;
// }

// interface TableData {
//   headerRow: string[];
//   dataRows: TableRow[];
// }

// @Component({
//   selector: 'manager-training-record',
//   templateUrl: './manager-training-record.component.html',
//   styleUrls: ['./manager-training-record.component.scss']
// })
// export class ManagerTrainingRecordComponent implements OnInit {

//   public tableData1: TableData = { headerRow: [], dataRows: [] };
//   public filteredData: TableRow[] = [];
//   public searchValue: string = '';
//   public currentPage = 1;
//   public itemsPerPage = 5;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchTrainingScheduleList();
//   }

//   fetchTrainingScheduleList(): void {
//     this.http.get<TrainingSchedule[]>('http://localhost:8083/api/training-views/schedule-list').subscribe(
//       (data) => {
//         this.tableData1 = {
//           headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Records'],
//           dataRows: data.map((item, index) => ({
//             sr_no: (index + 1).toString(),
//             scheduleId: item.scheduleId, // Added scheduleId
//             c_name: item.course,
//             t_name: this.extractTrainerName(item.trainerName),
//             view: 'View',
//           })),
//         };
//         this.applyFilter();
//       },
//       (error) => {
//         console.error('Error fetching training schedule list:', error);
//       }
//     );
//   }

//   applyFilter() {
//     this.filteredData = this.tableData1.dataRows.filter((row) =>
//       Object.values(row).some((value) =>
//         value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
//       )
//     );
//   }
  
//   private extractTrainerName(fullName: string): string {
//     const indexOfOpeningBracket = fullName.indexOf('(');
//     if (indexOfOpeningBracket !== -1) {
//       return fullName.substring(0, indexOfOpeningBracket).trim();
//     } else {
//       return fullName.trim();
//     }
//   }
//   get pages(): number[] {
//     if (this.filteredData.length === 0) {
//       return [];
//     }

//     const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
//     return Array.from({ length: pageCount }, (_, index) => index + 1);
//   }

//   changeItemsPerPage(event: any): void {
//     this.itemsPerPage = +event.target.value;
//     this.currentPage = 1;
//   }

// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface TrainingHistoryResponse {
  empId: string;
  course: string;
  trainerName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  trainingStatus: string;
}

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  sr_no: string;
  scheduleId: number; // Added scheduleId
  c_name: string; // Course Name
  t_name: string; // Trainer Name
  view: string;
}

@Component({
  selector: 'manager-training-record',
  templateUrl: './manager-training-record.component.html',
  styleUrls: ['./manager-training-record.component.scss']
})
export class ManagerTrainingRecordComponent implements OnInit {

  public tableData1: TableData = { headerRow: [], dataRows: [] };
  public filteredData: TableRow[] = [];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTrainingHistory();
  }

  fetchTrainingHistory(): void {
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

    const empIdsParam = subordinateEmpIds.join(',');
    const url = `http://localhost:8083/api/manager/training-history/employee?empIds=${empIdsParam}`;

    this.http.get<TrainingHistoryResponse[]>(url).subscribe(
      (response) => {
        console.log('Training History Data:', response);

        this.tableData1 = {
          headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Records'],
          dataRows: response.map((item, index) => ({
            sr_no: (index + 1).toString(),
            scheduleId: +item.empId, // Use empId as scheduleId, convert to number if needed
            c_name: item.course,
            t_name: item.trainerName.split('(')[0].trim(),
            view: 'View',
          })),
        };

        this.filteredData = [...this.tableData1.dataRows];
        this.applyFilter();
        this.currentPage = Math.min(this.currentPage, this.pages.length);
      },
      (error) => {
        console.error('Error fetching training history:', error);
      }
    );
  }

  applyFilter() {
    console.log('Applying filter. Search value:', this.searchValue);
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
    console.log('Filtered Data after applying filter:', this.filteredData);
  }

  get pages(): number[] {
    if (this.filteredData.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }
}
