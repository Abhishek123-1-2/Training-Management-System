/* feedback-form.component.ts  */
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee-services/employee.service';
import { UserService } from 'app/pages/login/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  saveForm: FormGroup;
  effectivenessValue: number = 0;
  contentValue: number = 0;
  methodologyValue: number = 0;
  organizationValue: number = 0;
  trainingRatingValue: number = 0;


  @ViewChild('chartCanvas') chartCanvas: ElementRef<HTMLCanvasElement>;; // Reference to the canvas element
  
  chart: any;

  constructor(private fb:FormBuilder, private employeeService: EmployeeService, private loginService: UserService, private route: ActivatedRoute) { }
  ngOnInit(): void {
  }

  updateRating(inputId: string, displayProperty: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    this[displayProperty] = +inputElement.value;
  }


onSubmit()
{
  if(this.saveForm.invalid) {
      return;
  }
}

}


