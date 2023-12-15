import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

declare interface TableData {
  headerRow: string[];
  dataRows: {
    sr_no: string;
    c_name: string;
    view: string;
  }[];
}

interface TableRow {
  sr_no: string;
  c_name: string;
  view: string;
}

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public chartHistogram;
  public chartPie;

  public selectedMonth: string = 'all';
  public selectedFilter: string = 'all';
  public selectedDuration: string = 'all';

    ngOnInit(){
      this.chartColor = "#FFFFFF";

      this.initHistogramChart();
      this.initPieChart();

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          datasets: [{
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
            },
            {
              borderColor: "#fcc468",
              backgroundColor: "#fcc468",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });


      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3],
          datasets: [{
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
    }

    private initHistogramChart() {
      this.canvas = document.getElementById("chartHistogram");
      this.ctx = this.canvas.getContext("2d");

      const data = this.getDataBasedOnMonthAndFilter();
  
      this.chartHistogram = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: ["Completed", "On-going", "Upcoming"],
          datasets: [{
            label: 'Course Data',
            data: [10, 3, 8],
            backgroundColor: ['#6bd098', '#51CACF', '#fcc468'],
            borderWidth: 1
          }]
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [{
              ticks: { beginAtZero: true }
            }]
          }
        }
      });
    }
  
    private initPieChart() {
      this.canvas = document.getElementById("chartPie");
      this.ctx = this.canvas.getContext("2d");

      const data = this.getDataBasedOnMonthAndFilter();
  
      this.chartPie = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ["Completed", "On-going", "Upcoming"],
          datasets: [{
            data: [10, 3, 8],
            backgroundColor: ['#6bd098', '#51CACF', '#fcc468'],
          }]
        },
        options: {
          legend: {
            position: 'right',
          }
        }
      });
    }

    // private getDataBasedOnDuration(): number[] {
    //   // Replace this with actual data retrieval logic based on the selected duration
    //   if (this.selectedDuration === '3months') {
    //     return [5, 2, 8]; // Example data for 3 months
    //   } else if (this.selectedDuration === '6months') {
    //     return [8, 4, 12]; // Example data for 6 months
    //   } else if (this.selectedDuration === 'year') {
    //     return [10, 3, 8]; // Example data for 1 year
    //   } else {
    //     // 'all' or invalid duration, return default data
    //     return [10, 3, 8]; // Example default data
    //   }
    // }

    // private getDataBasedOnDurationAndFilter(): number[] {
    //   // Replace this with actual data retrieval logic based on the selected duration and filter
    //   // Use this.selectedDuration and this.selectedFilter to get the selected values
    //   // Example data for illustration purposes
    //   if (this.selectedFilter === 'completed') {
    //     return [5, 2, 8]; // Example data for completed training
    //   } else {
    //     return [10, 3, 8]; // Example default data
    //   }
    // }

    private getDataBasedOnMonthAndFilter(): number[] {
      // Replace this with actual data retrieval logic based on the selected month and filter
      // Use this.selectedMonth and this.selectedFilter to get the selected values
      // Example data for illustration purposes
      let completedData = 0;
      let onGoingData = 0;
      let upcomingData = 0;

      if (this.selectedMonth === 'all' || this.selectedMonth === 'jan') {
        // Example data for January
        completedData = 5;
        onGoingData = 2;
        upcomingData = 3;
      } else if (this.selectedMonth === 'feb') {
        // Example data for February
        completedData = 7;
        onGoingData = 1;
        upcomingData = 2;
      } else if (this.selectedMonth === 'mar') {
        completedData = 1;
        onGoingData = 2;
        upcomingData = 4;
      } else if (this.selectedMonth === 'apr') {
        completedData = 5;
        onGoingData = 5;
        upcomingData = 3;
      } else if (this.selectedMonth === 'may') {
        completedData = 7;
        onGoingData = 4;
        upcomingData = 3;
      } else if (this.selectedMonth === 'jun') {
        completedData = 2;
        onGoingData = 5;
        upcomingData = 4;
      } else if (this.selectedMonth === 'jul') {
        completedData = 4;
        onGoingData = 3;
        upcomingData = 2;
      } else if (this.selectedMonth === 'aug') {
        completedData = 3;
        onGoingData = 5;
        upcomingData = 3;
      } else if (this.selectedMonth === 'sep') {
        completedData = 8;
        onGoingData = 4;
        upcomingData = 1;
      } else if (this.selectedMonth === 'oct') {
        completedData = 6;
        onGoingData = 4;
        upcomingData = 0;
      } else if (this.selectedMonth === 'nov') {
        completedData = 3;
        onGoingData = 5;
        upcomingData = 7;
      } else if (this.selectedMonth === 'dec') {
        completedData = 9;
        onGoingData = 3;
        upcomingData = 0;
      }
      // Add similar blocks for each month
  
      if (this.selectedFilter === 'completed') {
        return [completedData, 0, 0]; // Example data for completed training
      } else {
        return [completedData, onGoingData, upcomingData]; // Example default data
      }



      // if (this.selectedFilter === 'completed') {
      //   return [5, 0, 0]; // Example data for completed training
      // } else {
      //   return [10, 3, 8]; // Example default data
      // }
    }

    onMonthChange() {
      // Update charts based on the selected month and filter
      this.updateCharts();
    }



    // onDurationChange() {
    //   // Update charts based on the selected duration
    //   this.updateCharts();
    // }

    // Handle filter changes
  onFilterChange() {
    // Update charts based on the selected duration and filter
    this.updateCharts();
  }

    private updateCharts() {
      // Example: Update histogram chart
      const histogramData = this.getDataBasedOnMonthAndFilter();
      this.chartHistogram.data.datasets[0].data = histogramData;
      this.chartHistogram.update();
  
      // Example: Update pie chart
      const pieData = this.getDataBasedOnMonthAndFilter();
      this.chartPie.data.datasets[0].data = pieData;
      this.chartPie.update();
    }
}
