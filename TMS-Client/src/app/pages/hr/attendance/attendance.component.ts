import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare interface TableData
{
  headerRow: string[],
  dataRows: {
    sr_no: string;
    c_name: string;
    t_name: string;
    status: string;
    s_date: string;
    e_date: string;
    v_attendees: string;
  }[];
}


@Component({
  selector: 'attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {


  tableData1: TableData;

  public searchTerm = '';


  constructor(private router: Router) { }

  currentPage = 1;
  itemsPerPage = 5;

  performSearch(): void {
    if (this.searchTerm.trim() === '') {
   
      this.reloadTable();
    } else {
      this.tableData1.dataRows = this.tableData1.dataRows.filter(row =>
        Object.values(row).some(cell => cell.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
  }
  reloadTable(): void {
    this.tableData1.dataRows = [
      { sr_no: '1', c_name: 'Angular', t_name: 'Amisha', s_date: '30-11-2023', e_date: '12-12-2023', status: 'Ongoing', v_attendees: 'View' },
      { sr_no: '2', c_name: 'computer', t_name: 'Abel', s_date: '2-11-2023', e_date: '6-11-2023', status: 'Ongoing', v_attendees: 'View' },
      { sr_no: '3', c_name: 'React', t_name: 'Alice Smith', s_date: '10-12-2023', e_date: '20-12-2023', status: 'Ongoing', v_attendees: 'View' },
      { sr_no: '4', c_name: 'Python', t_name: 'Bob Johnson', s_date: '15-12-2023', e_date: '25-12-2023', status: 'Ongoing', v_attendees: 'View' },
      { sr_no: '5', c_name: 'Java', t_name: 'Charlie Brown', s_date: '18-12-2023', e_date: '28-12-2023', status: 'Ongoing', v_attendees: 'View' },
      { sr_no: '6', c_name: 'HTML/CSS', t_name: 'Eva Davis', s_date: '22-12-2023', e_date: '01-01-2024', status: 'Ongoing', v_attendees: 'View' },
      { sr_no: '7', c_name: 'Machine Learning', t_name: 'Frank White', s_date: '02-01-2024', e_date: '12-01-2024', status: 'Ongoing', v_attendees: 'View' },
      { sr_no: '8', c_name: 'Docker', t_name: 'Grace Thompson', s_date: '10-01-2024', e_date: '20-01-2024', status: 'Ongoing', v_attendees: 'View' },
      { sr_no: '9', c_name: 'Vue.js', t_name: 'Harry Johnson', s_date: '15-01-2024', e_date: '25-01-2024', status: 'Ongoing', v_attendees: 'View' },
      { sr_no: '10', c_name: 'SQL', t_name: 'Ivy Moore', s_date: '20-01-2024', e_date: '30-01-2024', status: 'Ongoing', v_attendees: 'View' },
    ]
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





  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Status', 'View Attendees'],
      dataRows: [
        { sr_no: '1', c_name: 'Angular', t_name: 'Amisha', s_date: '30-11-2023', e_date: '12-12-2023', status: 'Ongoing', v_attendees: 'View' },
        { sr_no: '2', c_name: 'computer', t_name: 'Abel', s_date: '2-11-2023', e_date: '6-11-2023', status: 'Ongoing', v_attendees: 'View' },
        { sr_no: '3', c_name: 'React', t_name: 'Alice Smith', s_date: '10-12-2023', e_date: '20-12-2023', status: 'Ongoing', v_attendees: 'View' },
        { sr_no: '4', c_name: 'Python', t_name: 'Bob Johnson', s_date: '15-12-2023', e_date: '25-12-2023', status: 'Ongoing', v_attendees: 'View' },
        { sr_no: '5', c_name: 'Java', t_name: 'Charlie Brown', s_date: '18-12-2023', e_date: '28-12-2023', status: 'Ongoing', v_attendees: 'View' },
        { sr_no: '6', c_name: 'HTML/CSS', t_name: 'Eva Davis', s_date: '22-12-2023', e_date: '01-01-2024', status: 'Ongoing', v_attendees: 'View' },
        { sr_no: '7', c_name: 'Machine Learning', t_name: 'Frank White', s_date: '02-01-2024', e_date: '12-01-2024', status: 'Ongoing', v_attendees: 'View' },
        { sr_no: '8', c_name: 'Docker', t_name: 'Grace Thompson', s_date: '10-01-2024', e_date: '20-01-2024', status: 'Ongoing', v_attendees: 'View' },
        { sr_no: '9', c_name: 'Vue.js', t_name: 'Harry Johnson', s_date: '15-01-2024', e_date: '25-01-2024', status: 'Ongoing', v_attendees: 'View' },
        { sr_no: '10', c_name: 'SQL', t_name: 'Ivy Moore', s_date: '20-01-2024', e_date: '30-01-2024', status: 'Ongoing', v_attendees: 'View' },
      ]
    };





    }




  }

  




