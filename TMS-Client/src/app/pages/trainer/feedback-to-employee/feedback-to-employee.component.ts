import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../trainer-services/feedback.service';
import { DataService } from '../trainer-services/data.service';

@Component({
  selector: 'feedback-to-employee',
  templateUrl: './feedback-to-employee.component.html',
  styleUrls: ['./feedback-to-employee.component.scss']
})
export class FeedbackToEmployeeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private feedbackService:FeedbackService,
    private router:Router,
    private dataService:DataService,
    private renderer:Renderer2,

    ) { }

    assignmentStatus:string[]=['Submitted','Not Submitted','None'];
    selectedAssignmentStatus:string=''; // to store the selection

  saveForm: FormGroup;
 emp_Id:string;
 schedule_Id:string;

  technicalSkillsValue: number = 0;
  graspingPowerValue: number = 0;
  proActivenessValue: number = 0;
  interestQualityValue: number = 0;
  leadershipQualityValue: number = 0;
  problemSolvingAbilityValue: number = 0;
  spokenEnglishRateValue:number=0;
  smartnessRateValue:number=0;

  commentsFromTrainerValue: number = 0;
  start_date: string;
  end_date: string;
  status: string;
 
  totalRating:number=0;
  performanceStatus:string;
  

  ngOnInit(): void {
    //newly added
    this.dataService.currentEmpId.subscribe((empId) =>{
      this.emp_Id=empId;
      console.log('Emp ID:', this.emp_Id);
    });

    this.dataService.currentScheduleId.subscribe((scheduleId) =>{
      this.schedule_Id=scheduleId
    console.log('Schedule ID:', this.schedule_Id);
    });

    this.route.params.subscribe((params) => {
      //this.emp_Id=params['emp_Id'];
      //this.schedule_Id=params['schedule_Id']
      this.start_date = params['start_date'];
      this.end_date = params['end_date'];
      this.status = params['status'];
    })

    this.saveForm = this.fb.group({
      CommentsFromTrainer: ['', Validators.required],
      AssignmentStatus:['',Validators.required]

    });


  }

    onSubmit():void {
      const feedbackData = {
           scheduleId: this.schedule_Id, 
           empId: this.emp_Id, 

           technicalSkills: this.technicalSkillsValue,
           graspingPower:this.graspingPowerValue,
           proActiveness:this.proActivenessValue,
           interestQuality:this.interestQualityValue,
           leadershipQuality:this.leadershipQualityValue,
           problemSolvingAbility:this.problemSolvingAbilityValue,
           smartnessRate:this.smartnessRateValue,
           spokenEnglishRate:this.spokenEnglishRateValue,

        commentsFromTrainer: this.saveForm.get('CommentsFromTrainer').value,
       assignmentStatus:this.saveForm.get('AssignmentStatus').value,

       totalRating:this.calculateTotalRating(),
       performanceStatus:this.determinePerformanceStatus(),
      };
      console.log('Feedback DATA: ',feedbackData);
      window.alert('Feedback Saved Successfully');
       //this.refreshForm();
      this.feedbackService.saveFeedback(feedbackData).subscribe(
        response => {
          if (typeof response==='string'){
            window.alert(response);
          }else{
            window.alert('Unexpected response format');
          }
           //this.refreshForm();
        } 
      
        
        );
    }
  



  updateRating(inputId: string, displayProperty: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    this[displayProperty] = +inputElement.value;
  }

  calculateTotalRating():number {
    const totalRatings=
    this.technicalSkillsValue +
    this.graspingPowerValue+
    this.proActivenessValue+
    this.interestQualityValue+
 this.leadershipQualityValue+
 this.problemSolvingAbilityValue +
 this.spokenEnglishRateValue+
 this.smartnessRateValue;

 return totalRatings/8;
  }

  determinePerformanceStatus(): string {
    const averageRating = this.calculateTotalRating();
  
    if (averageRating >= 4) {
      return 'Excellent';
    } 
    else if (averageRating >=3 ) {
      return 'Good';
    } 
    else if (averageRating >= 2) {
      return 'Average';
    } 
    else {
      return 'Poor';
    
  }
  
  }

  refreshForm(): void{
    this.saveForm.reset();

    this.technicalSkillsValue=0;
    this.graspingPowerValue=0;
    this.proActivenessValue=0;
    this.interestQualityValue=0;
    this.leadershipQualityValue=0;
    this.problemSolvingAbilityValue=0;
    this.spokenEnglishRateValue=0;
    this.smartnessRateValue=0;
    
    const sliderIds = [
      'technicalSkills', 'graspingPower', 'proActiveness',
      'interestQuality', 'leadershipQuality', 'problemSolvingAbility',
      'spokenEnglishRate', 'smartnessRate'
    ];
  
    // sliderIds.forEach((id) => {
    //   const sliderElement = document.getElementById(id) as HTMLInputElement;
    //   this.renderer.setProperty(sliderElement,'value' , '0');
    // });
    sliderIds.forEach((id) => {
      const sliderElement = this.renderer.selectRootElement(`#${id}`);
      this.renderer.setProperty(sliderElement, 'value', '0');
    });
  }
  
}
