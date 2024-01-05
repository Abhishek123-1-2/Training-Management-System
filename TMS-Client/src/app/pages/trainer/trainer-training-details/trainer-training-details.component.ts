// trainer-training-details.component.ts

import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../trainer-services/trainer.service';


interface TableRow {
  sr_no: string;
  c_name: string;
  s_date: string;
  e_date: string;
  status: string;
  schedule_id:string;
  training_id:string;
  //attendance_id:string;

  
}

@Component({
  selector: 'trainer-training-details',
  templateUrl: './trainer-training-details.component.html',
  styleUrls: ['./trainer-training-details.component.scss']
})
export class TrainerTrainingDetailsComponent implements OnInit {
  // public tableData1: TableData;
  public originalData: TableRow[] = [];
  public filteredData: TableRow[]=[];
  public searchValue: string = '';
  public selectedStatus: string = '';

  currentPage = 1;
  itemsPerPage = 5;


  // get pages(): number[]
  // {
  //   if(this.filteredData.length===0)
  //   {
  //     return [];

  //   }

  //   const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);
  //   return Array.from({length: pageCount}, (_,index) => index +1);


  // }


  // changeItemsPerPage(event:any):void{
  //   this.itemsPerPage = +event.target.value;
  //   this.currentPage = Math.min(this.currentPage,this.pages.length);
  // }





  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.fetchTrainingDetails();
     }

  fetchTrainingDetails() {
    this.trainingService.getCombinedTrainingDetails().subscribe(
      (data: any[]) => {
        this.originalData = data.map((item,index) => ({
          sr_no: (index + 1).toString(),
          c_name: item.course,
          s_date: item.plannedStartDate,
          e_date: item.plannedEndDate,
          status: item.trainingStatus,
          schedule_id:item.scheduleId,
          training_id:item.trainingId,
          //attendance_id:item.attendanceId,
        }));

       
        this.originalData.forEach(item =>{
          console.log('Schedule ID: ',item.schedule_id +',Training Id :',item.training_id);
          
        });

       
        this.filteredData = [...this.originalData];

      },
      error => {
        console.error('Error fetching training details:', error);
      }
    );
  }

  applyFilter() {
    const searchText = this.searchValue.toLowerCase().trim();

    this.filteredData = this.originalData.filter(row =>
      Object.values(row).some(value =>
     value && value.toString().toLowerCase().includes(searchText)
      ) 
    )
      .filter(row =>
        (this.selectedStatus === '' 
      || row.status.toLowerCase() === this.selectedStatus.toLowerCase()
      || this.selectedStatus === 'all')
    )
    ;
  }

  resetFilters() {
    this.searchValue = '';
    this.selectedStatus = '';
    this.filteredData = [...this.originalData]; // Reset filteredData to originalData

    // this.fetchTrainingDetails(); // Reset filters to initial state by fetching all data again
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

    

  
