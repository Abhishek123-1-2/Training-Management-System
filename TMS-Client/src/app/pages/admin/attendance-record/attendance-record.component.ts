import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface AttendanceRecord {
  date: string;
  status: string;
  edit: string;
  // Add more properties if needed
}

@Component({
  selector: 'attendance-record',
  templateUrl: './attendance-record.component.html',
  styleUrls: ['./attendance-record.component.scss']
})
export class AttendanceRecordComponent implements OnInit {
  emp_code: string;
  c_name: string;
  t_name: string;
  status: string;
  start_date: string;
  end_date: string;
  attendanceDetails: AttendanceRecord[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.emp_code = params['emp_code'];
      this.c_name = params['c_name'];
      this.t_name = params['t_name'];
      this.status = params['status'];
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];

      console.log('Parameters:', params);

      // Fetch attendance details for the specific employee and date range
      this.fetchAttendanceDetails(this.emp_code, this.start_date, this.end_date);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update component data on navigation
      this.updateComponentData();
    });
  }

  private updateComponentData(): void {
    // Fetch updated data, if needed, when navigating back
    this.route.params.subscribe(params => {
      this.emp_code = params['emp_code'];
      this.c_name = params['c_name'];
      this.t_name = params['t_name'];
      this.status = params['status'];
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];

      // Fetch attendance details for the specific employee and date range
      this.fetchAttendanceDetails(this.emp_code, this.start_date, this.end_date);
    });
  }

  fetchAttendanceDetails(empCode: string, startDate: string, endDate: string): void {

    // You need to implement the logic to fetch attendance data from your API or service.
    // For demonstration purposes, I'll use hardcoded data.
    const hardcodedAttendanceData = [];

    this.attendanceDetails = hardcodedAttendanceData;  
  }

  editStatus(record: AttendanceRecord): void {
    // You can implement the logic to open a modal or form for editing the status.
    // For simplicity, let's update the status directly in the component.
    
    const newStatus = prompt('Enter new status:', record.status);

    if (newStatus !== null) {
      // Check if the user clicked cancel or entered a new status
      record.status = newStatus;
      // Optionally, you can save the updated status to your backend/API here.
    }
  }

  addDates(): void {
    const startInput = prompt('Enter start date (DD-MM-YYYY):');
    const endInput = prompt('Enter end date (DD-MM-YYYY):');
  
    if (startInput && endInput) {
      const startDateParts = startInput.split('-');
      const endDateParts = endInput.split('-');
  
      // Check if the input format is correct
      if (startDateParts.length === 3 && endDateParts.length === 3) {
        const startDate = new Date(
          parseInt(startDateParts[2]),
          parseInt(startDateParts[1]) - 1, // Months are zero-based
          parseInt(startDateParts[0])
        );
  
        const endDate = new Date(
          parseInt(endDateParts[2]),
          parseInt(endDateParts[1]) - 1, // Months are zero-based
          parseInt(endDateParts[0])
        );
  
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          // Generate dates between start and end dates
          const newDates = this.getDatesBetween(startDate, endDate);
  
          // Add new dates to the existing attendance details
          this.attendanceDetails = [...this.attendanceDetails, ...newDates];
        } else {
          alert('Invalid date range.');
        }
      } else {
        alert('Invalid date format. Please use DD-MM-YYYY.');
      }
    }
  }  

  private getDatesBetween(startDate: Date, endDate: Date): AttendanceRecord[] {
    const dates: AttendanceRecord[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const year = currentDate.getFullYear();

      const formattedDate = `${day}-${month}-${year}`;
    
      dates.push({ date: formattedDate, status: 'Pending', edit: 'Edit' });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}
