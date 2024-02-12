import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
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
  selector: 'manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartHistogram;
  public chartPie;
  public selectedMonth: string = 'All';
  public selectedFilter: string = 'all';
  public histogramData: number[] = [0, 0, 0]; // Default data for the histogram chart
  public pieData: number[] = [0, 0, 0]; // Default data for the pie chart
  public monthOptions: string[] = ['All'];
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
  public rollPaginator: boolean = false; // Added line
  public visiblePages: number[] = []; // Added line
  private rollingPaginatorSize = 5;
  selectedFilterMonth: string = 'All';
  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initHistogramChart();
    this.initPieChart();
    this.fetchStatusCounts();
    this.fetchData();
  }
  // fetchData() {
  //   this.http.get<any[]>('http://localhost:8083/api/training-views/schedule-list').subscribe(
  //     (data) => {
  //       // Filter out completed courses
  //       const filteredData = data.filter((item) => item.trainingStatus !== 'Completed');

  //       this.tableData1 = {
  //         headerRow: ['No.', 'Course', 'Trainer Name', 'Start Date', 'End Date', 'From Time', 'To Time', 'Status','Add Participants', 'Action', 'View'],
  //         dataRows: filteredData.map((item, index) => ({
  //           scheduleId: item.scheduleId,
  //           number: (index + 1).toString(),
  //           course: item.course,
  //           trainer_name: item.trainerName,
  //           planned_start_date: this.formatDate(item.plannedStartDate),
  //           planned_end_date: this.formatDate(item.plannedEndDate),
  //           from_time: item.fromTime,
  //           to_time: item.toTime,
  //           participants: item.participants,
  //           status: item.trainingStatus,
  //           action: '',
  //           view:'Attendees',
  //         })),
  //       };
  //       this.applyFilter();
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  // fetchData(month?: string) {
  //   let apiUrl = 'http://localhost:8083/api/training-views/schedule-list';
  
  //   if (month && month !== 'All') {
  //     apiUrl += `?month=${month}`;
  //   }
  
  //   this.http.get<any[]>(apiUrl).subscribe(
  //     (data) => {
  //       // Filter out completed courses
  //       const filteredData = data.filter((item) => item.trainingStatus !== 'Completed');
  
  //       this.tableData1 = {
  //         headerRow: ['No.', 'Course', 'Trainer Name', 'Start Date', 'End Date', 'From Time', 'To Time', 'Status','Add Participants', 'Action', 'View'],
  //         dataRows: filteredData.map((item, index) => ({
  //           scheduleId: item.scheduleId,
  //           number: (index + 1).toString(),
  //           course: item.course,
  //           trainer_name: item.trainerName,
  //           planned_start_date: this.formatDate(item.plannedStartDate),
  //           planned_end_date: this.formatDate(item.plannedEndDate),
  //           from_time: item.fromTime,
  //           to_time: item.toTime,
  //           participants: item.participants,
  //           status: item.trainingStatus,
  //           action: '',
  //           view:'Attendees',
  //         })),
  //       };
  //       this.applyFilter();
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  // onFilterMonthChange() {
  //   this.fetchData(this.selectedFilterMonth);
  // }
  // fetchData(month?: string) {
  //   let apiUrl = 'http://localhost:8083/api/training-views/schedule-list';

  //   if (month && month !== 'All') {
  //     apiUrl += `?month=${month}`;
  //   }

  //   this.http.get<any[]>(apiUrl).subscribe(
  //     (data) => {
  //       // Filter out completed courses
  //       const filteredData = data.filter((item) => item.trainingStatus !== 'Completed' && this.getMonthFromDate(item.plannedStartDate) === month);

  //       this.tableData1 = {
  //         headerRow: ['No.', 'Course', 'Trainer Name', 'Start Date', 'End Date', 'From Time', 'To Time', 'Status','Add Participants', 'Action', 'View'],
  //         dataRows: filteredData.map((item, index) => ({
  //           scheduleId: item.scheduleId,
  //           number: (index + 1).toString(),
  //           course: item.course,
  //           trainer_name: item.trainerName,
  //           planned_start_date: this.formatDate(item.plannedStartDate),
  //           planned_end_date: this.formatDate(item.plannedEndDate),
  //           from_time: item.fromTime,
  //           to_time: item.toTime,
  //           participants: item.participants,
  //           status: item.trainingStatus,
  //           action: '',
  //           view:'Attendees',
  //         })),
  //       };
  //       this.applyFilter();
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  fetchData(month?: string) {
    let apiUrl = 'http://localhost:8083/api/training-views/schedule-list';
  
    if (month && month !== 'All') {
      apiUrl += `?month=${month}`;
    }
  
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        // Filter out completed courses
        let filteredData = data.filter((item) => item.trainingStatus !== 'Completed');
  
        if (month && month !== 'All') {
          filteredData = filteredData.filter((item) => this.getMonthFromDate(item.plannedStartDate) === month);
        }
  
        this.tableData1 = {
          headerRow: ['No.', 'Course', 'Trainer Name', 'Start Date', 'End Date', 'From Time', 'To Time', 'Status'],
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
  
  onFilterMonthChange() {
    this.fetchData(this.selectedFilterMonth === 'All' ? undefined : this.selectedFilterMonth);
  }

  // formatDate(dateStr: string) {
  //   // Implement your date formatting logic here
  //   return dateStr;
  // }

  getMonthFromDate(dateStr: string) {
    // Extract month from date string (e.g., '2024-02-20' => 'February')
    const [year, month, day] = dateStr.split('-');
    return this.monthOptions[parseInt(month, 10)];
  }
  // formatDate(timestamp: string): string {
  //   const date = new Date(timestamp);
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const day = date.getDate().toString().padStart(2, '0');
  //   return `${day}-${month}-${year}`;
  // }
  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  // get pages(): number[] {
  //   return this.calculatePagesToShow();
  // }
  calculatePagesToShow(): number[] {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    const maxPagesToShow = this.rollPaginator ? this.rollingPaginatorSize : totalPages;
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
  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
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
    const totalPages = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
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
  // updateVisiblePages(): void {
  //   const totalPages = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
  //   const halfPaginatorSize = Math.floor(this.rollingPaginatorSize / 2);

  //   if (totalPages <= this.rollingPaginatorSize) {
  //     this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
  //   } else {
  //     if (this.currentPage <= halfPaginatorSize) {
  //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => i + 1);
  //     } else if (this.currentPage >= totalPages - halfPaginatorSize) {
  //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => totalPages - this.rollingPaginatorSize + i + 1);
  //     } else {
  //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => this.currentPage - halfPaginatorSize + i);
  //     }
  //   }
  // }
  
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
  
  // viewAttendees(course: string, trainingStatus: string): void {
  //   this.router.navigate(['/participants-list'], { queryParams: { course, trainingStatus } });
  // }
  // viewAttendees(course: string, trainingStatus: string, trainerName: string): void {
  //   this.router.navigate(['/participants-list'], { queryParams: { course, trainingStatus, trainerName } });
  // }
  
  viewAttendees(course: string, trainingStatus: string, trainerName: string, plannedStartDate: string, plannedEndDate: string): void {
    this.router.navigate(['/participants-list'], {
      queryParams: {
        course,
        trainingStatus,
        trainerName,
        plannedStartDate,
        plannedEndDate
      }
    });
  }
  
 
  

  // onPageChange(page: number): void {
  //   this.currentPage = page;
  //   this.applyFilter();
  // }
  // updateVisiblePages(): void {
  //   const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
  //   const halfPaginatorSize = Math.floor(this.rollingPaginatorSize / 2);
  
  //   if (totalPages <= this.rollingPaginatorSize) {
  //     this.visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);
  //   } else {
  //     if (this.currentPage <= halfPaginatorSize) {
  //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => i + 1);
  //     } else if (this.currentPage >= totalPages - halfPaginatorSize) {
  //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => totalPages - this.rollingPaginatorSize + i + 1);
  //     } else {
  //       this.visiblePages = Array.from({ length: this.rollingPaginatorSize }, (_, i) => this.currentPage - halfPaginatorSize + i);
  //     }
  //   }
  // }
  
  // onPageChange(page: number): void {
  //   this.currentPage = page;
  //   this.updateVisiblePages(); // Call updateVisiblePages() after changing the page
  //   this.applyFilter();
  // }
  // private fetchStatusCounts() {
  //   const apiUrl = 'http://localhost:8083/api/training-views/status-counts-by-month';

  //   this.http.get(apiUrl).subscribe(
  //     (data: any) => {
  //       this.populateMonthOptions(data);
  //       this.histogramData = this.extractCounts(data, this.selectedMonth);
  //       this.pieData = this.extractCounts(data, this.selectedMonth);
  //       this.updateCharts();
  //     },
  //     (error: any) => {
  //       console.error('Error fetching status counts:', error);
  //     }
  //   );
  // }
  private fetchStatusCounts() {
    const apiUrl = 'http://localhost:8083/api/training-views/status-counts-by-month';
  
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.populateMonthOptions(data);
        
        if (this.selectedMonth === 'All') {
          // Combine data for all months
          this.histogramData = this.combineDataForAllMonths(data);
          this.pieData = this.combineDataForAllMonths(data);
        } else {
          this.histogramData = this.extractCounts(data, this.selectedMonth);
          this.pieData = this.extractCounts(data, this.selectedMonth);
        }
  
        this.updateCharts();
      },
      (error: any) => {
        console.error('Error fetching status counts:', error);
      }
    );
  }
  private combineDataForAllMonths(data: any): number[] {
    // Initialize counts for all categories to zero
    let completedCount = 0;
    let onGoingCount = 0;
    let upcomingCount = 0;
  
    // Loop through each month's data and accumulate counts
    for (const monthData of Object.values(data)) {
      completedCount += monthData['COMPLETED'] || 0;
      onGoingCount += monthData['ON-GOING'] || 0;
      upcomingCount += monthData['UPCOMING'] || 0;
    }
  
    return [completedCount, onGoingCount, upcomingCount];
  }

  private extractCounts(data: any, month: string): number[] {
    const monthData = data[month] || {};
    return [
      monthData['COMPLETED'] || 0,
      monthData['ON-GOING'] || 0,
      monthData['UPCOMING'] || 0,
    ];
  }

  private initHistogramChart() {
    this.canvas = document.getElementById('chartHistogram');
    this.ctx = this.canvas.getContext('2d');

    this.chartHistogram = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Completed', 'On-going', 'Upcoming'],
        datasets: [
          {
            label: 'Course Data',
            data: this.histogramData,
            backgroundColor: ['#6bd098', '#51CACF', '#fcc468'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }],
        },
      },
    });
  }

  private initPieChart() {
    this.canvas = document.getElementById('chartPie');
    this.ctx = this.canvas.getContext('2d');

    this.chartPie = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: ['Completed', 'On-going', 'Upcoming'],
        datasets: [
          {
            data: this.pieData,
            backgroundColor: ['#6bd098', '#51CACF', '#fcc468'],
          },
        ],
      },
      options: {
        legend: {
          position: 'right',
        },
      },
    });
  }

  // private populateMonthOptions(response: any) {
  //   this.monthOptions = ['All'];

  //   for (const monthYear in response) {
  //     if (response.hasOwnProperty(monthYear)) {
  //       this.monthOptions.push(monthYear);
  //     }
  //   }
  // }
  private populateMonthOptions(response: any) {
    this.monthOptions = ['All'];
  
    const currentYear = new Date().getFullYear();
    const monthFormat = new Intl.DateTimeFormat('en', { month: 'long' });
  
    for (let month = 1; month <= 12; month++) {
      const formattedMonth = `${currentYear}-${month.toString().padStart(2, '0')}`;
      this.monthOptions.push(`${monthFormat.format(new Date(formattedMonth))} ${currentYear}`);
    }
  }
  

  onMonthChange() {
    this.fetchStatusCounts();
  }

  onFilterChange() {
    this.updateCharts();
  }

  private updateCharts() {
    this.chartHistogram.data.datasets[0].data = this.histogramData;
    this.chartHistogram.update();

    this.chartPie.data.datasets[0].data = this.pieData;
    this.chartPie.update();
  }

  

  

}
