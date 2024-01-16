// /* view-training.component.ts */
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { TrainingService } from '../admin-services/training.service';

// interface TableData {
//   headerRow: string[];
//   dataRows: {
//     number: string;
//     course: string;
//     trainer_name: string;
//     action: string;
//   }[];
// }

// interface TableRow {
//   number: string;
//   course: string;
//   trainer_name: string;
//   action: string;
// }

// @Component({
//   selector: 'view-training-cmp',
//   moduleId: module.id,
//   templateUrl: 'view-training.component.html'
// })
// export class ViewTrainingComponent implements OnInit {

//   constructor(private router: Router,private trainingService:TrainingService) {}
  
//     public tableData1: TableData;
//     public statusFilter: string = '';
//     public filteredData: TableRow[];
//     public searchValue: string = '';
//     isEditMode: boolean = false;
//     rowIndexBeingEdited: number | null = null;
//     isAddParticipantsFormVisible = false;
//     newParticipantName = '';
//     display = 'none';

//     currentPage = 1;
//     itemsPerPage = 5;
  
  
//     get pages(): number[] {
//       if (this.tableData1.dataRows.length === 0) {
//         return [];
//       }
  
//       const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
//       return Array.from({ length: pageCount }, (_, index) => index + 1);
//     }



//     ngOnInit()  {
//       this.fetchTableData();
//     }
//     // fetchTableData() {
//     //   this.trainingService.getTrainingData().subscribe(
//     //     (data: any[]) => {
//     //       this.tableData1 = {
//     //         headerRow: ['No.', 'Course', 'Trainer Name', 'Meeting Link', 'Username', 'Password', 'Action'],
//     //         dataRows: data.map((row, index) => ({
//     //           number: (index + 1).toString(),
//     //           course: row.course,
//     //           trainer_name: row.trainer_names,
//     //           meeting_link: row.url,
//     //           username: row.username,
//     //           password: row.password,
//     //           action: ''
//     //         }))
//     //       };
//     //       this.filteredData = [...this.tableData1.dataRows];
//     //     },
//     //     error => {
//     //       console.error('Error fetching training data:', error);
//     //     }
//     //   );
//     // }
//     fetchTableData() {
//       this.trainingService.getTrainingData().subscribe(
//         (data: any[]) => {
//           this.tableData1 = {
//             headerRow: ['Sr. No.', 'Course Name', 'Trainer Name', 'Action'],
//             dataRows: data.map((row, index) => ({
//               number: (index + 1).toString(),
//               course: row.course,
//               // trainer_name: `${row.trainer_names}(${row.course})`, // Update this line
//               trainer_name: this.extractTrainerName(row.trainer_names),

//               // meeting_link: row.url,
//               // username: row.username,
//               // password: row.password,
//               action: ''
//             }))
//           };
//           this.filteredData = [...this.tableData1.dataRows];
//         },
//         error => {
//           console.error('Error fetching training data:', error);
//         }
//       );
//     }
    
//     applyFilter() {
//         this.filteredData = this.tableData1.dataRows.filter(row =>
//           Object.values(row).some(value =>
//             value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
//           )
//         );
//       }
//       toggleEditMode(rowIndex: number): void {
//         this.isEditMode = !this.isEditMode;
//         this.rowIndexBeingEdited = this.isEditMode ? rowIndex : null;
//       }
    
//       startEdit(index: number) {
//         this.rowIndexBeingEdited = index;
//         this.isEditMode = true;
//       }
    
//       saveChanges(rowIndex: number): void {
//         // Implement logic to save changes (update your data array, send to server, etc.)
//         console.log('Saving changes for row:', rowIndex);
//         this.isEditMode = false;
//         this.rowIndexBeingEdited = null;
//       }
    
//       cancelEdit() {
//         this.isEditMode = false;
//         // If you want to revert changes, you may need to reload the original data
//       }
//       toggleModal() {
//         console.log('Opening Modal form')
//         this.isAddParticipantsFormVisible = !this.isAddParticipantsFormVisible;
//         this.display = 'block';
//     }

//     changeItemsPerPage(event: any): void {
//       this.itemsPerPage = +event.target.value;
//       this.currentPage = 1; // Reset to the first page when changing items per page
//     }
//     private extractTrainerName(fullName: string): string {
//       const indexOfOpeningBracket = fullName.indexOf('(');
//       if (indexOfOpeningBracket !== -1) {
//         return fullName.substring(0, indexOfOpeningBracket).trim();
//       } else {
//         return fullName.trim();
//       }
//     }
    
// }

// view-training.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from '../admin-services/training.service';

interface TableData {
  headerRow: string[];
  dataRows: {
    number: string;
    course: string;
    trainer_name: string;
    action: string;
  }[];
}

interface TableRow {
  number: string;
  course: string;
  trainer_name: string;
  action: string;
}

@Component({
  selector: 'view-training-cmp',
  moduleId: module.id,
  templateUrl: 'view-training.component.html'
})
export class ViewTrainingComponent implements OnInit {

  constructor(private router: Router, private trainingService: TrainingService) { }

  public tableData1: TableData;
  public statusFilter: string = '';
  public filteredData: TableRow[];
  public searchValue: string = '';
  isEditMode: boolean = false;
  rowIndexBeingEdited: number | null = null;
  isAddParticipantsFormVisible = false;
  newParticipantName = '';
  display = 'none';

  currentPage = 1;
  itemsPerPage = 5;

  get pages(): number[] {
    return this.calculatePagesToShow();
  }

  ngOnInit() {
    this.fetchTableData();
  }

  fetchTableData() {
    this.trainingService.getTrainingData().subscribe(
      (data: any[]) => {
        this.tableData1 = {
          headerRow: ['Sr. No.', 'Course Name', 'Trainer Name', 'Action'],
          dataRows: data.map((row, index) => ({
            number: (index + 1).toString(),
            course: row.course,
            trainer_name: this.extractTrainerName(row.trainer_names),
            action: ''
          }))
        };
        this.filteredData = [...this.tableData1.dataRows];
      },
      error => {
        console.error('Error fetching training data:', error);
      }
    );
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
    this.currentPage = 1; // Reset to the first page when applying a new filter
  }

  toggleEditMode(rowIndex: number): void {
    this.isEditMode = !this.isEditMode;
    this.rowIndexBeingEdited = this.isEditMode ? rowIndex : null;
  }

  startEdit(index: number) {
    this.rowIndexBeingEdited = index;
    this.isEditMode = true;
  }

  saveChanges(rowIndex: number): void {
    // Implement logic to save changes (update your data array, send to server, etc.)
    console.log('Saving changes for row:', rowIndex);
    this.isEditMode = false;
    this.rowIndexBeingEdited = null;
  }

  cancelEdit() {
    this.isEditMode = false;
    // If you want to revert changes, you may need to reload the original data
  }

  toggleModal() {
    console.log('Opening Modal form')
    this.isAddParticipantsFormVisible = !this.isAddParticipantsFormVisible;
    this.display = 'block';
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
  }

  private extractTrainerName(fullName: string): string {
    const indexOfOpeningBracket = fullName.indexOf('(');
    if (indexOfOpeningBracket !== -1) {
      return fullName.substring(0, indexOfOpeningBracket).trim();
    } else {
      return fullName.trim();
    }
  }

  calculatePagesToShow(): number[] {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    const maxPagesToShow = 5;
    let startPage: number;
    let endPage: number;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (this.currentPage <= Math.floor(maxPagesToShow / 2) + 1) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (this.currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = this.currentPage - Math.floor(maxPagesToShow / 2);
        endPage = startPage + maxPagesToShow - 1;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
}
