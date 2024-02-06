import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

interface TableData {
  headerRow: string[];
  dataRows: {
    emp_code: string;
    emp_name: string;
    status: string;
    attendance: { [date: string]: string };
  }[];
}

interface EmployeeData {
  empCode: string;
  empName: string;
  plannedStartDate: string;
  plannedEndDate: string;
  trainingStatus: string;
  trainerName: string;
  course: string;
}

@Component({
  selector: 'attendance2',
  templateUrl: './attendance2.component.html',
  styleUrls: ['./attendance2.component.scss'],
})
export class Attendance2Component implements OnInit, AfterViewInit {
  public tableData1: TableData = { headerRow: [], dataRows: [] }; // Initialize tableData1
  start_date: any;
  end_date: any;
  course_name: any;
  trainer_name: any;
  showExpandedDates: boolean = false;
  public searchTerm = '';
  isEdit: boolean = false;
  public editingRow: any;
  public editDate: string | null = null;
  currentPage = 1;
  itemsPerPage = 5;
  editedAttendanceStatus: string = '';
  // Add a flag to track whether expanded dates are added
  private expandedDatesAdded: boolean = false;
  private empId = 3354;
  private scheduleId = 78;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      this.course_name = params['course_name'];
      this.trainer_name = params['trainer_name'];

      // Fetch employee data
      this.fetchEmployeeData(this.start_date);

      // Check if there is data in local storage
      const localStorageData = localStorage.getItem('attendanceData');
      if (localStorageData) {
        // Parse the local storage data and update only dataRows
        const parsedLocalStorageData = JSON.parse(localStorageData);
        this.tableData1.dataRows = parsedLocalStorageData.dataRows;

        // Retrieve attendance status from local storage and update the table data
        this.retrieveAttendanceStatusFromLocalStorage();
      } else {
        this.tableData1.headerRow = ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'];
      }

      // Ensure expanded dates are always shown after initialization
      this.retrieveAndApplyExpandedDates();
    });
    // this.toggleExpandedDates()
  }
  // exportToExcel(): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableData1.dataRows);
  //   const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'AttendanceData');
  //   XLSX.writeFile(workbook, 'attendance_data.xlsx');
  // }
  exportToExcel(): void {
    const attendanceStatus = JSON.parse(localStorage.getItem('attendanceStatus') || '{}');
    const expandedDates = this.getExpandedDatesFromLocalStorage();
  
    // Prepare data for Excel
    const excelData: any[] = [];
    const headerRow = ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status', ...expandedDates];
  
    // Add header row
    excelData.push(headerRow);
  
    // Add data rows
    this.tableData1.dataRows.forEach((row) => {
      const rowData = [
        row.emp_code,
        row.emp_name,
        this.course_name,
        this.trainer_name,
        this.start_date,
        this.end_date,
        row.status,
        ...expandedDates.map(date => attendanceStatus[row.emp_code]?.[date] || '')
      ];
      excelData.push(rowData);
    });
  
    // Create Excel workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
  
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'AttendanceSheet');
  
    // Save workbook to Excel file
    XLSX.writeFile(wb, 'attendance_data.xlsx');
  }
  
  private retrieveAttendanceStatusFromLocalStorage(): void {
    const localStorageKey = 'attendanceStatus';

    // Retrieve existing attendance status from local storage
    const attendanceStatus = JSON.parse(localStorage.getItem(localStorageKey) || '{}');

    // Update the attendance status in dataRows
    this.tableData1.dataRows.forEach((row) => {
      Object.keys(row.attendance).forEach((date) => {
        if (attendanceStatus[row.emp_code] && attendanceStatus[row.emp_code][date]) {
          row.attendance[date] = attendanceStatus[row.emp_code][date];
        }
      });
    });
  }
  ngAfterViewInit(): void {
    // Do nothing here initially
  }

  toggleExpandedDates(): void {
    if (!this.expandedDatesAdded || this.hasDateRangeChanged()) {
      const allDates = this.getAllDatesInRange(this.start_date, this.end_date);
      const expandedDates = this.getExpandedDatesFromLocalStorage();

      // Clear existing expanded dates
      this.tableData1.headerRow = this.tableData1.headerRow.filter((date) => allDates.includes(date));

      // Add dates from local storage
      this.tableData1.headerRow.push(...expandedDates);

      // Remove duplicates
      this.tableData1.headerRow = [...new Set(this.tableData1.headerRow)];

      // Store updated expanded dates separately in local storage
      this.saveExpandedDatesToLocalStorage(allDates);

      // Iterate through dataRows and send attendance for each date
      this.tableData1.dataRows.forEach((row) => {
        allDates.forEach((date) => {
          const status = row.attendance[date] || '';
          this.saveAttendanceInBackend(row, date, status);
        });
      });

      this.storeAttendanceInLocalStorage(); // Save in local storage
      this.expandedDatesAdded = true;
    }
  }

  
  startEdit(row: any, date: string): void {
    this.isEdit = true;
    this.editingRow = row;
    this.editedAttendanceStatus = row.attendance[date]; // Initialize the temporary variable
  
    if (date) {
      this.editDate = date;
    }
  }
  
  cancel(): void {
    this.isEdit = false;
    this.editingRow = null;
    this.editDate = null;
    this.editedAttendanceStatus = ''; // Clear the temporary variable
  }
  
  Edit(row: any, date: string): void {
    if (this.isEdit && this.editingRow && this.editDate) {
      // Find the index of the editingRow in dataRows
      const rowIndex = this.tableData1.dataRows.findIndex((r) => r === this.editingRow);
  
      if (rowIndex !== -1) {
        // Update the attendance data for the specific date
        this.tableData1.dataRows[rowIndex].attendance[this.editDate] = this.editedAttendanceStatus;
        
        // Save the updated data to local storage
        this.storeAttendanceInLocalStorage();
  
        // Update the attendanceStatus in local storage
        this.storeAttendanceStatusInLocalStorage(this.editingRow.emp_code, this.editDate, this.editedAttendanceStatus);
      }
    }
  
    this.isEdit = false;
    this.editingRow = null;
    this.editDate = null;
    this.editedAttendanceStatus = ''; // Clear the temporary variable
  }
  
  private hasDateRangeChanged(): boolean {
    const storedStartDate = moment(this.getExpandedDatesFromLocalStorage()[0]);
    const storedEndDate = moment(this.getExpandedDatesFromLocalStorage().slice(-1)[0]);

    return (
      !moment(this.start_date).isSame(storedStartDate, 'day') ||
      !moment(this.end_date).isSame(storedEndDate, 'day')
    );
  }

  private retrieveAndApplyExpandedDates(): void {
    const expandedDates = this.getExpandedDatesFromLocalStorage();
    this.tableData1.headerRow = [...this.tableData1.headerRow, ...expandedDates];
    this.showExpandedDates = true;
  }

  private getExpandedDatesFromLocalStorage(): string[] {
    const localStorageKey = 'expandedDates';
    const expandedDatesString = localStorage.getItem(localStorageKey) || '[]';
    return JSON.parse(expandedDatesString);
  }

  private saveExpandedDatesToLocalStorage(expandedDates: string[]): void {
    const localStorageKey = 'expandedDates';
    localStorage.setItem(localStorageKey, JSON.stringify(expandedDates));
  }

  
  fetchEmployeeData(start_date: string): void {
    this.http
      .get<EmployeeData[]>(`http://localhost:8083/api/training-views/ongoing-course-details/${this.course_name}/${this.trainer_name}/${this.start_date}/${this.end_date}`)
      .subscribe(
        (data) => {
          const allDays = this.getAllDatesInRange(this.start_date, this.end_date);
  
          this.tableData1 = {
            headerRow: ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
            dataRows: data.map((employee) => ({
              emp_code: employee.empCode,
              emp_name: employee.empName,
              attendance: {},
              status: employee.trainingStatus,
            })),
          };
  
          this.tableData1.dataRows.forEach((row) => {
            allDays.forEach((day) => {
              row.attendance[day] = '';
            });
          });
  
          // Apply expanded dates after fetching employee data
          this.retrieveAndApplyExpandedDates();
        },
        (error) => {
          console.error('Error fetching employee data:', error);
        }
      );
  }
  
  
  performSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.reloadTable();
    } else {
      // Filter the data based on the search term
      this.tableData1.dataRows = this.tableData1.dataRows.filter((row) =>
        Object.values(row).some((cell) => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

  reloadTable(): void {
    // Reset the table data with some sample data for testing
    this.tableData1.dataRows = [
      {
        emp_code: '3647',
        emp_name: 'Yash Gavanang',
        attendance: {},
        status: 'Ongoing',
      },
      // Add more sample data as needed
    ];
  }

  
  markAttendance(row: any, date: string, status: string): void {
    const message = status; // Use the status as the message to be stored
  
    // Update the status in the dataRows array
    const rowIndex = this.tableData1.dataRows.findIndex((r) => r.emp_code === row.emp_code);
    if (rowIndex !== -1) {
      this.tableData1.dataRows[rowIndex].attendance[date] = message;
  
      // Store the attendance status in local storage
      this.storeAttendanceStatusInLocalStorage(row.emp_code, date, message);
    }
  
    // Optional: Save to backend if needed
    this.saveAttendanceInBackend(row, date, status);
  }
  
  
  private storeAttendanceInLocalStorage(): void {
    const localStorageKey = 'attendanceMessage';
  
    // Retrieve existing messages from local storage
    const existingMessages = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
  
    // Add the new message to the array
    existingMessages.push(this.tableData1.dataRows.map(row => row.attendance)); // Assuming you want to store all attendance messages
  
    // Store the updated array in local storage
    localStorage.setItem(localStorageKey, JSON.stringify(existingMessages));
  }
  private storeAttendanceStatusInLocalStorage(empCode: string, date: string, status: string): void {
    const localStorageKey = 'attendanceStatus';
  
    // Retrieve existing attendance status from local storage
    const attendanceStatus = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  
    // Update the attendance status for the specific employee and date
    attendanceStatus[empCode] = attendanceStatus[empCode] || {};
    attendanceStatus[empCode][date] = status;
  
    // Store the updated attendance status in local storage
    localStorage.setItem(localStorageKey, JSON.stringify(attendanceStatus));
  }
  

  
private saveAttendanceInBackend(row: any, date: string, status: string): void {
  const apiUrl = 'http://localhost:8083/api/attendance-register/save';

  // Assuming empId and scheduleId are properties of the class
  this.empId++; // Increment empId
  this.scheduleId++; // Increment scheduleId

  const payload = {
    scheduleId: this.scheduleId,
    empId: this.empId,
    attendanceDate: date,
    attendanceComments: 'Present',
    createdBy: '',
    updatedBy: '',
  };

  this.http.post(apiUrl, payload).subscribe(
    (response) => {
      console.log('Attendance saved successfully:', response);
    },
    (error) => {
      console.error('Error saving attendance:', error);
    }
  );
}

private getNextEmpId(): number {
    // Retrieve the current empId from local storage
    const empId = parseInt(localStorage.getItem('empId') || '0') + 1;

    // Save the updated empId in local storage
    localStorage.setItem('empId', empId.toString());

    return empId;
}

private getNextScheduleId(): number {
    // Retrieve the current scheduleId from local storage
    const scheduleId = parseInt(localStorage.getItem('scheduleId') || '0') + 1;

    // Save the updated scheduleId in local storage
    localStorage.setItem('scheduleId', scheduleId.toString());

    return scheduleId;
}

  getAttendanceStatusFromLocalStorage(empCode: string, date: string): string | null {
    const localStorageKey = 'attendanceStatus';
    const attendanceStatus = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  
    return attendanceStatus[empCode] ? attendanceStatus[empCode][date] || null : null;
  }
  // getAttendanceStatusFromLocalStorage(empCode: string): { [date: string]: string } {
  //   const localStorageKey = 'attendanceStatus';
  //   const attendanceStatus = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  
  //   return attendanceStatus[empCode] || {};
  // }
  
  getAllDatesInRange(startDate, endDate): string[] {
    const dates = [];
    const startDateObj = moment(startDate, 'YYYY-MM-DD');
    const endDateObj = moment(endDate, 'YYYY-MM-DD');

    while (startDateObj.isSameOrBefore(endDateObj)) {
      dates.push(startDateObj.format('YYYY-MM-DD'));
      startDateObj.add(1, 'days');
    }
    return dates;
  }

  get pages(): number[] {
    if (this.tableData1.dataRows.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.tableData1.dataRows.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }
}