/* attendance-details.component.ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableFilterService } from 'app/pages/admin/filtersearch/filterpipe.component';


interface TableRow {
  no:number;
  emp_code:number;
  emp_name:string;
  total_days_present:number;
  [date:string]:string |number;
}

   interface TableData {
    headerRow: string[];
    dataRows: TableRow[];
  }
  
@Component({
  selector: 'attendance-details-cmp',
  templateUrl: './attendance-details.component.html'
})

export class AttendanceDetailsComponent implements OnInit  {
 public dummyData: any={
  headerRow: ['No.', 'Employee Code', 'Employee Name', 'Total Days Present'],
  dataRows: [
    { no: 1, emp_code: 3639, emp_name: 'Kumar', total_days_present: 0},
    { no: 2, emp_code: 3630, emp_name: 'Yash', total_days_present: 0},
    { no: 3, emp_code: 3634, emp_name: 'Abhisekh', total_days_present: 0 },
    
  ]
};

attendanceDetails:TableRow[]=[];

originalTableData:any[]=[];

  selectedAttendanceId: number = 0; 
  searchText:string='';

  constructor(private route: ActivatedRoute,
    private tableFilterService:TableFilterService
    ) {}

  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const start_date = new Date('2023-11-19');
      const end_date = new Date('2023-12-02');

      const dateRange = this.generateDateRange(start_date, end_date);
      this.dummyData.headerRow = ['No.', 'Employee Code', 'Employee Name', ...dateRange, 'Total Days Present'];

      this.updateTableWithDates(dateRange);

      this.attendanceDetails = this.dummyData.dataRows; // or fetch your data here
    });

    this.fetchTableData();
  }


  fetchTableData() {
    // Simulating data retrieval or initialization
    this.originalTableData = [
      { no: 1, emp_code: 3639, emp_name: 'Kumar', total_days_present: 0,start:'',end:''},
      { no: 2, emp_code: 3630, emp_name: 'Yash', total_days_present: 0,start:'',end:''},
      { no: 3, emp_code: 3634, emp_name: 'Abhisekh', total_days_present: 0,start:'',end:'' },
      
    ]
  
    // Assign originalTableData to tableData2.dataRows
    this.dummyData.dataRows = [...this.originalTableData];
  }


  generateDateRange(start: Date, end: Date): string[] {
    const dates = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
      dates.push(currentDate.toLocaleDateString()); 
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  applyFilter() {
    if (this.searchText.trim() !== '') {
      const filteredData = this.originalTableData.filter(row => {
        return (
          row.no.includes(this.searchText) ||
          row.emp_code.includes(this.searchText) ||
          row.total_days_present.includes(this.searchText) ||
          row.emp_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
                    row.start.includes(this.searchText) ||
                              row.end.includes(this.searchText) 


        );
      });
      this.dummyData.dataRows = filteredData;
    } else {
      this.resetTable();
    }
  }

  onSearchInputChange() {
    if (this.searchText.trim() !== '') {
      const filteredData = this.originalTableData.filter(row => {
        return (
          row.no.includes(this.searchText) ||
          row.emp_code.includes(this.searchText) ||
          row.total_days_present.includes(this.searchText) ||
          row.emp_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          row.start.includes(this.searchText) ||
                              row.end.includes(this.searchText) 
  
          );
      });
      this.dummyData.dataRows = filteredData;
    } else {
      this.resetTable();
    }

  }
  updateTableWithDates(dateRange: string[]) {
    this.dummyData.dataRows.forEach(row => {
      let daysPresent = 0; // Counter for days present
      /* const attendanceData = {
        '2023-11-19': 'P',
        '2023-11-21': 'A',
        '2023-11-23': 'P',
        '2023-11-25': 'A',
        '2023-11-27': 'P',
      }; */

      dateRange.forEach(date => {
        const attendanceStatus = Math.random() < 0.8 ? 'P' : 'A'; // Randomly generate 'P' or 'A' for demo (80% chance of 'P')
        row[date] = attendanceStatus;

        // Update the individual 'total_days_present' property based on attendance status
        if (attendanceStatus === 'P') {
          row.total_days_present = (row.total_days_present || 0) + 1;
        }
      });

      row['Total Days Present'] = row.total_days_present || 0;
      /* row.total_days_present = daysPresent; */ // Also update the individual 'total_days_present' property
    });
  }


  resetTable() {
    this.searchText = '';
    // Reset table to its original state
    this.dummyData = {
      headerRow: ['No.', 'Employee Code', 'Employee Name', 'Total Days Present'],
      dataRows: [
        { no: 1, emp_code: 3639, emp_name: 'Kumar', total_days_present: 0,start:'',end:''},
        { no: 2, emp_code: 3630, emp_name: 'Yash', total_days_present: 0,start:'',end:''},
        { no: 3, emp_code: 3634, emp_name: 'Abhisekh', total_days_present: 0,start:'',end:'' },
        
      ]
    };
  }
}
