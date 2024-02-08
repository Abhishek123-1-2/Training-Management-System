import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'schedule-training-cmp',
    moduleId: module.id,
    templateUrl: 'schedule-training.component.html'
})



export class ScheduleTrainingComponent{
    trainingForm:FormGroup;
    trainerNames: string[] = [];
    selectedTime: string = ''; // To store the selected time
    course: string | null = null;
trainer: string | null = null;

    constructor(private formBuilder: FormBuilder,
      private  route: ActivatedRoute,
private router:Router,private http: HttpClient
      ) {

        
this.course = this.route.snapshot.paramMap.get('course') || null;
this.trainer = this.route.snapshot.paramMap.get('trainer') || null;


        this.trainingForm = this.formBuilder.group({
            trainerName:[this.trainer,Validators.required],
            course:[this.course,Validators.required],

          fromTime: ['', Validators.required],
          timePeriod: [''],
          toTime: ['', Validators.required],
      trainingStatus: ['', Validators.required],
      plannedStartDate: ['', Validators.required],
      plannedEndDate: ['', Validators.required],
      /* actualStartDate: ['', Validators.required],
      actualEndDate: ['', Validators.required] */
        });
      }

      ngOnInit(){
        this.fetchTrainerNames();
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
      
      fetchTrainerNames() {
        this.http.get<string[]>('http://localhost:8083/api/training-views/trainer-names')
          .subscribe(
            (data) => {
              this.trainerNames = data.sort();
            },
            (error) => {
              console.error('Error fetching trainer names:', error);
            }
          );
      }
      onSubmit() {
        if (this.trainingForm.valid) {
          // Prepare the data to send to the backend
          const requestData = {
            trainerName: this.trainingForm.value.trainerName,
            plannedStartDate: this.trainingForm.value.plannedStartDate,
            plannedEndDate: this.trainingForm.value.plannedEndDate,
            fromTime: this.trainingForm.value.fromTime,
            toTime: this.trainingForm.value.toTime,
            trainingStatus: this.trainingForm.value.trainingStatus,
            // Add other fields as needed
          };
          console.log('Request Data:', requestData);
          // Send the data to the backend
          this.http.post('http://localhost:8083/api/training-views/schedule', requestData)
            .subscribe(
              response => {
                // Success: Show alert or perform any other actions
                alert('Data saved successfully!');
                this.router.navigate(['/dashboard']);
              },
              error => {
                // Handle the error: Show alert or log the error
                alert('Failed to save data. Please try again.');
                console.error(error);
              }
            );
        } else {
          alert('Please fill in all required fields!');
        }
      }
      
}