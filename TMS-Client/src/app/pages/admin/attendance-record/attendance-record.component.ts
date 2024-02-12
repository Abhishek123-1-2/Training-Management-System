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



