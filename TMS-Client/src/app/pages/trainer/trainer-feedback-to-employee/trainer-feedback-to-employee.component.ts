// trainer-feedback-to-employee.component.ts
import { Component, OnInit, Renderer2 } from '@angular/core';
import { TrainingService } from '../trainer-services/trainer.service';
import { filter } from 'rxjs';
import { error } from 'console';
import { Router } from '@angular/router';


interface TableRow {
  sr_no: string;
  c_name: string;
  s_date: string;
  e_date: string;
  status: string;
  view:string;
  schedule_id:string;
  training_id:string;
  attendance_id:string;
  
}

@Component({
  selector: 'trainer-feedback-to-employee',
  moduleId: module.id,
  templateUrl: './trainer-feedback-to-employee.component.html',
})
export class TrainerFeedbackToEmployeeComponent implements OnInit {
  // public tableData1: TableData;
  public course:string[]=[];
 public originalData:TableRow[]=[];
 public filteredData:TableRow[]=[];
  public searchValue: string = '';
  public currentPage = 1;
  public itemsPerPage = 5;

  constructor(private trainingService:TrainingService,
    private router: Router,
    ) { }

 
  ngOnInit(): void {
      this.fetchTrainingDetails();
  }

  fetchTrainingDetails(){
    this.trainingService.getCompletedTrainingDetails().subscribe(
      (data:any[])=>{
        this.originalData=data.map((item,index)=>({
          sr_no:(index+1).toString(),
          c_name:item.course,
          s_date:item.plannedStartDate,
          e_date:item.plannedEndDate,
          status:item.trainingStatus,
          view:'View',
          schedule_id:item.scheduleId,
          training_id:item.trainingId,
          attendance_id:item.attendanceId,
          // view: `/student-list3?start_date=${item.plannedStartDate}&end_date=${item.plannedEndDate}&status=${item.trainingStatus}`
        }));

        console.log('Completed Trainings:');
        this.originalData.forEach(item =>{
          console.log('Schedule ID: ',item.schedule_id+',Training ID :',item.training_id);
          console.log('Attendance ID : ',item.attendance_id);
        });

        this.filteredData=[...this.originalData];
      },
      error=>{
        console.error('Error fetching training details:', error);
      }
    )
  }


  applyFilter() {
    const searchText=this.searchValue.toLowerCase().trim();

    this.filteredData = this.originalData.filter(row =>
      Object.values(row).some(value =>
        value && value.toString().toLowerCase().includes(searchText)
      )
    );
  }

  resetFilters(){
    this.searchValue='';
    this.filteredData=[...this.originalData];
  }
 
  //newly added for referencing
  viewEmployeesForCourse(course: string) {
    this.router.navigate(['/student-list3'], { queryParams: { course: course } });
  }

  get pages(): number[] {
    if (this.originalData.length === 0) {
      return [];
    }

    const pageCount = Math.ceil(this.originalData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  changeItemsPerPage(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
  }

}
