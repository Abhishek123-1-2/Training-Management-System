import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import * as moment from 'moment';

interface TableData {
  headerRow: string[];
  dataRows: {
    emp_code: string;
    emp_name: string;
    status: string;
    attendance: { [date: string]: string };
    
  }[];
}

@Component({
  selector: 'attendance2',
  templateUrl: './attendance2.component.html',
  styleUrls: ['./attendance2.component.scss'],
})
export class Attendance2Component implements OnInit {
  public tableData1: TableData;
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
  


  startEdit(row:any,date:string)
  {
    this.isEdit = true;
    this.editingRow = row;
    console.log(row);
    
    if(date){
      this.editDate = date;
      
    }
  
  }

  cancel()
  {
    this.isEdit = false;
    this.editingRow = null;
    this.editDate = null;
  }

  Edit() 
  {

    this.isEdit = false;
    this.editingRow = null;
    this.editDate = null;
    
  }
 

 
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      this.course_name = params['course_name'];
      this.trainer_name = params['trainer_name'];

      this.fetchList(this.start_date);
    });
  }

  performSearch(): void {
    if (this.searchTerm.trim() === '') {
   
      this.reloadTable();
    } else {
      // Filter the data based on the search term
      this.tableData1.dataRows = this.tableData1.dataRows.filter(row =>
        Object.values(row).some(cell => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }

  

  


  reloadTable()
  {
    this.tableData1.dataRows = [
      {
        emp_code: '3647',
        emp_name: 'Yash Gavanang',
        attendance: {},
        status: 'Ongoing',
        
      }

      
    
    ]

    // this.tableData1.headerRow = this.tableData1.headerRow.slice(0,7);

    // this.showExpandedDates = false;
    
    
  }






  fetchList(start_date: string): void {
    const allDays = this.getAllDatesInRange(start_date, this.end_date);

    this.tableData1 = {
      headerRow: ['Employee Code', 'Employee Name', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status'],
      dataRows: [
        {
          emp_code: '3647',
          emp_name: 'Yash Gavanang',
          attendance: {},
          status: 'Ongoing',
          
          

        }

      ]
    };

    this.tableData1.dataRows.forEach((row) => {
      allDays.forEach((day) => {
        row.attendance[day] = '';
      });
    });
  }

  getAllDatesInRange(startDate, endDate): string[] {
    const dates = [];
    const startDateObj = moment(startDate, 'DD-MM-YYYY');
    const endDateObj = moment(endDate, 'DD-MM-YYYY');
    while (startDateObj.isSameOrBefore(endDateObj)) {
      dates.push(startDateObj.format('DD-MM-YYYY'));
      startDateObj.add(1, 'days');
    }
    return dates;
  }

  toggleExpandedDates(): void 
  {
    if (!this.showExpandedDates) {
      const allDates = this.getAllDatesInRange(this.start_date, this.end_date);
      this.tableData1.headerRow.push(...allDates);
    }
    this.showExpandedDates = true;
  }

  markAttendance(row: any, date: string, status: string): void {
    row.attendance[date] = status;
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

  

