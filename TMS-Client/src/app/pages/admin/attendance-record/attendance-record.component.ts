// import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute } from "@angular/router";
// import { Chart } from 'chart.js';

// import { HttpClient } from '@angular/common/http';

// // interface AttendanceRecord {
// //   date: string;
// //   status: string;
// //   edit: string;
// //   // Add more properties if needed
// // }

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
//     this.route.params.subscribe(params => {
//       this.c_name = params['c_name'];
//       this.empCode = params['empCode'];
//       this.fetchFeedbackDataAndCreateChart();
//       // this.fetchEmployeeFeedbackAndCreateChart();
//     });
//   }
 
//   ngAfterViewInit(): void {
//     this.fetchFeedbackDataAndCreateChart();
//     this.fetchEmployeeFeedbackAndCreateChart();
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


import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Chart } from 'chart.js';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'attendance-record',
  moduleId: module.id,
  templateUrl: './attendance-record.component.html',
})
export class AttendanceRecordComponent implements OnInit {
  c_name: string;
  empCode: string;
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('employeeFeedbackChart') employeeFeedbackChart: ElementRef<HTMLCanvasElement>; // Add this line

  @Input() employeeData: { sr_no: string; emp_code: string; emp_name: string; start_date: string; end_date: string; status: string; view: string };

  chart: Chart;
  employeeFeedbackChartInstance: Chart; // Add this line

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
    this.fetchFeedbackDataAndCreateChart();
    this.fetchEmployeeFeedbackAndCreateChart();
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

  fetchEmployeeFeedbackAndCreateChart(): void {
    const apiUrl = `http://localhost:8083/api/all-feedback/${this.empCode}/${this.c_name}`;

    this.http.get(apiUrl).subscribe(
      (employeeFeedback: any[]) => {
        const ratings = employeeFeedback.map(feedback => ({
          effectiveness: feedback.effectiveness,
          content: feedback.content,
          methodology: feedback.methodology,
          organization: feedback.organization,
          trainer_rating: feedback.trainer_rating,
          // commentsFromEmp: feedback.commentsFromEmp,
        }));

        this.createChartForEmployeeFeedback(ratings);
      },
      (error) => {
        console.error('Error fetching employee feedback data:', error);
      }
    );
  }

  createChartForEmployeeFeedback(feedbackData: any[]): void {
    const canvas: HTMLCanvasElement = this.employeeFeedbackChart.nativeElement; // Use the new canvas reference
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

    this.employeeFeedbackChartInstance = new Chart(ctx, {
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
  // createChart(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
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
  //       },
  //       plugins: {
  //         legend: {
  //           display: true,
  //           position: 'top', // You can change the position as needed
  //         }
  //       }
  //     }
  //   });
  // }
  
  // // Inside the createChartForEmployeeFeedback method
  // createChartForEmployeeFeedback(feedbackData: any[]): void {
  //   const canvas: HTMLCanvasElement = this.employeeFeedbackChart.nativeElement;
  //   const ctx = canvas.getContext('2d');
  
  //   const labels = feedbackData.map((_, index) => `Ratings`);
  //   const parameters = Object.keys(feedbackData[0]);
  
  //   const datasets = parameters.map(param => ({
  //     label: this.getLabelForParameter(param),
  //     data: feedbackData.map(feedback => feedback[param]),
  //     backgroundColor: this.getRandomColor(),
  //     borderColor: this.getRandomColor(),
  //     borderWidth: 1
  //   }));
  
  //   this.employeeFeedbackChartInstance = new Chart(ctx, {
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
  //       },
  //       plugins: {
  //         legend: {
  //           display: true,
  //           position: 'top', // You can change the position as needed
  //         }
  //       }
  //     }
  //   });
  // }
  // Inside the createChart method
// createChart(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'), // Change 'vertical' to 'horizontal' if needed
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
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top', // You can change the position as needed
//         }
//       }
//     }
//   });
// }

// // Inside the createChartForEmployeeFeedback method
// createChartForEmployeeFeedback(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.employeeFeedbackChart.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'), // Change 'vertical' to 'horizontal' if needed
//     borderColor: this.getRandomColor(),
//     borderWidth: 1
//   }));

//   this.employeeFeedbackChartInstance = new Chart(ctx, {
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
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top', // You can change the position as needed
//         }
//       }
//     }
//   });
// }
// createChart(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'),
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
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top', // You can change the position as needed
//           labels: {
//             usePointStyle: true,
//             generateLabels: function (chart) {
//               const data = chart.data;
//               if (data.labels.length && data.datasets.length) {
//                 return data.labels.map(function (label, index) {
//                   const dataset = data.datasets[0];
//                   const backgroundColor = dataset.backgroundColor[index];
//                   const borderColor = dataset.borderColor[index];

//                   return {
//                     text: label,
//                     fillStyle: backgroundColor, // Set legend fill color
//                     strokeStyle: borderColor, // Set legend border color
//                     lineWidth: 2, // Set legend border width
//                     hidden: false,
//                     index: index
//                   };
//                 });
//               }
//               return [];
//             }
//           }
//         }
//       }
//     }
//   });
// }

// // createChartForEmployeeFeedback(feedbackData: any[]): void {
// //   const canvas: HTMLCanvasElement = this.employeeFeedbackChart.nativeElement;
// //   const ctx = canvas.getContext('2d');

// //   const labels = feedbackData.map((_, index) => `Ratings`);
// //   const parameters = Object.keys(feedbackData[0]);

// //   const datasets = parameters.map((param, index) => ({
// //     label: this.getLabelForParameter(param),
// //     data: feedbackData.map(feedback => feedback[param]),
// //     backgroundColor: this.getGradient(ctx, index, 'vertical'),
// //     borderColor: this.getRandomColor(),
// //     borderWidth: 1
// //   }));

// //   this.employeeFeedbackChartInstance = new Chart(ctx, {
// //     type: 'bar',
// //     data: {
// //       labels: labels,
// //       datasets: datasets
// //     },
// //     options: {
// //       scales: {
// //         x: {
// //           beginAtZero: true,
// //           ticks: {
// //             stepSize: 1
// //           }
// //         },
// //         y: {
// //           beginAtZero: true,
// //           min: 0,
// //           max: 5,
// //           ticks: {
// //             stepSize: 1,
// //             suggestedMin: 0,
// //             suggestedMax: 5
// //           },
// //           display: true,
// //           title: {
// //             display: true,
// //             text: 'Fields'
// //           }
// //         }
// //       },
// //       plugins: {
// //         legend: {
// //           display: true,
// //           position: 'top', // You can change the position as needed
// //           labels: {
// //             usePointStyle: true,
// //             generateLabels: function (chart) {
// //               const data = chart.data;
// //               if (data.labels.length && data.datasets.length) {
// //                 return data.labels.map(function (label, index) {
// //                   const dataset = data.datasets[0];
// //                   const backgroundColor = dataset.backgroundColor[index];
// //                   const borderColor = dataset.borderColor[index];

// //                   return {
// //                     text: label,
// //                     fillStyle: backgroundColor, // Set legend fill color
// //                     strokeStyle: borderColor, // Set legend border color
// //                     lineWidth: 2, // Set legend border width
// //                     hidden: false,
// //                     index: index
// //                   };
// //                 });
// //               }
// //               return [];
// //             }
// //           }
// //         }
// //       }
// //     }
// //   });
// // }
// createChartForEmployeeFeedback(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.employeeFeedbackChart.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'), // Change 'vertical' to 'horizontal' if needed
//     borderColor: this.getGradient(ctx, index, 'vertical'), // Use the same gradient for borderColor
//     borderWidth: 1
//   }));

//   this.employeeFeedbackChartInstance = new Chart(ctx, {
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
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         }
//       }
//     }
//   });
// }

// For createChart method
// createChart(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'),
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
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         }
//       }
//     }
//   });
// }

// // For createChartForEmployeeFeedback method
// createChartForEmployeeFeedback(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.employeeFeedbackChart.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'),
//     borderColor: this.getGradient(ctx, index, 'vertical'),
//     borderWidth: 1
//   }));

//   this.employeeFeedbackChartInstance = new Chart(ctx, {
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
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         }
//       }
//     }
//   });
// }
// For createChart method
// createChart(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'),
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
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         }
//       }
//     }
//   });
// }

// // For createChartForEmployeeFeedback method
// createChartForEmployeeFeedback(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.employeeFeedbackChart.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'),
//     borderColor: this.getGradient(ctx, index, 'vertical'),
//     borderWidth: 1
//   }));

//   this.employeeFeedbackChartInstance = new Chart(ctx, {
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
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         }
//       }
//     }
//   });
// }
// For createChart method
// createChart(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'),
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
//           max: 5,
//           min: 0,  // Add this line to explicitly set the min value
//           ticks: {
//             stepSize: 1,
//           },
//           display: true,
//           title: {
//             display: true,
//             text: 'Fields'
//           }
//         }
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         }
//       }
//     }
//   });
// }

// // For createChartForEmployeeFeedback method
// createChartForEmployeeFeedback(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.employeeFeedbackChart.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'),
//     borderColor: this.getGradient(ctx, index, 'vertical'),
//     borderWidth: 1
//   }));

//   this.employeeFeedbackChartInstance = new Chart(ctx, {
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
//           max: 5,
//           min: 0,  // Add this line to explicitly set the min value
//           ticks: {
//             stepSize: 1,
//           },
//           display: true,
//           title: {
//             display: true,
//             text: 'Fields'
//           }
//         }
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         }
//       }
//     }
//   });
// }
// For createChart method
// createChart(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'),
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
//           max: 5,
//           ticks: {
//             stepSize: 1,
//           },
//           display: true,
//           title: {
//             display: true,
//             text: 'Fields'
//           }
//         }
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         }
//       },
//       events: ['afterLayout'],
//       afterLayout: (chart) => {
//         chart.options.scales.y.min = 0;
//       },
//     }
//   });
// }

// // For createChartForEmployeeFeedback method
// createChartForEmployeeFeedback(feedbackData: any[]): void {
//   const canvas: HTMLCanvasElement = this.employeeFeedbackChart.nativeElement;
//   const ctx = canvas.getContext('2d');

//   const labels = feedbackData.map((_, index) => `Ratings`);
//   const parameters = Object.keys(feedbackData[0]);

//   const datasets = parameters.map((param, index) => ({
//     label: this.getLabelForParameter(param),
//     data: feedbackData.map(feedback => feedback[param]),
//     backgroundColor: this.getGradient(ctx, index, 'vertical'),
//     borderColor: this.getGradient(ctx, index, 'vertical'),
//     borderWidth: 1
//   }));

//   this.employeeFeedbackChartInstance = new Chart(ctx, {
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
//           max: 5,
//           ticks: {
//             stepSize: 1,
//           },
//           display: true,
//           title: {
//             display: true,
//             text: 'Fields'
//           }
//         }
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         }
//       },
//       events: ['afterLayout'],
//       afterLayout: (chart) => {
//         chart.options.scales.y.min = 0;
//       },
//     }
//   });
// }

// Add this method for creating gradients
// getGradient(ctx: CanvasRenderingContext2D, index: number, direction: 'horizontal' | 'vertical'): CanvasGradient {
//   const gradient = ctx.createLinearGradient(0, 0, direction === 'horizontal' ? 200 : 0, direction === 'horizontal' ? 0 : 200);
//   gradient.addColorStop(0, this.getRandomColor());
//   gradient.addColorStop(1, this.getRandomColor());
//   return gradient;
// }
// getGradient(ctx: CanvasRenderingContext2D, index: number, direction: 'horizontal' | 'vertical'): CanvasGradient {
//   const baseColor = this.getRandomColor(); // Use a single base color

//   const gradient = ctx.createLinearGradient(0, 0, direction === 'horizontal' ? 200 : 0, direction === 'horizontal' ? 0 : 200);
//   gradient.addColorStop(0, baseColor);
//   gradient.addColorStop(1, baseColor);
//   return gradient;
// }
// getGradient(ctx: CanvasRenderingContext2D, index: number, direction: 'horizontal' | 'vertical'): CanvasGradient {
//   const baseColor = this.getRandomColor(); // Use a single base color

//   // Function to lighten or darken a color
//   const adjustColor = (color: string, factor: number): string => {
//     const num = parseInt(color.slice(1), 16);
//     const r = Math.min(255, Math.max(0, (num >> 16) + factor));
//     const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + factor));
//     const b = Math.min(255, Math.max(0, (num & 0x0000FF) + factor));
//     return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
//   };

//   const gradient = ctx.createLinearGradient(0, 0, direction === 'horizontal' ? 200 : 0, direction === 'horizontal' ? 0 : 200);
//   gradient.addColorStop(0, baseColor);
//   gradient.addColorStop(1, adjustColor(baseColor, 20)); // Adjust the factor as needed

//   return gradient;
// }



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
