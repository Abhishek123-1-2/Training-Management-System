import { Component, OnInit } from '@angular/core';
import { EmployeeService,PerformanceData } from '../employee-services/employee.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'performance-dashboard-cmp',
  moduleId:module.id,
  templateUrl: 'performance.component.html',
})
export class PerformanceDashboardComponent implements OnInit {
  performanceData: PerformanceData[] = [];
  progressChart: any;
  achievementsChart: any;

  constructor(private dataService: EmployeeService) {}

  ngOnInit(): void {
    this.dataService.getPerformanceData().subscribe(data => {
      this.performanceData = data;
      this.renderCharts();
    });
  }

  renderCharts() {
    this.renderProgressChart();
    this.renderAchievementsChart();
  }

  renderProgressChart() {
    const ctx = document.getElementById('progressChart');
    this.progressChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.performanceData.map(item => item.courseName),
        datasets: [{
          label: 'Progress',
          data: this.performanceData.map(item => item.progress),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100
            }
          }]
        }
      }
    });
  }

  renderAchievementsChart() {
    const ctx = document.getElementById('achievementsChart');
    this.achievementsChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.performanceData.map(item => item.courseName),
        datasets: [{
          label: 'Achievements',
          data: this.performanceData.map(item => item.achievements),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
            // Add more colors as needed
          ]
        }]
      }
    });
  }
}
