import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface TableData {
  headerRow: string[];
  dataRows: {
    scheduleId: string;
    number: string;
    course: string;
    trainer_name: string;
    planned_start_date: string;
    planned_end_date: string;
    from_time: string;
    to_time: string;
    status: string;
    action: string;
  }[];
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
  status: string;
  action: string;
}

@Component({
  selector: 'schedule-list-cmp',
  moduleId: module.id,
  templateUrl: 'schedule-list.component.html',
})
export class ScheduleListComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  public isEditMode: boolean = false;
  public rowIndexBeingEdited: number | null = null;
  isAddParticipantsFormVisible = false;
  newParticipantName = '';
  display = 'none';

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:8083/api/training-views/schedule-list').subscribe(
      (data) => {
        this.tableData1 = {
          headerRow: ['No.', 'Course', 'Trainer Name', 'Start Date', 'End Date', 'From Time', 'To Time', 'Status', 'Action'],
          dataRows: data.map((item, index) => ({
            scheduleId: item.scheduleId,
            number: (index + 1).toString(),
            course: item.course,
            trainer_name: item.trainerName,
            planned_start_date: item.plannedStartDate ? item.plannedStartDate.split('T')[0] : '',
            planned_end_date: item.plannedEndDate ? item.plannedEndDate.split('T')[0] : '',
            from_time: item.fromTime,
            to_time: item.toTime,
            status: item.trainingStatus,
            action: '',
          })),
        };
        this.filteredData = [...this.tableData1.dataRows];
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onSearchChange() {
    this.applyFilter();
  }

  applyFilter() {
    console.log('Search Value:', this.searchValue);

    if (!this.searchValue.trim()) {
      this.filteredData = [...this.tableData1.dataRows];
      console.log('Filtered Data:', this.filteredData);
      return;
    }

    this.filteredData = this.tableData1.dataRows.filter((row) =>
      Object.values(row).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );

    console.log('Filtered Data:', this.filteredData);
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
      planned_start_date: updatedSchedule.planned_start_date,
      planned_end_date: updatedSchedule.planned_end_date,
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
  }

  cancelEdit() {
    this.isEditMode = false;
    this.rowIndexBeingEdited = null;
  }

  toggleModal() {
    console.log('Opening Modal form');
    this.isAddParticipantsFormVisible = !this.isAddParticipantsFormVisible;
    this.display = 'block';
  }
}
