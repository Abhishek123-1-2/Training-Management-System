
 
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'schedule-training-cmp',
    moduleId: module.id,
    templateUrl: 'schedule-training.component.html'
})



export class ScheduleTrainingComponent{
    trainingForm:FormGroup;
    selectedTime: string = ''; // To store the selected time


    constructor(private formBuilder: FormBuilder) {
        this.trainingForm = this.formBuilder.group({
            trainerName:['',Validators.required],
          fromTime: ['', Validators.required],
          timePeriod: [''],
          toTime: ['', Validators.required],
      status: ['', Validators.required],
      plannedStartDate: ['', Validators.required],
      plannedEndDate: ['', Validators.required],
      actualStartDate: ['', Validators.required],
      actualEndDate: ['', Validators.required]
        });
      }

      toggleAmPm() {
        const timeControl = this.trainingForm.get('fromTime');
        const currentTime = timeControl?.value;
    
        if (currentTime) {
          const timeParts = currentTime.split(':');
          let hours = parseInt(timeParts[0], 10);
          
          // Toggle between AM and PM based on the selected time
          if (hours >= 12) {
            hours -= 12;
            this.trainingForm.patchValue({ timePeriod: 'AM' });
          } else {
            hours += 12;
            this.trainingForm.patchValue({ timePeriod: 'PM' });
          }
    
          // Format the time back to HH:mm format
          const formattedTime = `${hours.toString().padStart(2, '0')}:${timeParts[1]}`;
          timeControl?.setValue(formattedTime);
          this.selectedTime = `${formattedTime} ${this.trainingForm.controls.timePeriod.value}`;
        }
      }


      

    onSubmit(){
       if(this.trainingForm.valid){

       }else{

       }
  }     
}
