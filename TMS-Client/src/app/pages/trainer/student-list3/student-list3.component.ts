import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../trainer-services/employee.service';
import { error } from 'console';
import { DataService } from '../trainer-services/data.service';


interface EmployeeDetails {
  s_no: string;
  emp_code: string;
  emp_name: string;
  startDate:string;
  endDate:string;
  tstatus:string;
  feedback: string;

// newly added
  emp_id:string;
  schedule_id:string;
}


@Component({
  selector: 'student-list3',
  moduleId: module.id,
  templateUrl: './student-list3.component.html',
})
export class StudentList3Component implements OnInit {
  public currentPage = 1;
  public itemsPerPage = 5;
  
  constructor(
    private route: ActivatedRoute,
    private employeeService:EmployeeService,
    private router:Router,
    private dataService:DataService,
   
    ) { }

  public tableData1= {
    headerRow: ['Sr No', 'Employee Code', 'Employee Name', 'Start Date', 'End Date', 'Status', 'Feedback'],
    dataRows: []
  };

  public filteredData: EmployeeDetails[]=[];
  public searchValue:string = '';
  public selectedCourse:string ='';

  
  viewEmployees(course: string) {
    this.selectedCourse = course; // set selected course
    this.employeeService.getEmployeesByCourse(course).subscribe(
      (data: any[]) => {
    
      this.tableData1.dataRows = data.map((row, index) => ({
          s_no:(index+1).toString(),
          emp_code: row.empCode,
          emp_name: row.empName,
          startDate: row.plannedStartDate,
          endDate: row.plannedEndDate,
          tstatus: row.status,
          feedback:'Give',

          emp_id:row.empId,
          schedule_id:row.scheduleId

        })); //[...data];
      this.filteredData = [...this.tableData1.dataRows];
      console.log('filtered data : ',this.filteredData);

      // Displaying empId and scheduleId in the console
      this.filteredData.forEach(employee => {
        console.log(`empId: ${employee.emp_id}, scheduleId: ${employee.schedule_id}`);
        
        this.passEmpAndScheduleId(employee.emp_id,employee.schedule_id);

      });
      
    },

   
   (error)=>{
    console.error('error fetching data: ',error);
   }
   
   );
console.log('viewEmp');
  

}
//newly added
    passEmpAndScheduleId(emp_id:string,schedule_id:string){
      this.dataService.changeEmpId(emp_id);
      this.dataService.changeScheduleId(schedule_id);
    }

  ngOnInit(): void { 
    this.route.queryParams.subscribe(params => {
      //newly added for ids
      const emp_id=params['emp_id'];
      const schedule_id=params['schedule_id'];


      
      this.selectedCourse = params['course'];

      if (this.selectedCourse) {
        this.viewEmployees(this.selectedCourse);
        console.log('ngOnInit')
      }
    });
    
  }
    

  applyFilter() {
    const searchText=this.searchValue.toLowerCase().trim();

    this.filteredData = this.tableData1.dataRows.filter(row =>
      Object.values(row).some(value =>  value && 
     value.toString().toLowerCase().includes(searchText)
      )
    );
  }



navigateToFeedback(empCode: string, startDate: string, endDate: string, status: string) {
  // Redirect to feedback component with necessary parameters
  this.router.navigate(['/feedback-to-employee'], {
    queryParams: { emp_code: empCode, start_date: startDate, end_date: endDate, tstatus: status }
  });
}

get pages(): number[] {
  if (this.filteredData.length === 0) {
    return [];
  }

  const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}

changeItemsPerPage(event: any): void {
  this.itemsPerPage = +event.target.value;
  this.currentPage = 1;
}

}