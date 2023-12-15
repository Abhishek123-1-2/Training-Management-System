/* feedback-form.component.ts  */
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit,AfterViewInit {
  technicalSkillsValue: number = 0;
  graspingPowerValue: number = 0;
  proActivenessValue: number = 0;
  interestQualityValue: number = 0;
  leadershipQualityValue: number = 0;
  problemSolvingAbilityValue: number = 0;
  commentsFromTrainerValue: number = 0;

  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;; // Reference to the canvas element

  constructor() { }

  // Define an object to store chart instances
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

          /* x: {
            beginAtZero: true,
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1
            }
          }, */

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

}
