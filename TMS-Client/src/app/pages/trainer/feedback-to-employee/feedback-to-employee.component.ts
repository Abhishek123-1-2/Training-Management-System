import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'feedback-to-employee',
  templateUrl: './feedback-to-employee.component.html',
  styleUrls: ['./feedback-to-employee.component.scss']
})
export class FeedbackToEmployeeComponent implements OnInit {

  saveForm: FormGroup;




  technicalSkillsValue: number = 0;
  graspingPowerValue: number = 0;
  proActivenessValue: number = 0;
  interestQualityValue: number = 0;
  leadershipQualityValue: number = 0;
  problemSolvingAbilityValue: number = 0;
  commentsFromTrainerValue: number = 0;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.saveForm = this.fb.group({

      CommentsFromTrainer: ['', Validators.required]

    });


  }

  onSubmit()
  {
    if(this.saveForm.invalid)
    {
      return;
    }
  }
  



  updateRating(inputId: string, displayProperty: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    this[displayProperty] = +inputElement.value;
  }

}
