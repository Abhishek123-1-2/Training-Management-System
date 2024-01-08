/* feedback-form.component.ts  */
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee-services/employee.service';
import { UserService } from 'app/pages/login/login.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { DataService } from 'app/pages/trainer/trainer-services/data.service';

@Component({
  selector: 'feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  emp_Id: string;
  schedule_Id: string;
  saveForm: FormGroup;
  effectivenessValue: number = 0;
  contentValue: number = 0;
  methodologyValue: number = 0;
  organizationValue: number = 0;
  trainingRatingValue: number = 0;
  commentsFromEmpValue: number = 0;

  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;; // Reference to the canvas element
  
  chart: any;

  constructor(private fb:FormBuilder, private employeeService: EmployeeService, private loginService: UserService, private route: ActivatedRoute, private dataService: DataService) { }
  ngOnInit(): void {
    this.saveForm = this.fb.group({
      // effectiveness: ['', Validators.required],  // Add appropriate validators
      // content: ['', Validators.required], 
      // methodology: ['', Validators.required],
      // organization: ['', Validators.required],
      // trainer_rating: ['', Validators.required],
      commentsFromEmp: ['', Validators.required],  // Add appropriate validators
    });

    this.emp_Id = this.loginService.getEmpId();
    console.log("Employee Id: ", this.emp_Id);

    this.route.params.subscribe((params) => {
      this.schedule_Id = params['scheduleId'];
      console.log('Schedule ID:', this.schedule_Id);
    });

  }

  updateRating(inputId: string, displayProperty: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    this[displayProperty] = +inputElement.value;
  }


onSubmit()
{
  const formData = {
   empId: this.emp_Id,
   scheduleId: this.schedule_Id,
   attendanceId: null,
   effectiveness: this.effectivenessValue,
   content: this.contentValue,
   methodology: this.methodologyValue,
   organization: this.organizationValue,
   trainer_rating: this.trainingRatingValue,
   feedback_type: 'Employee Feedback',
   commentsFromEmp: this.saveForm.get('commentsFromEmp').value 
  };

  console.log('Feedback Data: ', formData);
  window.alert('Feedback Saved Successfully');
  this.saveForm.reset();
  this.employeeService.saveFeedback(formData).subscribe(
    response => {
      if (typeof response==='string'){
        window.alert(response);
      }else{
        window.alert('Unexpected response format');
      }
    }
  )
}



}


