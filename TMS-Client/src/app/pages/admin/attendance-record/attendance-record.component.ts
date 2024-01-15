import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Chart } from 'chart.js';

import { HttpClient } from '@angular/common/http';

// interface AttendanceRecord {
//   date: string;
//   status: string;
//   edit: string;
//   // Add more properties if needed
// }

@Component({
  selector: 'attendance-record',
  moduleId: module.id,
  templateUrl: './attendance-record.component.html',
})
export class AttendanceRecordComponent implements OnInit {
  c_name: string;
  empCode: string;
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;
  @Input() employeeData: { sr_no: string; emp_code: string; emp_name: string; start_date: string; end_date: string; status: string; view: string };

  chart: Chart;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.c_name = params['c_name'];
      this.empCode = params['empCode'];
      this.fetchFeedbackDataAndCreateChart();
      // this.fetchEmployeeFeedbackAndCreateChart();
    });
  }
 
  ngAfterViewInit(): void {
    this.fetchFeedbackDataAndCreateChart();
    // this.fetchEmployeeFeedbackAndCreateChart();
    // No need to call fetchFeedbackDataAndCreateChart here since it's now called in ngOnInit
  }

  fetchFeedbackDataAndCreateChart(): void {
    const apiUrl = `http://localhost:8083/api/feedback/retrieve/${this.empCode}/${this.c_name}`;

    this.http.get(apiUrl).subscribe(
      (feedbackData: any[]) => {
        const ratings = feedbackData.map(feedback => ({
          technicalSkillsValue: feedback.technicalSkills,
          graspingPowerValue: feedback.graspingPower,
          proActivenessValue: feedback.proActiveness,
          interestQualityValue: feedback.interestQuality,
          leadershipQualityValue: feedback.leadershipQuality,
          problemSolvingAbilityValue: feedback.problemSolvingAbility,
          smartnessRateValue: feedback.smartnessRate,
          spokenEnglishRateValue: feedback.spokenEnglishRate,
        }));

        this.createChart(ratings);
      },
      (error) => {
        console.error('Error fetching feedback data:', error);
      }
    );
  }
  // fetchEmployeeFeedbackAndCreateChart(): void {
  //   const apiUrl = `http://localhost:8083/api/all-feedback/${this.empCode}/${this.c_name}`;

  //   this.http.get(apiUrl).subscribe(
  //     (employeeFeedback: any[]) => {
  //       const ratings = employeeFeedback.map(feedback => ({
  //         effectiveness: feedback.effectiveness,
  //         content: feedback.content,
  //         methodology: feedback.methodology,
  //         organization: feedback.organization,
  //         trainer_rating: feedback.trainer_rating,
  //         commentsFromEmp: feedback.commentsFromEmp,
  //       }));

  //       this.createChartForEmployeeFeedback(ratings);
  //     },
  //     (error) => {
  //       console.error('Error fetching employee feedback data:', error);
  //     }
  //   );
  // }
  // createChartForEmployeeFeedback(feedbackData: any[]): void {
  //   // Similar logic as createChart method, but customize as needed
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');

  //   // Customize labels, parameters, and other chart settings as needed
  //   const labels = feedbackData.map((_, index) => `Ratings`);
  //   const parameters = Object.keys(feedbackData[0]);

  //   const datasets = parameters.map(param => ({
  //     label: this.getLabelForParameter(param),
  //     data: feedbackData.map(feedback => feedback[param]),
  //     backgroundColor: this.getRandomColor(),
  //     borderColor: this.getRandomColor(),
  //     borderWidth: 1
  //   }));

  //   this.chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: datasets
  //     },
  //     options: {
  //       scales: {
  //         x: {
  //           beginAtZero: true,
  //           ticks: {
  //             stepSize: 1
  //           }
  //         },
  //         y: {
  //           beginAtZero: true,
  //           min: 0,
  //           max: 5,
  //           ticks: {
  //             stepSize: 1,
  //             suggestedMin: 0,
  //             suggestedMax: 5
  //           },
  //           display: true,
  //           title: {
  //             display: true,
  //             text: 'Fields'
  //           }
  //         }
  //       }
  //     }
  //   });
  // }
  createChart(feedbackData: any[]): void {
    const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    const labels = feedbackData.map((_, index) => `Ratings`);
    const parameters = Object.keys(feedbackData[0]);

    const datasets = parameters.map(param => ({
      label: this.getLabelForParameter(param),
      data: feedbackData.map(feedback => feedback[param]),
      backgroundColor: this.getRandomColor(),
      borderColor: this.getRandomColor(),
      borderWidth: 1
    }));

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
              suggestedMin: 0,
              suggestedMax: 5
            },
            display: true,
            title: {
              display: true,
              text: 'Fields'
            }
          }
        }
      }
    });
  }

  
  getLabelForParameter(param: string): string {
    return param.replace('Value', '').replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
  }

  
  
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // emp_code: string;
  // c_name: string;
  // t_name: string;
  // status: string;
  // start_date: string;
  // end_date: string;
  // attendanceDetails: AttendanceRecord[] = [];
  // feedback: any;

  // currentPage = 1;
  // itemsPerPage = 5;


  // get pages(): number[] {
  //   if (this.attendanceDetails.length === 0) {
  //     return [];
  //   }

  //   const pageCount = Math.ceil(this.attendanceDetails.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }


  // changeItemsPerPage(event: any): void {
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = 1; // Reset to the first page when changing items per page
  // }



  // constructor(private route: ActivatedRoute, private router: Router) { }

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     this.emp_code = params['emp_code'];
  //     this.c_name = params['c_name'];
  //     this.t_name = params['t_name'];
  //     this.status = params['status'];
  //     this.start_date = params['start_date'];
  //     this.end_date = params['end_date'];
  //     this.fetchFeedback(this.emp_code);

  //     console.log('Parameters:', params);

  //     // Fetch attendance details for the specific employee and date range
  //     this.fetchAttendanceDetails(this.emp_code, this.start_date, this.end_date);
  //   });

  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     // Update component data on navigation
  //     this.updateComponentData();
  //   });
  // }

  // fetchFeedback(emp_code: string): void {
  //   // Generate or fetch feedback details based on the empCode
  //   // You might want to replace this with your actual logic or service call
  //   this.feedback = this.generateFeedback(emp_code);
  // }

  // generateFeedback(empCode: string): any {
  //   // Example: Mapping empCodes to specific feedback details
  //       const feedbackMapping: { [empCode: string]: any } = {
  //       '3647': {
  //           technical_skills: 4,
  //           grasping_power: 5,
  //           proactiveness: 3,
  //           interest: 4,
  //           leadership_quality: 5,
  //           problem: 5,
  //           effectiveness: 5,
  //           content: 3,
  //           methodology: 4,
  //           organization: 4,
  //           trainer_rating: 5,
  //           comments: 'Concepts were explained very well',
  //           comments1: 'Need to be focused during training',
  //       },
  //       '3646' : {
  //           technical_skills: 4,
  //           grasping_power: 5,
  //           proactiveness: 3,
  //           interest: 4,
  //           leadership_quality: 5,
  //           problem: 5,
  //           comments: 'Excellent grasp of concepts and proactive approach',
  //       },
  //       '3639' : {
  //           technical_skills: 4,
  //           grasping_power: 5,
  //           proactiveness: 3,
  //           interest: 4,
  //           leadership_quality: 5,
  //           problem: 5,
  //           comments: 'Demonstrates strong technical skills and problem-solving abilities',
  //       },
  //       '3364' : {
  //           technical_skills: 4,
  //           grasping_power: 5,
  //           proactiveness: 3,
  //           interest: 4,
  //           leadership_quality: 5,
  //           problem: 5,
  //           comments: 'Shows great interest and leadership qualities; focus on improving problem-solving skills.',
  //       }
  //   }
  //   // Check if there's a specific mapping for the empCode
  //   const specificFeedback = feedbackMapping[empCode];

  //   // If a specific mapping is found, return it; otherwise, return a default feedback
  //   return specificFeedback || this.getDefaultFeedback(empCode);
  // }

  // getDefaultFeedback(empCode: string): any {
  //   // Default feedback for empCodes without specific mappings
  //   return {
  //       technical_skills: 0,
  //       grasping_power: 0,
  //       proactiveness: 0,
  //       interest: 0,
  //       leadership_quality: 0,
  //       problem: 0,
  //       comments: 'None',
  //   };
  // }

  // private updateComponentData(): void {
  //   // Fetch updated data, if needed, when navigating back
  //   this.route.params.subscribe(params => {
  //     this.emp_code = params['emp_code'];
  //     this.c_name = params['c_name'];
  //     this.t_name = params['t_name'];
  //     this.status = params['status'];
  //     this.start_date = params['start_date'];
  //     this.end_date = params['end_date'];

  //     // Fetch attendance details for the specific employee and date range
  //     this.fetchAttendanceDetails(this.emp_code, this.start_date, this.end_date);
  //   });
  // }

  // fetchAttendanceDetails(emp_code: string, startDate: string, endDate: string): void {

  //   const startDateObj = new Date(startDate);
  //   const endDateObj = new Date(endDate);

  //   if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
  //     // Generate dates between start and end dates
  //     this.attendanceDetails = this.getDatesBetween(startDateObj, endDateObj);
  //   }

  //   // You need to implement the logic to fetch attendance data from your API or service.
  //   // For demonstration purposes, I'll use hardcoded data.
  //   const hardcodedAttendanceData = [];

  //   this.attendanceDetails = hardcodedAttendanceData;  
  // }

  // private getDatesBetween(startDate: Date, endDate: Date): AttendanceRecord[] {
  //   const dates: AttendanceRecord[] = [];
  //   let currentDate = new Date(startDate);

  //   while (currentDate <= endDate) {
  //     const day = currentDate.getDate().toString().padStart(2, '0');
  //     const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  //     const year = currentDate.getFullYear();

  //     const formattedDate = `${day}-${month}-${year}`;

  //     dates.push({ date: formattedDate, status: 'Pending', edit: 'Edit' });
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   return dates;
  // }

  // editStatus(record: AttendanceRecord): void {
  //   // You can implement the logic to open a modal or form for editing the status.
  //   // For simplicity, let's update the status directly in the component.
    
  //   const newStatus = prompt('Enter new status:', record.status);

  //   if (newStatus !== null) {
  //     // Check if the user clicked cancel or entered a new status
  //     record.status = newStatus;
  //     // Optionally, you can save the updated status to your backend/API here.
  //   }
  // }

  // addDates(): void {
  //   const startInput = prompt('Enter start date (DD-MM-YYYY):');
  //   const endInput = prompt('Enter end date (DD-MM-YYYY):');
  
  //   if (startInput && endInput) {
  //     const startDateParts = startInput.split('-');
  //     const endDateParts = endInput.split('-');
  
  //     // Check if the input format is correct
  //     if (startDateParts.length === 3 && endDateParts.length === 3) {
  //       const startDate = new Date(
  //         parseInt(startDateParts[2]),
  //         parseInt(startDateParts[1]) - 1, // Months are zero-based 
  //         parseInt(startDateParts[0])
  //       );
  
  //       const endDate = new Date(
  //         parseInt(endDateParts[2]),
  //         parseInt(endDateParts[1]) - 1, // Months are zero-based
  //         parseInt(endDateParts[0])
  //       );
  
  //       if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
  //         // Generate dates between start and end dates
  //         const newDates = this.getDatesBetween(startDate, endDate);
  
  //         // Add new dates to the existing attendance details
  //         this.attendanceDetails = [...this.attendanceDetails, ...newDates];
  //       } else {
  //         alert('Invalid date range.');
  //       }
  //     } else {
  //       alert('Invalid date format. Please use DD-MM-YYYY.');
  //     }
  //   }
  // } 
  
  
}
// import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute } from "@angular/router";
// import { Chart } from 'chart.js';

// import { HttpClient } from '@angular/common/http';
// import { switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'attendance-record',
//   moduleId: module.id,
//   templateUrl: './attendance-record.component.html',
// })
// export class AttendanceRecordComponent implements OnInit {
//   c_name: string;
//   empCode: string;
//   @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;
//   @Input() employeeData: { sr_no: string; emp_code: string; emp_name: string; start_date: string; end_date: string; status: string; view: string };

//   chart: Chart;

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//   ) {}

//   ngOnInit(): void {
//     this.route.params.pipe(
//       switchMap(params => {
//         this.c_name = params['c_name'];
//         this.empCode = params['empCode'];
//         return this.http.get(`http://localhost:8083/api/feedback/retrieve/${this.empCode}/${this.c_name}`);
//       })
//     ).subscribe(
//       (feedbackData: any[]) => {
//         const ratings = feedbackData.map(feedback => ({
//           technicalSkillsValue: feedback.technicalSkills,
//           graspingPowerValue: feedback.graspingPower,
//           proActivenessValue: feedback.proActiveness,
//           interestQualityValue: feedback.interestQuality,
//           leadershipQualityValue: feedback.leadershipQuality,
//           problemSolvingAbilityValue: feedback.problemSolvingAbility,
//           smartnessRateValue: feedback.smartnessRate,
//           spokenEnglishRateValue: feedback.spokenEnglishRate,
//         }));

//         this.createChart(ratings);

//         // Now, fetch and create the employee feedback chart
//         this.fetchEmployeeFeedbackAndCreateChart();
//       },
//       (error) => {
//         console.error('Error fetching feedback data:', error);
//       }
//     );
//   }

//   ngAfterViewInit(): void {
//     // No need to call fetchFeedbackDataAndCreateChart here since it's now called in ngOnInit
//   }

//   fetchEmployeeFeedbackAndCreateChart(): void {
//     const apiUrl = `http://localhost:8083/api/all-feedback/${this.empCode}/${this.c_name}`;

//     this.http.get(apiUrl).subscribe(
//       (employeeFeedback: any[]) => {
//         const ratings = employeeFeedback.map(feedback => ({
//           effectiveness: feedback.effectiveness,
//           content: feedback.content,
//           methodology: feedback.methodology,
//           organization: feedback.organization,
//           trainer_rating: feedback.trainer_rating,
//           commentsFromEmp: feedback.commentsFromEmp,
//         }));

//         this.createChartForEmployeeFeedback(ratings);
//       },
//       (error) => {
//         console.error('Error fetching employee feedback data:', error);
//       }
//     );
//   }

//   createChartForEmployeeFeedback(feedbackData: any[]): void {
//     // Similar logic as createChart method, but customize as needed
//     const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//     const ctx = canvas.getContext('2d');

//     // Customize labels, parameters, and other chart settings as needed
//     const labels = feedbackData.map((_, index) => `Ratings`);
//     const parameters = Object.keys(feedbackData[0]);

//     const datasets = parameters.map(param => ({
//       label: this.getLabelForParameter(param),
//       data: feedbackData.map(feedback => feedback[param]),
//       backgroundColor: this.getRandomColor(),
//       borderColor: this.getRandomColor(),
//       borderWidth: 1
//     }));

//     this.chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: datasets
//       },
//       options: {
//         scales: {
//           x: {
//             beginAtZero: true,
//             ticks: {
//               stepSize: 1
//             }
//           },
//           y: {
//             beginAtZero: true,
//             min: 0,
//             max: 5,
//             ticks: {
//               stepSize: 1,
//               suggestedMin: 0,
//               suggestedMax: 5
//             },
//             display: true,
//             title: {
//               display: true,
//               text: 'Fields'
//             }
//           }
//         }
//       }
//     });
//   }

//   createChart(feedbackData: any[]): void {
//     const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//     const ctx = canvas.getContext('2d');

//     const labels = feedbackData.map((_, index) => `Ratings`);
//     const parameters = Object.keys(feedbackData[0]);

//     const datasets = parameters.map(param => ({
//       label: this.getLabelForParameter(param),
//       data: feedbackData.map(feedback => feedback[param]),
//       backgroundColor: this.getRandomColor(),
//       borderColor: this.getRandomColor(),
//       borderWidth: 1
//     }));

//     this.chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: datasets
//       },
//       options: {
//         scales: {
//           x: {
//             beginAtZero: true,
//             ticks: {
//               stepSize: 1
//             }
//           },
//           y: {
//             beginAtZero: true,
//             min: 0,
//             max: 5,
//             ticks: {
//               stepSize: 1,
//               suggestedMin: 0,
//               suggestedMax: 5
//             },
//             display: true,
//             title: {
//               display: true,
//               text: 'Fields'
//             }
//           }
//         }
//       }
//     });
//   }

//   getLabelForParameter(param: string): string {
//     return param.replace('Value', '').replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
//   }

//   getRandomColor(): string {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
// }
