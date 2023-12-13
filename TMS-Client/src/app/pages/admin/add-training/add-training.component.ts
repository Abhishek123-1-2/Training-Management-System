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
        daily_hrs: ['', Validators.required],
        total_days: ['', Validators.required],
        url: [''],
        username: [''],
        password: [''],
    });

    this.trainingForm.get('training_schedule').valueChanges.subscribe((value) => {
        const urlControl = this.trainingForm.get('url');
        const usernameControl = this.trainingForm.get('username');
        const passwordControl = this.trainingForm.get('password');

        // Reset validation and values for URL, Username, and Password controls
      urlControl.clearValidators();
      usernameControl.clearValidators();
      passwordControl.clearValidators();

      urlControl.reset();
      usernameControl.reset();
      passwordControl.reset();

      // Apply validation based on the selected value of Training Schedule
      if (value === 'ON-REQUEST') {
        urlControl.setValidators([Validators.required]);
        usernameControl.setValidators([Validators.required]);
        passwordControl.setValidators([Validators.required]);
      }

      // Update the validation state for URL, Username, and Password controls
      urlControl.updateValueAndValidity();
      usernameControl.updateValueAndValidity();
      passwordControl.updateValueAndValidity();
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
// onSubmit() {
//     // Check if the form is valid
//     if (this.trainingForm.valid) {
//         // Get the form data without validation
//         const formData = this.trainingForm.value;

//         // Concatenate trainer_names and course
//         formData.course = `${formData.trainer_names}(${formData.course})`;

//         // Call the service to add training
//         this.trainingService.addTraining(formData).subscribe(
//             (response) => {
//                 console.log('Training added successfully:', response);
//                 alert("Training added successfully");
//                 // Optionally, you can navigate to another page or perform other actions
//                 this.router.navigate(['/view-training'], { state: { addedTraining: response } });

//             },
//             (error) => {
//                 console.error('Error adding training:', error);
//                 // Handle error as needed
//             }
//         );
//     } else {
//         // If the form is not valid, mark all fields as touched to display validation messages
//         this.markFormGroupTouched(this.trainingForm);
//     }
// }
// onSubmit() {
//     // Check if the form is valid
//     if (this.trainingForm.valid) {
//         // Get the form data without validation
//         const formData = this.trainingForm.value;

//         // Concatenate trainer_names and course
//         formData.trainer_names = `${formData.trainer_names}(${formData.course})`;

//         // Call the service to add training
//         this.trainingService.addTraining(formData).subscribe(
//             (response) => {
//                 console.log('Training added successfully:', response);
//                 alert("Training added successfully");
//                 // Optionally, you can navigate to another page or perform other actions
//                 this.router.navigate(['/view-training'], { state: { addedTraining: response } });

//             },
//             (error) => {
//                 console.error('Error adding training:', error);
//                 // Handle error as needed
//             }
//         );
//     } else {
//         // If the form is not valid, mark all fields as touched to display validation messages
//         this.markFormGroupTouched(this.trainingForm);
//     }
// }


markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control instanceof FormGroup) {
            this.markFormGroupTouched(control);
        }
    });
}

}