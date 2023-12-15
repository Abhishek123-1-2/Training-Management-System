import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  saveForm: FormGroup;



  technicalSkillsValue: number = 0;
  graspingPowerValue: number = 0;
  proActivenessValue: number = 0;
  interestQualityValue: number = 0;
  leadershipQualityValue: number = 0;
  problemSolvingAbilityValue: number = 0;



  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.saveForm = this.formBuilder.group({
      commentsFromTrainer: ['', [Validators.required]]
    });
  }


  updateRating(inputId: string, displayProperty: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    this[displayProperty] = +inputElement.value;
  }


onSubmit()
{
  if(this.saveForm.invalid)
  {
    return;
  }
}

}


