// schedule-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  scheduleId: string;
  number: string;
  course: string;
  trainer_name: string;
  planned_start_date: string;
  planned_end_date: string;
  from_time: string;
  to_time: string;
  participants: string;
  status: string;
  action: string;
  view: string;
}

@Component({
  selector: 'schedule-list-cmp',
  moduleId: module.id,
  templateUrl: 'schedule-list.component.html',
})
export class ScheduleListComponent implements OnInit {
  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public isEditMode: boolean = false;
  public rowIndexBeingEdited: number | null = null;
  public isAddParticipantsFormVisible = false;
  public newParticipantName = '';
  public display = 'none';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.http.get<any[]>('http://localhost:8083/api/training-views/schedule-list').subscribe(
      (data) => {
        // Filter out completed courses
        const filteredData = data.filter((item) => item.trainingStatus !== 'Completed');

        this.tableData1 = {
          headerRow: ['No.', 'Course', 'Trainer Name', 'Start Date', 'End Date', 'From Time', 'To Time', 'Status','Add Participants', 'Action', 'View'],
          dataRows: filteredData.map((item, index) => ({
            scheduleId: item.scheduleId,
            number: (index + 1).toString(),
            course: item.course,
            trainer_name: item.trainerName,
            planned_start_date: this.formatDate(item.plannedStartDate),
            planned_end_date: this.formatDate(item.plannedEndDate),
            from_time: item.fromTime,
            to_time: item.toTime,
            participants: item.participants,
            status: item.trainingStatus,
            action: '',
            view:'Attendees',
          })),
        };
        this.applyFilter();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  onSearchChange() {
    this.applyFilter();
  }
  extractTrainerName(fullName: string): string {
    const indexOfOpeningBracket = fullName.indexOf('(');
    if (indexOfOpeningBracket !== -1) {
      return fullName.substring(0, indexOfOpeningBracket).trim();
    } else {
      return fullName.trim();
    }
  }
  applyFilter() {
    const searchTerm = this.searchValue.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredData = [...this.tableData1.dataRows.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)];
      return;
    }

    this.filteredData = this.tableData1.dataRows
      .filter((row) =>
        Object.values(row).some(
          (value) =>
            value !== null &&
            value !== undefined &&
            value.toString().toLowerCase().includes(searchTerm)
        )
      )
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
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
    console.log('Saving changes for row:', rowIndex);
    this.isEditMode = false;
    this.rowIndexBeingEdited = null;

    const updatedSchedule = this.filteredData[rowIndex];

    // Include scheduleId in the updated data
    const updatedScheduleWithId = {
      scheduleId: updatedSchedule.scheduleId,
      plannedStartDate: updatedSchedule.planned_start_date,
      plannedEndDate: updatedSchedule.planned_end_date,
      trainingStatus: updatedSchedule.status,
      fromTime: updatedSchedule.from_time,
      toTime: updatedSchedule.to_time,
    };

    this.http.put('http://localhost:8083/api/training-views/update-schedule', updatedScheduleWithId).subscribe(
      () => {
        console.log('Schedule updated successfully');
        this.fetchData();
      },
      (error) => {
        console.error('Error updating schedule:', error);
      }
    );
//     this.http.put('http://localhost:8083/api/training-views/update-schedule', updatedScheduleWithId).subscribe(
//   () => {
//     console.log('Schedule updated successfully');
    
//     // Remove the completed item from the filteredData
//     this.filteredData = this.filteredData.filter(item => item.scheduleId !== updatedSchedule.scheduleId);
    
//     // Optionally, you can perform other actions or log
//   },
//   (error) => {
//     console.error('Error updating schedule:', error);
//   }
// );

  }
// saveChanges(rowIndex: number): void {
//   console.log('Saving changes for row:', rowIndex);
//   this.isEditMode = false;
//   this.rowIndexBeingEdited = null;

//   const updatedSchedule = this.filteredData[rowIndex];

//   // Include scheduleId in the updated data
//   const updatedScheduleWithId = {
//     scheduleId: updatedSchedule.scheduleId,
//     plannedStartDate: updatedSchedule.planned_start_date,
//     plannedEndDate: updatedSchedule.planned_end_date,
//     trainingStatus: 'Completed', // Set the status to 'Completed'
//     fromTime: updatedSchedule.from_time,
//     toTime: updatedSchedule.to_time,
//   };

//   // Update filteredData immediately
//   this.filteredData = this.filteredData.filter(item => item.scheduleId !== updatedSchedule.scheduleId);

//   // Optionally, you can perform other actions or log

//   // Fetch the updated data from the server
//   this.http.put('http://localhost:8083/api/training-views/update-schedule', updatedScheduleWithId).subscribe(
//     () => {
//       console.log('Schedule updated successfully');
//       // Fetch the data again after the update
//       this.fetchData();
//     },
//     (error) => {
//       console.error('Error updating schedule:', error);
//     }
//   );
// }

  cancelEdit() {
    this.isEditMode = false;
    this.rowIndexBeingEdited = null;
    // If you want to revert changes, you may need to reload the original data
  }

  toggleModal() {
    console.log('Opening Modal form');
    this.isAddParticipantsFormVisible = !this.isAddParticipantsFormVisible;
    this.display = 'block';
  }
  
  viewAttendees(course: string, trainingStatus: string): void {
    this.router.navigate(['/participants-list'], { queryParams: { course, trainingStatus } });
  }

  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page when changing items per page
    this.applyFilter();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilter();
  }
}
