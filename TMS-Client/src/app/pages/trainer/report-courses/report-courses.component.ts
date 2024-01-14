// import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import Chart from 'chart.js';
// import { FeedbackService } from "../trainer-services/feedback.service";
// import { DataService } from "../trainer-services/data.service";

// @Component({
//   selector: 'report-courses',
//   moduleId: module.id,
//   templateUrl: 'report-courses.component.html',
// })

// export class ReportOfCoursesComponent implements AfterViewInit,OnInit {
//   c_name: string;
//   @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;
//   @Input() employeeData: { sr_no: string; emp_code: string; emp_name: string; start_date: string; end_date: string; status: string; view: string };

//   chart: Chart; // Define an object to store chart instances

//   constructor(private route: ActivatedRoute,
//     private feedbackService:FeedbackService,
//     private dataService:DataService
//     ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.c_name = params['c_name'];
//     })
//   }

//   ngAfterViewInit(): void {
//     this.fetchFeedbackDataAndCreateChart();
//   }


// fetchFeedbackDataAndCreateChart(): void {
//   this.feedbackService.getFeedback().subscribe(
//     (feedbackData: any) => {
//       const ratings = [
//         feedbackData.technicalSkillsValue,
//         feedbackData.graspingPowerValue,
//         feedbackData.proActivenessValue,
//         feedbackData.interestQualityValue,
//         feedbackData.leadershipQualityValue,
//         feedbackData.problemSolvingAbilityValue,
//         feedbackData.smartnessRateValue,
//         feedbackData.spokenEnglishRateValue
//       ];

//       this.createChart(ratings);
//     },
//     (error) => {
//       console.error('Error fetching feedback data:', error);
//     }
//   );
// }

// createChart(ratings: number[]): void {
//   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//   const ctx = canvas.getContext('2d');

// const labels = [
// 'Technical Skills', 
// 'Grasping Power', 
// 'Pro-Activeness', 
// 'Interest Rate', 
// 'Leadership Quality', 
// 'Problem Solving Ability',
// 'Smartness Rate',
// 'English Spoken Rate'
// ];

//     this.chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: 'Courses',
//             data: ratings,
//             backgroundColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 2)',
//               'rgba(255, 206, 86, 3)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 3)',
//               'rgba(255, 159, 64, 1)',
//               'rgba(255,15,64,1)',
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//               'rgba(255, 159, 64, 1)',
//               'rgba(255, 15, 64, 1)',
//             ],
//             borderWidth: 1
//           }
//         ]
//       },
//       options: {        
//         scales: {
//             x: {
//                 beginAtZero: true, // Ensure x-axis starts at 0
//                 ticks: {
//                   stepSize: 1
//                 }
//             },

//           y: {
//             beginAtZero:true,
//             min:0,
//             max:5,
//             ticks: {
//               stepSize: 1,
//               suggestedMin: 0, // Force y-axis to start at 0
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


 
// }
// import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import Chart from 'chart.js';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'report-courses',
//   moduleId: module.id,
//   templateUrl: 'report-courses.component.html',
// })
// export class ReportOfCoursesComponent implements AfterViewInit, OnInit {
//   c_name: string;
//   @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;
//   @Input() employeeData: { sr_no: string; emp_code: string; emp_name: string; start_date: string; end_date: string; status: string; view: string };

//   chart: Chart; // Define an object to store chart instances

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.c_name = params['c_name'];
//     });
//   }

//   ngAfterViewInit(): void {
//     this.fetchFeedbackDataAndCreateChart();
//   }

//   fetchFeedbackDataAndCreateChart(): void {
//     const apiUrl = 'http://localhost:8083/api/feedback/retrieve';
  
//     this.http.get(apiUrl).subscribe(
//       (feedbackData: any[]) => {
//         console.log('API Response:', feedbackData);
  
//         // Extract ratings from the response data
//         const ratings = feedbackData.map(feedback => feedback.technicalSkills);
//         console.log('Ratings:', ratings); // Log the ratings array
  
//         this.createChart(ratings);
//       },
//       (error) => {
//         console.error('Error fetching feedback data:', error);
//       }
//     );
//   }
  
  
//   createChart(ratings: number[]): void {
//     const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//     const ctx = canvas.getContext('2d');

//     const labels = [
//       'Technical Skills',
//       'Grasping Power',
//       'Pro-Activeness',
//       'Interest Rate',
//       'Leadership Quality',
//       'Problem Solving Ability',
//       'Smartness Rate',
//       'English Spoken Rate'
//     ];

//     this.chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: 'Courses',
//             data: ratings,
//             backgroundColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 2)',
//               'rgba(255, 206, 86, 3)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 3)',
//               'rgba(255, 159, 64, 1)',
//               'rgba(255,15,64,1)',
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//               'rgba(255, 159, 64, 1)',
//               'rgba(255, 15, 64, 1)',
//             ],
//             borderWidth: 1
//           }
//         ]
//       },
//       options: {
//         scales: {
//           x: {
//             beginAtZero: true, // Ensure x-axis starts at 0
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
//               suggestedMin: 0, // Force y-axis to start at 0
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
// }

// import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import Chart from 'chart.js';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'report-courses',
//   moduleId: module.id,
//   templateUrl: 'report-courses.component.html',
// })
// export class ReportOfCoursesComponent implements AfterViewInit, OnInit {
//   c_name: string;
//   @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;
//   @Input() employeeData: { sr_no: string; emp_code: string; emp_name: string; start_date: string; end_date: string; status: string; view: string };

//   chart: Chart; // Define an object to store chart instances

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.c_name = params['c_name'];
//     });
//   }

//   ngAfterViewInit(): void {
//     this.fetchFeedbackDataAndCreateChart();
//   }

//   fetchFeedbackDataAndCreateChart(): void {
//     const apiUrl = 'http://localhost:8083/api/feedback/retrieve';

//     this.http.get(apiUrl).subscribe(
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
//       },
//       (error) => {
//         console.error('Error fetching feedback data:', error);
//       }
//     );
//   }

//   createChart(feedbackData: any[]): void {
//     const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//     const ctx = canvas.getContext('2d');

//     const labels = feedbackData.map((_, index) => `Emp ${index + 1}`);
//     const parameters = Object.keys(feedbackData[0]);

//     const datasets = parameters.map(param => ({
//       label: param.replace('Value', ''),
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

//   // Helper function to generate random colors
//   getRandomColor(): string {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
// }
// import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import Chart from 'chart.js';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'report-courses',
//   moduleId: module.id,
//   templateUrl: 'report-courses.component.html',
// })
// export class ReportOfCoursesComponent implements AfterViewInit, OnInit {
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
//     this.route.params.subscribe(params => {
//       this.c_name = params['c_name'];
//       this.empCode = params['empCode'];
//       this.fetchFeedbackDataAndCreateChart();
//     });
//   }

//   ngAfterViewInit(): void {
//     // No need to call fetchFeedbackDataAndCreateChart here since it's now called in ngOnInit
//   }

//   fetchFeedbackDataAndCreateChart(): void {
//     const apiUrl = `http://localhost:8083/api/feedback/retrieve?empCode=${this.empCode}&courseName=${this.c_name}`;

//     this.http.get(apiUrl).subscribe(
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
//       },
//       (error) => {
//         console.error('Error fetching feedback data:', error);
//       }
//     );
//   }

//   createChart(feedbackData: any[]): void {
//     const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//     const ctx = canvas.getContext('2d');

//     const labels = feedbackData.map((_, index) => `Emp ${index + 1}`);
//     const parameters = Object.keys(feedbackData[0]);

//     const datasets = parameters.map(param => ({
//       label: param.replace('Value', ''),
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

//   getRandomColor(): string {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
// }

// import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import Chart from 'chart.js';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'report-courses',
//   moduleId: module.id,
//   templateUrl: 'report-courses.component.html',
// })
// export class ReportOfCoursesComponent implements AfterViewInit, OnInit {
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
//     this.route.params.subscribe(params => {
//       this.c_name = params['c_name'];
//       this.empCode = params['empCode'];
//       this.fetchFeedbackDataAndCreateChart();
//     });
//   }

//   ngAfterViewInit(): void {
//     // No need to call fetchFeedbackDataAndCreateChart here since it's now called in ngOnInit
//   }

//   fetchFeedbackDataAndCreateChart(): void {
//     const apiUrl = `http://localhost:8083/api/feedback/retrieve/${this.empCode}/${this.c_name}`;

//     this.http.get(apiUrl).subscribe(
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
//       },
//       (error) => {
//         console.error('Error fetching feedback data:', error);
//       }
//     );
//   }

//   createChart(feedbackData: any[]): void {
//     const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//     const ctx = canvas.getContext('2d');

//     const labels = feedbackData.map((_, index) => `Ratings`);
//     const parameters = Object.keys(feedbackData[0]);

//     const datasets = parameters.map(param => ({
//       label: param.replace('Value', ''),
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

//   getRandomColor(): string {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
// }
import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Chart } from 'chart.js';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'report-courses',
  moduleId: module.id,
  templateUrl: 'report-courses.component.html',
})
export class ReportOfCoursesComponent implements AfterViewInit, OnInit {
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
    });
  }

  ngAfterViewInit(): void {
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
  // fetchFeedbackDataAndCreateChart(): void {
  //   const apiUrl = `http://localhost:8083/api/feedback/retrieve/${this.empCode}/${this.c_name}`;
  
  //   this.http.get(apiUrl).subscribe(
  //     (feedbackData: any[]) => {
  //       const parameters = Object.keys(feedbackData[0]);
  
  //       const datasets = parameters.map(param => ({
  //         label: this.getLabelForParameter(param),
  //         data: feedbackData.map(feedback => feedback[param]),
  //         backgroundColor: this.getRandomColor(),
  //         borderColor: this.getRandomColor(),
  //         borderWidth: 1
  //       }));
  
  //       this.createChart(datasets);
  //     },
  //     (error) => {
  //       console.error('Error fetching feedback data:', error);
  //     }
  //   );
  // }
  
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');

  //   const labels = feedbackData.map((_, index) => `Emp ${index + 1}`);
  //   const parameters = Object.keys(feedbackData[0]);

  //   const datasets = parameters.map(param => ({
  //     label: param.replace('Value', ''),
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
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   const parameters = Object.keys(feedbackData[0]);
  
  //   // Transpose the data to organize it by parameters
  //   const transposedData = parameters.map(param =>
  //     feedbackData.map(feedback => feedback[param])
  //   );
  
  //   const datasets = parameters.map((param, index) => ({
  //     label: this.getLabelForParameter(param),
  //     data: transposedData[index],
  //     backgroundColor: this.getRandomColor(),
  //     borderColor: this.getRandomColor(),
  //     borderWidth: 1
  //   }));
  
  //   this.chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: feedbackData.map((_, index) => `Ratings`),
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
  //             min: 0,
  //             max: 5
  //           },
  //           display: true,
  //           title: {
  //             display: true,
  //             text: 'Fields'
  //           }
  //         }
  //       },
  //       plugins: {
  //         datalabels: {
  //           anchor: 'end',
  //           align: 'end',
  //           display: 'auto',
  //           color: 'black',
  //           font: {
  //             weight: 'bold'
  //           },
  //           formatter: (value, context) => {
  //             return value; // Display the value on top of each bar
  //           }
  //         }
  //       }
  //     }
  //   });
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   const parameters = Object.keys(feedbackData[0]);
  
  //   // Transpose the data to organize it by parameters
  //   const transposedData = parameters.map(param =>
  //     feedbackData.map(feedback => feedback[param])
  //   );
  
  //   const datasets = parameters.map((param, index) => ({
  //     label: this.getLabelForParameter(param),
  //     data: transposedData[index],
  //     backgroundColor: this.getRandomColor(),
  //     borderColor: this.getRandomColor(),
  //     borderWidth: 1
  //   }));
  
  //   this.chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: feedbackData.map((_, index) => `Ratings`),
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
  //           ticks: {
  //             stepSize: 1,
  //             min: 0 as any, // Cast to any to avoid TypeScript errors
  //             max: 5 as any // Cast to any to avoid TypeScript errors
  //           },
  //           display: true,
  //           title: {
  //             display: true,
  //             text: 'Fields'
  //           }
  //         }
  //       },
  //       plugins: {
  //         datalabels: {
  //           anchor: 'end',
  //           align: 'end',
  //           display: 'auto',
  //           color: 'black',
  //           font: {
  //             weight: 'bold'
  //           },
  //           formatter: (value, context) => {
  //             return value; // Display the value on top of each bar
  //           }
  //         }
  //       }
  //     }
  //   });
  // }
  createChart(feedbackData: any[]): void {
    const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    const labels = feedbackData.map((_, index) => `Emp ${index + 1}`);
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
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
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
  //       labels: parameters.map(param => this.getLabelForParameter(param)),
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
  // createChart(datasets: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   this.chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: datasets[0].data.map((_, index) => `Emp ${index + 1}`),
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
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   const parameters = Object.keys(feedbackData[0]);
  
  //   // Transpose the data to organize it by parameters
  //   const transposedData = parameters.map(param =>
  //     feedbackData.map(feedback => feedback[param])
  //   );
  
  //   const datasets = parameters.map((param, index) => ({
  //     label: this.getLabelForParameter(param),
  //     data: transposedData[index],
  //     backgroundColor: this.getRandomColor(),
  //     borderColor: this.getRandomColor(),
  //     borderWidth: 1
  //   }));
  
  //   this.chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: feedbackData.map((_, index) => `Ratings`),
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
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   const parameters = Object.keys(feedbackData[0]);
  
  //   // Transpose the data to organize it by parameters
  //   const transposedData = parameters.map(param =>
  //     feedbackData.map(feedback => feedback[param])
  //   );
  
  //   const datasets = parameters.map((param, index) => ({
  //     label: this.getLabelForParameter(param),
  //     data: transposedData[index],
  //     backgroundColor: this.getRandomColor(),
  //     borderColor: this.getRandomColor(),
  //     borderWidth: 1
  //   }));
  
  //   this.chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: feedbackData.map((_, index) => `Ratings`),
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
  
  getLabelForParameter(param: string): string {
    return param.replace('Value', '').replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
  }

  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   const labels = [
  //     'Technical Skills',
  //     'Grasping Power',
  //     'Pro-Activeness',
  //     'Interest Rate',
  //     'Leadership Quality',
  //     'Problem Solving Ability',
  //     'Smartness Rate',
  //     'English Spoken Rate'
  //   ];
  
  //   const datasets = labels.map((label, index) => ({
  //     label: label,
  //     data: feedbackData.map(feedback => feedback[`${labels[index]}Value`]),
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 1)',
  //       'rgba(54, 162, 235, 2)',
  //       'rgba(255, 206, 86, 3)',
  //       'rgba(75, 192, 192, 1)',
  //       'rgba(153, 102, 255, 3)',
  //       'rgba(255, 159, 64, 1)',
  //       'rgba(255,15,64,1)',
  //     ],
  //     borderColor: [
  //       'rgba(255, 99, 132, 1)',
  //       'rgba(54, 162, 235, 1)',
  //       'rgba(255, 206, 86, 1)',
  //       'rgba(75, 192, 192, 1)',
  //       'rgba(153, 102, 255, 1)',
  //       'rgba(255, 159, 64, 1)',
  //       'rgba(255, 15, 64, 1)',
  //     ],
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
  //           beginAtZero: true, // Ensure x-axis starts at 0
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
  //             suggestedMin: 0, // Force y-axis to start at 0
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
  
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   const labels = Object.keys(feedbackData[0]);
  //   const parameters = labels.map(param => param.replace('Value', ''));
  
  //   const datasets = parameters.map(param => ({
  //     label: param,
  //     data: feedbackData.map(feedback => feedback[param + 'Value']),
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
  
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   const parameters = Object.keys(feedbackData[0]);
  //   const labels = parameters.map(param => param.replace('Value', ''));
  
  //   const datasets = parameters.map(param => ({
  //     label: param.replace('Value', ''),
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
  // fetchFeedbackDataAndCreateChart(): void {
  //   const apiUrl = `http://localhost:8083/api/feedback/retrieve/${this.empCode}/${this.c_name}`;
  
  //   this.http.get(apiUrl).subscribe(
  //     (feedbackData: any[]) => {
  //       const parameters = Object.keys(feedbackData[0]);
  
  //       // Create separate datasets for each rating
  //       const datasets = parameters.map(param => ({
  //         label: param.replace('Value', ''),
  //         data: feedbackData.map(feedback => feedback[param]),
  //         backgroundColor: this.getRandomColor(),
  //         borderColor: this.getRandomColor(),
  //         borderWidth: 1
  //       }));
  
  //       this.createChart(datasets);
  //     },
  //     (error) => {
  //       console.error('Error fetching feedback data:', error);
  //     }
  //   );
  // }
  
  // createChart(datasets: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   this.chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'], // You can customize these labels
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
  
  // fetchFeedbackDataAndCreateChart(): void {
  //   const apiUrl = `http://localhost:8083/api/feedback/retrieve/${this.empCode}/${this.c_name}`;
  
  //   this.http.get(apiUrl).subscribe(
  //     (feedbackData: any[]) => {
  //       this.createChart(feedbackData);
  //     },
  //     (error) => {
  //       console.error('Error fetching feedback data:', error);
  //     }
  //   );
  // }
  
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   const labels = feedbackData.map((_, index) => `Emp ${index + 1}`);
  //   const parameters = Object.keys(feedbackData[0]).filter(key => key.endsWith('Value'));
  
  //   const datasets = parameters.map(param => ({
  //     label: param.replace('Value', ''),
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
  
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
