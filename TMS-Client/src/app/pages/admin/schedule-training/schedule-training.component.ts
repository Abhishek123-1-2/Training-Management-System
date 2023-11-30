
 
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TrainingService } from 'app/pages/admin/admin-services/training.service';
@Component({
    selector: 'schedule-training-cmp',
    moduleId: module.id,
    templateUrl: 'schedule-training.component.html'
})



export class ScheduleTrainingComponent{
    trainingForm:FormGroup;
    selectedTime: string = ''; // To store the selected time
    trainers: string[] = [];
    trainerId: number | null = null;
  //   trainers = [
  //     { id: 1, name: 'Trainer 1' },
  //     { id: 2, name: 'Trainer 2' },
  //     // Add more trainers as needed
  // ];
    constructor(private formBuilder: FormBuilder,private trainingService:TrainingService ) {
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
      
      ngOnInit() {
        // Fetch trainer names from the API endpoint
        this.trainingService.getTrainerNames().subscribe(
          (data: string[]) => {
            this.trainers = data;
          },
          (error) => {
            console.error('Error fetching trainer names:', error);
            // Handle error as needed
          }
        );
      }
      onSelectTrainer(trainerName: string) {
        // Fetch trainer ID based on the selected trainer name
        this.trainingService.getTrainerIdByNameFromBackend(trainerName).subscribe(
          (id: number | null) => {
            this.trainerId = id;
          },
          (error) => {
            console.error('Error fetching trainer ID:', error);
            // Handle error as needed
          }
        );
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

      onSubmit() {
        if (this.trainingForm.valid && this.trainerId !== null) {
          // Prepare data for insertion into the training_schedule table
          const trainingScheduleData = {
            trainerName: this.trainingForm.value.trainerName,
            plannedStartDate: this.trainingForm.value.plannedStartDate,
            plannedEndDate: this.trainingForm.value.plannedEndDate,
            actualStartDate: this.trainingForm.value.actualStartDate,
            actualEndDate: this.trainingForm.value.actualEndDate,
            trainingStatus: this.trainingForm.value.status,
            // Add other fields as needed
          };
      
          // Insert data into the training_schedule table
          this.trainingService.scheduleTraining(this.trainerId, trainingScheduleData).subscribe(
            (response) => {
              console.log('Training scheduled successfully:', response);
              // Add any additional logic or navigation after successful insertion
              console.log("Training Added Successfully");
            },
            (error) => {
              console.error('Error scheduling training:', error);
              // Handle error as needed
            }
          );
        } else {
          // Handle form validation error
        }
      }
      
      

     
}
