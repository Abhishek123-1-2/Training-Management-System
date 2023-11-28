import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from 'app/pages/admin/admin-services/training.service';
import { ViewTrainingComponent } from '../view-training/view-training.component';
import { Router } from '@angular/router';
@Component({
  selector: 'add-training-cmp',
  moduleId: module.id,
  templateUrl: 'add-training.component.html',
})
export class AddTrainingComponent implements OnInit {
  trainingForm: FormGroup;

  constructor(private fb: FormBuilder, private trainingService: TrainingService,private router:Router) {}

  ngOnInit() {
    // Initialize your form group with validators
    this.trainingForm = this.fb.group({
        training_category: ['', Validators.required],
        training_type: ['', Validators.required],
        training_schedule: ['', Validators.required],
        course: ['', Validators.required],
        trainer_names: ['', Validators.required],
        prerequisites: ['', Validators.required],
        course_description: ['', Validators.required],
        daily_hrs: ['', Validators.required],
        total_days: ['', Validators.required],
        url: ['', [Validators.required, Validators.pattern('https?://.+')]], // Example URL pattern validation
        username: ['', Validators.required],
        password: ['', Validators.required],
    });
}


onSubmit() {
    // Check if the form is valid
    if (this.trainingForm.valid) {
        // Get the form data without validation
        const formData = this.trainingForm.value;
        console.log('Submitting form data:', formData);

        // Call the service to add training
        this.trainingService.addTraining(formData).subscribe(
            (response) => {
                console.log('Training added successfully:', response);
                alert("Training added successfully");
                // Optionally, you can navigate to another page or perform other actions
                this.router.navigate(['/view-training'], { state: { addedTraining: response } });

            },
            (error) => {
                console.error('Error adding training:', error);
                // Handle error as needed
            }
        );
    } else {
        // If the form is not valid, mark all fields as touched to display validation messages
        this.markFormGroupTouched(this.trainingForm);
    }
}
// Helper function to mark all form controls as touched
markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control instanceof FormGroup) {
            this.markFormGroupTouched(control);
        }
    });
}

}