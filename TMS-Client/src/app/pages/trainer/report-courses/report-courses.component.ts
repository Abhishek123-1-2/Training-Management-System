import { Component, ViewChild, ElementRef, AfterViewInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Chart from 'chart.js';

@Component({
  selector: 'report-courses',
  moduleId: module.id,
  templateUrl: 'report-courses.component.html',
})

export class ReportOfCoursesComponent implements AfterViewInit {
  c_name: string;
  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;
  @Input() employeeData: { sr_no: string; emp_code: string; emp_name: string; start_date: string; end_date: string; status: string; view: string };

  chart: Chart; // Define an object to store chart instances

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.c_name = params['c_name'];
    })
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    const labels = ['Technical Skills', 
    'Grasping Power', 
    'Pro-Activeness', 
    'Interest Rate', 
    'Leadership Quality', 
    'Problem Solving Ability'];


    const dummyData = this.generateDummyData();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Courses',
            data: dummyData,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 2)',
              'rgba(255, 206, 86, 3)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 3)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,15,64,1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 15, 64, 1)',
            ],
            borderWidth: 1
          }
        ]
      },
      options: {        
        scales: {
            x: {
                beginAtZero: true, // Ensure x-axis starts at 0
                ticks: {
                  stepSize: 1
                }
            },

          y: {
            beginAtZero:true,
            min:0,
            max:5,
            ticks: {
              stepSize: 1,
              suggestedMin: 0, // Force y-axis to start at 0
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


 // Function to generate dummy data for each employee
  generateDummyData(): number[] {
    return [
      this.getRandomRating(),
      this.getRandomRating(),
      this.getRandomRating(),
      this.getRandomRating(),
      this.getRandomRating(),
      this.getRandomRating()
    ];
  }

  getRandomRating(): number {
    return Math.floor(Math.random() * 5) + 1; // Generates random number between 1 and 5 for ratings
  }
}

/* feedback-form.component.ts  */
/* import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'trainer-report-',
  moduleId:module.id,
  templateUrl: 'report.component.html',
  
})
export class ReportComponent implements OnInit,AfterViewInit {
    
  technicalSkillsValue: number = 0;
  graspingPowerValue: number = 0;
  proActivenessValue: number = 0;
  interestQualityValue: number = 0;
  leadershipQualityValue: number = 0;
  problemSolvingAbilityValue: number = 0;
  commentsFromTrainerValue: number = 0;

  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>; 
  constructor() { }

  
  chart: Chart;

  ngAfterViewInit(): void {
    this.createChart();
    
  }

  createChart(): void {
    const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Technical Skills',
          'Grasping Power',
          'Pro-Activeness',
          'Interest Rate',
          'Leadership Quality',
          'Problem Solving Ability'
        ],
        datasets: [
          {
            label: 'Rating',
            data: [
              this.technicalSkillsValue,
              this.graspingPowerValue,
              this.proActivenessValue,
              this.interestQualityValue,
              this.leadershipQualityValue,
              this.problemSolvingAbilityValue
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 2)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 2)',
              'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
         y: {
          beginAtZero: true,
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1
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



  ngOnInit(): void {
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = [
        this.technicalSkillsValue,
        this.graspingPowerValue,
        this.proActivenessValue,
        this.interestQualityValue,
        this.leadershipQualityValue,
        this.problemSolvingAbilityValue
      ];
      this.chart.update();
    }
  }

  updateRating(inputId: string, displayProperty: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    this[displayProperty] = +inputElement.value;
    this.updateChart();
  }



} */

