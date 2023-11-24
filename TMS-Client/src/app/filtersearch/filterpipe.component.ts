import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn:'root'
})

export class TableFilterService {
  constructor(){

  }

  filterTableData(data: any[], searchText: string): any[] {
    if (!data || !searchText) {
      return data;
    }
    searchText = searchText.toLowerCase();
    return data.filter(item => {
      // Modify conditions according to your data structure
      return (
        item.training_id.toString().includes(searchText) ||
        item.training_category.toLowerCase().includes(searchText) ||
        item.training_type.toLowerCase().includes(searchText) ||
        item.training_schedule.toLowerCase().includes(searchText) ||
        item.course.toLowerCase().includes(searchText) ||
        item.trainer_names.toLowerCase().includes(searchText) ||
        item.prerequisites.toLowerCase().includes(searchText) ||
        item.course_description.toLowerCase().includes(searchText) ||
        item.daily_hrs.toLowerCase().includes(searchText) ||
        item.total_days.toLowerCase().includes(searchText) ||
        item.url.toLowerCase().includes(searchText) ||
        item.username.toLowerCase().includes(searchText) ||
        item.password.toLowerCase().includes(searchText) 
       
      );
        

    });
  }
}
