/* feedback-form.component.ts  */
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

 




  technicalSkillsValue: number = 0;
  graspingPowerValue: number = 0;
  proActivenessValue: number = 0;
  interestQualityValue: number = 0;
  leadershipQualityValue: number = 0;
  problemSolvingAbilityValue: number = 0;


  @ViewChild('chartCanvas') chartCanvas: ElementRef; // Reference to the canvas element
  saveForm: any;
  formBuilder: any;
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.saveForm = this.formBuilder.group({
      commentsFromTrainer: ['', [Validators.required]]
    });
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = [
        this.technicalSkillsValue,
        this.graspingPowerValue,
        this.proActivenessValue,
        this.interestQualityValue,
        this.leadershipQualityValue,
        this.problemSolvingAbilityValue
      ];
      this.chart.update();
    }
  }

  updateRating(inputId: string, displayProperty: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    this[displayProperty] = +inputElement.value;
    this.updateChart();
  }


onSubmit()
{
  if(this.saveForm.invalid)
  {
    return;
  }
}

}


