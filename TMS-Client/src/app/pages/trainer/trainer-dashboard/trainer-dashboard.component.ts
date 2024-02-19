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
  selector: 'trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.scss']
})
export class TrainerDashboardComponent implements OnInit {

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
  public selectedYear: string = 'All'; // Initially set to 'All'
public yearOptions: string[] = ['All']; // Initialize with 'All'
  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initHistogramChart();
    this.initPieChart();
    this.fetchStatusCounts();
    this.fetchData();
  }

  
  fetchData(month?: string, year?: number) {
    let apiUrl = 'http://localhost:8083/api/training-views/schedule-list';
  
    // Construct the API URL with both month and year filters
    if (month && month !== 'All') {
      apiUrl += `?month=${month}`;
      if (year && !isNaN(year)) { // Check if year is a valid number
        apiUrl += `&year=${year}`;
      }
    } else if (year && !isNaN(year)) { // Check if year is a valid number
      apiUrl += `?year=${year}`;
    }
  
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        // Filter out completed courses
        let filteredData = data.filter((item) => item.trainingStatus !== 'Completed');
  
        if (month && month !== 'All') {
          if (year && !isNaN(year)) {
            filteredData = filteredData.filter((item) => 
              this.getMonthFromDate(item.plannedStartDate) === month &&
              new Date(item.plannedStartDate).getFullYear() === year
            );
          } else {
            filteredData = filteredData.filter((item) => 
              this.getMonthFromDate(item.plannedStartDate) === month
            );
          }
        } else if (year && !isNaN(year)) {
          filteredData = filteredData.filter((item) => 
            new Date(item.plannedStartDate).getFullYear() === year
          );
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
    this.fetchData(
      this.selectedFilterMonth === 'All' ? undefined : this.selectedFilterMonth,
      this.selectedYear === 'All' ? undefined : parseInt(this.selectedYear)
    );
  }
  
 

  getMonthFromDate(dateStr: string) {
    // Extract month from date string (e.g., '2024-02-20' => 'February')
    const [year, month, day] = dateStr.split('-');
    return this.monthOptions[parseInt(month, 10)];
  }
  
  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
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


  }


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
  
 
  

 
 
  fetchStatusCounts(year?: number) {
    const apiUrl = `http://localhost:8083/api/training-views/status-counts-by-month?year=${year || new Date().getFullYear()}`;
  
    this.http.get<any>(apiUrl).subscribe(
      (data: any) => {
        // Update the charts with the received data
        this.populateMonthOptions(data);
        this.populateYearOptions(data);
        // Clear previous data
        this.histogramData = [0, 0, 0];
        this.pieData = [0, 0, 0];
        // Combine data for all months or extract data for the selected month
        if (this.selectedMonth === 'All') {
          this.histogramData = this.combineDataForAllMonths(data);
          this.pieData = this.combineDataForAllMonths(data);
        } else {
          const monthData = data[this.selectedMonth] || {}; // Extract data for the selected month
          this.histogramData = this.extractCounts(monthData);
          this.pieData = this.extractCounts(monthData);
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
      completedCount += monthData['Completed'] || 0;
      onGoingCount += monthData['On-Going'] || 0;
      upcomingCount += monthData['Upcoming'] || 0;
    }
  
    return [completedCount, onGoingCount, upcomingCount];
  }
  
  private extractCounts(monthData: any): number[] {
    return [
      monthData['Completed'] || 0,
      monthData['On-Going'] || 0,
      monthData['Upcoming'] || 0,
    ];
  }
  
  private updateCharts() {
    this.chartHistogram.data.datasets[0].data = this.histogramData;
    this.chartHistogram.update();
  
    this.chartPie.data.datasets[0].data = this.pieData;
    this.chartPie.update();
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

  
  
  private populateMonthOptions(response: any) {
    this.monthOptions = ['All']; // Initialize with 'All'
  
    // Extract month names from the response and add them to monthOptions
    for (const monthYear in response) {
      if (response.hasOwnProperty(monthYear)) {
        this.monthOptions.push(monthYear);
      }
    }
  }
  
  
  private populateYearOptions(response: any) {
    this.yearOptions = ['All']; // Initialize with 'All'
  
    // Define the range of years you want to display
    const startYear = 2023; // Start year
    const endYear = new Date().getFullYear(); // End year (current year)
  
    // Add years to yearOptions
    for (let year = endYear; year >= startYear; year--) {
      this.yearOptions.push(year.toString());
    }
  }
  
  
 

onYearChange() {
  if (this.selectedYear === 'All') {
    // Reset the month options and fetch status counts for all years
    this.selectedMonth = 'All'; // Reset selectedMonth
    this.monthOptions = ['All']; // Reset monthOptions
    this.fetchStatusCounts(); // Fetch status counts for all years
  } else {
    // Update the month options based on the selected year
    const selectedYear = parseInt(this.selectedYear);

    // Fetch status counts for the selected year
    this.fetchStatusCounts(selectedYear);

    // Extract months for the selected year from the existing monthOptions
    const yearMonths = this.monthOptions.filter(monthYear => {
      const [month, year] = monthYear.split(' ');
      return parseInt(year) === selectedYear;
    });

    // If no months found for the selected year, display a message or handle as needed
    if (yearMonths.length === 0) {
      // Handle case where no data exists for the selected year
      // For example, display a message or load data for the selected year
    } else {
      // Update monthOptions with the filtered months for the selected year
      this.monthOptions = yearMonths;
      this.monthOptions.unshift('All'); // Add 'All' option at the beginning

      // If the previously selected month is not valid for the newly selected year, reset it to 'All'
      if (!this.monthOptions.includes(this.selectedMonth)) {
        this.selectedMonth = 'All';
      }
    }
  }
}

  onMonthChange() {
    if (this.selectedYear === 'All') {
      // If 'All' years are selected, fetch status counts for the selected month only
      this.fetchStatusCounts();
    } else {
      // If a specific year is selected, fetch status counts for the selected month of that year
      const selectedYear = parseInt(this.selectedYear);
      this.fetchStatusCounts(selectedYear);
    }
  }
  
  
  onFilterChange() {
    this.updateCharts();
  }

 


}
