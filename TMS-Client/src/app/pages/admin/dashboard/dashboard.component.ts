import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartHistogram;
  public chartPie;
  public selectedMonth: string = 'All';
  public selectedFilter: string = 'all';
  public histogramData: number[] = [0, 0, 0]; // Default data for the histogram chart
  public pieData: number[] = [0, 0, 0]; // Default data for the pie chart
  public monthOptions: string[] = ['All'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initHistogramChart();
    this.initPieChart();
    this.fetchStatusCounts();
  }

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
