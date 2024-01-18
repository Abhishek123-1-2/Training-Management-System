
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/pages/login/login.service';

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  number: string;
  course: string;
  trainerName: string;
  trainingStatus: string;
  plannedStartDate: string;
  plannedEndDate: string;
  empId?: string;
}

interface TrainingHistory {
  empId: string;
  course: string;
  trainerName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  trainingStatus: string;
}

@Component({
  selector: 'manager-training-history',
  templateUrl: './manager-training-history.component.html',
  styleUrls: ['./manager-training-history.component.scss']
})

export class ManagerTrainingHistoryComponent implements OnInit {
  public tableData: TableData = { headerRow: [], dataRows: [] };
  public filteredData: TableRow[];
  public searchValue: string = '';
  isEditMode: boolean = false;
  rowIndexBeingEdited: number | null = null;
  isAddParticipantsFormVisible = false;
  newParticipantName = '';
  display = 'none';
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.tableData = {
      headerRow: ['No.', 'Course', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
      dataRows: []
    };

    this.filteredData = [...this.tableData.dataRows];
    this.loadTrainingHistory();
  }

  loadTrainingHistory() {
    console.log('Loading training history...');
    const storedSubordinateEmpIds = localStorage.getItem('subordinateEmpIds');
    console.log('Stored subordinateEmpIds:', storedSubordinateEmpIds);
  
    let subordinateEmpIds: number[] = [];
  
    if (storedSubordinateEmpIds) {
      try {
        subordinateEmpIds = JSON.parse(storedSubordinateEmpIds.replace(/"/g, ''));
  
        if (!Array.isArray(subordinateEmpIds)) {
          console.log('Stored value is not a valid array:', subordinateEmpIds);
          subordinateEmpIds = []; // Reset to an empty array if not a valid array
        }
      } catch (error) {
        console.error('Error parsing stored value:', error);
        subordinateEmpIds = []; // Reset to an empty array on parsing error
      }
    } else {
      console.log('Stored value is null or undefined.');
    }
  
    console.log('Parsed subordinateEmpIds:', subordinateEmpIds);
    this.fetchTrainingHistory(subordinateEmpIds);
  }
  
  get pages(): number[] {
    if (this.tableData.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData.dataRows.length / this.itemsPerPage);
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
    const totalPages = Math.ceil(this.tableData.dataRows.length / this.itemsPerPage);
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

  fetchTrainingHistory(subordinateEmpIds: number[]) {
    console.log('Inside fetchTrainingHistory');
    console.log('Fetching training history for empIds:', subordinateEmpIds);
  
    const empIdsParam = subordinateEmpIds.join(',');
    const url = `http://localhost:8083/api/manager/training-history/employee?empIds=${empIdsParam}`;
  
    console.log('Request URL:', url);
  
    this.http.get<TrainingHistory[]>(url).subscribe(
      (response) => {
        console.log('Manager Training History Data:', response);
  
        this.tableData.dataRows = response.map((item, index) => ({
          number: (index + 1).toString(),
          course: item.course,
          trainerName: item.trainerName.split('(')[0].trim(),
          plannedStartDate: item.plannedStartDate,
          plannedEndDate: item.plannedEndDate,
          trainingStatus: item.trainingStatus,
          empId: item.empId,
        }));
    
  
        this.filteredData = [...this.tableData.dataRows];
        this.applyFilter();
        this.currentPage = Math.min(this.currentPage, this.pages.length);
      },
      (error) => {
        console.error('Error fetching manager training history:', error);
      }
    );
  }
  // fetchTrainingHistory(subordinateEmpIds: number[]) {
  //   console.log('Inside fetchTrainingHistory');
  //   console.log('Fetching training history for empIds:', subordinateEmpIds);
  
  //   const empIdsParam = subordinateEmpIds.join(',');
  //   const url = `http://localhost:8083/api/manager/training-history/employee?empIds=${empIdsParam}`;
  
  //   console.log('Request URL:', url);
  
  //   this.http.get<TrainingHistory[]>(url).subscribe(
  //     (response) => {
  //       console.log('Manager Training History Data:', response);
  
  //       // Use a Set to track unique records
  //       const uniqueRecords = new Set<string>();
  
  //       this.tableData.dataRows = response
  //         .filter((item) => {
  //           const recordKey = `${item.empId}-${item.course}-${item.plannedStartDate}-${item.plannedEndDate}`;
  //           const isUnique = !uniqueRecords.has(recordKey);
  //           if (isUnique) {
  //             uniqueRecords.add(recordKey);
  //           }
  //           return isUnique;
  //         })
  //         .map((item, index) => ({
  //           number: (index + 1).toString(),
  //           course: item.course,
  //           trainerName: item.trainerName.split('(')[0].trim(),
  //           plannedStartDate: item.plannedStartDate,
  //           plannedEndDate: item.plannedEndDate,
  //           trainingStatus: item.trainingStatus,
  //           empId: item.empId,
  //         }));
  
  //       this.filteredData = [...this.tableData.dataRows];
  //       this.applyFilter();
  //       this.currentPage = Math.min(this.currentPage, this.pages.length);
  //     },
  //     (error) => {
  //       console.error('Error fetching manager training history:', error);
  //     }
  //   );
  // }
  

  applyFilter() {
    console.log('Applying filter. Search value:', this.searchValue);
    this.filteredData = this.tableData.dataRows.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
    console.log('Filtered Data after applying filter:', this.filteredData);
  }

  startEdit(index: number) {
    this.rowIndexBeingEdited = index;
    this.isEditMode = true;
  }

  saveChanges(rowIndex: number): void {
    console.log('Saving changes for row:', rowIndex);
    this.isEditMode = false;
    this.rowIndexBeingEdited = null;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  sendRequest() {
    window.alert('Your Request has been sent to the Reporting Manager Successfully');
    console.log('Success');
  }

  // get pages(): number[] {
  //   if (this.tableData && this.tableData.dataRows.length === 0) {
  //     return [];
  //   }

  //   const pageCount = Math.ceil(this.tableData.dataRows.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }

  // changeItemsPerPage(event: any): void {
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = 1;
  // }
}


