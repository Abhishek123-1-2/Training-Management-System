import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-services/employee.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'app/pages/login/login.service';

declare interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

interface TableRow {
  number: string;
  c_name: string;
  action: string;
  status: string;
  view: string;
}

@Component({
  selector: 'external-course',
  templateUrl: './external-course.component.html',
  styleUrls: ['./external-course.component.scss']
})
export class ExternalCourseComponent implements OnInit {

  public tableData1: TableData;
  public filteredData: TableRow[];
  public searchValue: string = '';
  currentPage=1;
  itemsPerPage=5;

  constructor(private employeeService: EmployeeService, private http: HttpClient, private loginService: UserService) { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['Sr No.', 'Course Name', 'Action', 'Status', 'View'],
      dataRows: [
        {number: '1', c_name: 'Angular', action: '', status:'', view: ''}
      ]
    };

    this.filteredData = [...this.tableData1.dataRows];

    const empId = this.loginService.getEmpId();

    if (!empId) {
      console.error('EmpId not available.');
      return;
    }

    this.employeeService.getExternalCourseTrainings(empId).subscribe(
      (data: any[]) => {
        this.tableData1.dataRows = data.map(
          (schedule, index): TableRow => ({
            number: String(index + 1),
            c_name: schedule.course,
            action: '',
            status: schedule.registrationStatus,
            view: '',
          })
        );
        this.filteredData = [...this.tableData1.dataRows];
      },
      (error) => {
        console.error('Error fetching the external course details', error);
      }
    );
  }

  applyFilter() {
    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>
        value && value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
      )
    );
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
        this.currentPage = 1; // Reset to the first page when changing items per page
      }

}
