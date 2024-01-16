import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'app/pages/employee/employee-services/employee.service';
import { UserService } from 'app/pages/login/login.service';
import Chart from 'chart.js';

interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  t_id: string;
  c_name: string;
  t_name: string;
  s_date: string;
  e_date: string;
  status: string;
  enroll: string;
  isEnrolled?: boolean;
  training_id?: string;
  schedule_id?: string;
  emp_id?: string;
}

@Component({
  selector: 'hr-dashboard',
  moduleId: module.id,
  templateUrl: './hr-dashboard.component.html',
})
export class HrDashboardComponent implements OnInit {

  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  enrollmentStatusData: TableRow[] = [];

  currentPage = 1;
  itemsPerPage = 5;

  enrollmentStatusPage = 1;
  enrollmentStatusItemsPerPage = 3;

  confirmationStatusPage = 1;
  confirmationStatusItemsPerPage = 3;

  empId: string;

  
  confirmationStatusData: TableRow[] = [];

  public canvas: any;
  public ctx;
  public chartHistogram;
  public chartPie;
  public selectedMonth: string = 'All';
  public selectedFilter: string = 'all';
  public histogramData: number[] = [0, 0, 0]; // Default data for the histogram chart
  public pieData: number[] = [0, 0, 0]; // Default data for the pie chart
  public monthOptions: string[] = ['All'];

 

  
  constructor(
    private employeeService: EmployeeService,
    private loginService: UserService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router 
  ) {}

  


  ngOnInit(){
    this.initHistogramChart();
    this.initPieChart();
    this.fetchStatusCounts();

    this.route.params.subscribe((params) => {
      this.empId = params['empId'];
      console.log('EmpId:', this.empId);
      this.fetchDataForUser(this.empId);
    });

    this.tableData1 = {
      headerRow: [
        'Sr No.',
        'Course Name',
        'Trainer Name',
        'Start Date',
        'End Date',
        'Status',
        'Enroll',
      ],
      dataRows: [
        {
          t_id: '1',
          c_name: 'Angular',
          t_name: 'Amisha Jangipuria',
          s_date: '29-11-2023',
          e_date: '04-12-2023',
          status: 'Upcoming',
          enroll: 'Enroll',
        },
        {
          t_id: '2',
          c_name: 'Introduction to Web Development',
          t_name: 'John Doe',
          s_date: '30-11-2023',
          e_date: '07-12-2023',
          status: 'Upcoming',
          enroll: 'Enroll',
        },
        {
          t_id: '3',
          c_name: 'Advanced JavaScript',
          t_name: 'Jane Smith',
          s_date: '01-12-2023',
          e_date: '12-12-2023',
          status: 'Upcoming',
          enroll: 'Enroll',
        },
      ],
    };

    this.filteredData = [...this.tableData1.dataRows];
    this.fetchTrainingSchedule();
    this.loadEnrollmentStatusFromLocalStorage();
    this.fetchConfirmationStatusData();
  }

  private fetchStatusCounts() {
    const apiUrl = 'http://localhost:8083/api/training-views/status-counts-by-month';
  
    this.httpClient.get(apiUrl).subscribe(
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

  fetchConfirmationStatusData(): void {
    const empId = this.loginService.getEmpId();
  
    if (!empId) {
      console.error('EmpId not available.');
      return;
    }
  
    this.httpClient.get<any[]>(`http://localhost:8083/api/registrations/details-with-additional/${empId}`).subscribe(
      (data: any[]) => {
        // Filter data based on "trainingStatus" being "Upcoming" or "On-Going"
        const filteredStatusData = data.filter(entry => entry.trainingStatus !== 'Completed');
  
        // Process the filtered data and extract the courseName
        const confirmationStatusData = filteredStatusData.map((entry, index) => ({
          t_id: String(index + 1),
          c_name: entry.courseName,
          t_name: entry.trainerName,
          s_date: entry.startDate,
          e_date: entry.endDate,
          status: entry.status,
          enroll: 'Enroll',
        }));
  
        this.confirmationStatusData = confirmationStatusData;
      },
      (error) => {
        console.error('Error fetching confirmation status data:', error);
      }
    );
  }

  viewConfirmationDetails(courseName: string): void {
    // Navigate to confirmationstatus-details component with the selected courseName
    this.router.navigate(['/confirmationstatus-details', courseName]);
  }

  fetchDataForUser(empId: string): void {
    console.log(`Fetching data for user with empId: ${empId}`);
    // Implement logic to fetch data for the user based on empId
  }

  fetchTrainingSchedule(): void {
    this.employeeService.getTrainingPreDefinedSchedule().subscribe(
      (scheduleData: any[]) => {
        scheduleData.forEach((entry) => {
          console.log(
            `Training ID: ${entry.trainingId}, Schedule ID: ${entry.scheduleId}`
          );
        });

        // const preDefinedSchedules = scheduleData.filter(
        //   (schedule) =>
        //     // schedule.trainingStatus === 'Upcoming'
        // );

        this.tableData1.dataRows = scheduleData.map(
          (schedule, index): TableRow => ({
            t_id: String(index + 1),
            c_name: schedule.course,
            t_name: schedule.trainerName.split('(')[0].trim(),
            s_date: schedule.plannedStartDate
              ? schedule.plannedStartDate.split('T')[0]
              : '',
            e_date: schedule.plannedEndDate
              ? schedule.plannedEndDate.split('T')[0]
              : '',
            status: schedule.trainingStatus,
            enroll: 'Enroll',
            isEnrolled: false,
            training_id: String(schedule.trainingId),
            schedule_id: String(schedule.scheduleId),
            emp_id: String(schedule.empId),
          })
        );

        this.filteredData = [...this.tableData1.dataRows];
      },
      (error) => {
        console.error('Error fetching training schedule data:', error);
      }
    );
  }

  applyFilter(): void {
    this.filteredData = this.tableData1.dataRows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
  }

  enrollButtonClicked(training: TableRow): void {
    const loggedInUserData = this.loginService.getLoggedInUserData();

    if (!loggedInUserData) {
      // Handle the case where user data is not available
      return;
    }

    const empId = loggedInUserData.empId;

    const alreadyEnrolled = this.enrollmentStatusData.some(
      (enrollment) =>
        enrollment.t_id === training.t_id &&
        enrollment.c_name === training.c_name &&
        enrollment.t_name === training.t_name &&
        enrollment.s_date === training.s_date &&
        enrollment.e_date === training.e_date
    );

    if (alreadyEnrolled) {
      alert(`You have already enrolled for ${training.c_name} course.`);
      return;
    }

    const registrationData = {
      schedule_id: training.schedule_id,
      training_id: training.training_id,
      emp_id: empId,
      registration_date: new Date(),
      registration_comments: '',
      registration_status: 'Registered',
      registration_response: '',
    };

    this.employeeService.enrollTraining(registrationData).subscribe(
      (registrationId: number) => {
        console.log(`Enrollment successful. Registration ID: ${registrationId}`);
        alert(
          `Your Enrollment Request has been successfully sent to Reporting Manager for ${training.c_name} course`
        );

        training.isEnrolled = true;

        this.enrollmentStatusData.push({
          t_id: training.t_id,
          c_name: training.c_name,
          t_name: training.t_name,
          s_date: training.s_date,
          e_date: training.e_date,
          status: 'Pending',
          enroll: 'Enroll',
          isEnrolled: true,
          training_id: training.training_id,
          schedule_id: training.schedule_id,
          emp_id: empId,
        });

        this.saveEnrollmentStatusToLocalStorage();
      },
      (error) => {
        console.error('Error enrolling in training:', error);
      }
    );
  }

  changeItemsPerPage(event: any, tableType: string): void {
    if (tableType === 'upcomingCourse') {
      this.itemsPerPage = +event.target.value;
      this.currentPage = 1;
    } else if (tableType === 'enrollmentStatus') {
      this.enrollmentStatusItemsPerPage = +event.target.value;
      this.enrollmentStatusPage = 1;
    } else if (tableType === 'confirmationStatus') {
      this.confirmationStatusItemsPerPage = +event.target.value;
      this.confirmationStatusPage = 1;
    }
  }

  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(
      this.tableData1.dataRows.length / this.itemsPerPage
    );
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  get enrollmentStatusPages(): number[] {
    if (this.enrollmentStatusData.length === 0) {
      return [];
    }
    const pageCount = Math.ceil(
      this.enrollmentStatusData.length / this.enrollmentStatusItemsPerPage
    );
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  get confirmationStatusPages(): number[] {
    if (this.confirmationStatusData.length === 0) {
      return [];
    }
    const pageCount = Math.ceil(
      this.confirmationStatusData.length / this.confirmationStatusItemsPerPage
    );
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  private saveEnrollmentStatusToLocalStorage(): void {
    localStorage.setItem(
      'enrollmentStatusData',
      JSON.stringify(this.enrollmentStatusData)
    );
  }

  private loadEnrollmentStatusFromLocalStorage(): void {
    const storedData = localStorage.getItem('enrollmentStatusData');

    if (storedData) {
      const storedEnrollmentStatus: TableRow[] = JSON.parse(storedData);

      this.tableData1.dataRows.forEach((row) => {
        const matchingStoredEntry = storedEnrollmentStatus.find(
          (storedEntry) =>
            storedEntry.training_id === row.training_id &&
            storedEntry.schedule_id === row.schedule_id
        );

        if (matchingStoredEntry) {
          row.isEnrolled = matchingStoredEntry.isEnrolled;
        }
      });

      this.enrollmentStatusData = storedEnrollmentStatus;
    }
  }




  


  



}