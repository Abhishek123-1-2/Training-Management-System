import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from 'app/pages/admin/admin-services/training.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
@Component({
  selector: 'add-training-cmp',
  moduleId: module.id,
  templateUrl: 'add-training.component.html',
})
export class AddTrainingComponent implements OnInit {
  trainingForm: FormGroup;

  constructor(private fb: FormBuilder, private trainingService: TrainingService, private router: Router,private ngZone: NgZone) {}

//   ngOnInit() {
//     // Initialize your form group with validators
//     this.trainingForm = this.fb.group({
//       training_category: ['', Validators.required],
//       training_type: ['', Validators.required],
//       training_schedule: ['', Validators.required],
//       course: ['', Validators.required],
//       trainer_names: ['', Validators.required],
//       daily_hrs: ['', Validators.required],
//       total_days: ['', Validators.required],
//       prerequisites: [''],
//       course_description: [''],
//       url: [''],
//       username: [''],
//       password: [''],
//     });

//     this.trainingForm.get('training_schedule').valueChanges.subscribe((value) => {
//       const urlControl = this.trainingForm.get('url');
//       const usernameControl = this.trainingForm.get('username');
//       const passwordControl = this.trainingForm.get('password');
//       const courseControl = this.trainingForm.get('course');
//       const trainingCategoryControl = this.trainingForm.get('training_category');
//       const trainingTypeControl = this.trainingForm.get('training_type');

//       // Reset validation and values for URL, Username, Password, Course, Training Category, and Training Type controls
//       urlControl.clearValidators();
//       usernameControl.clearValidators();
//       passwordControl.clearValidators();
//       courseControl.clearValidators();
//       trainingCategoryControl.clearValidators();
//       trainingTypeControl.clearValidators();

//       urlControl.reset();
//       usernameControl.reset();
//       passwordControl.reset();
//       courseControl.reset();
//       trainingCategoryControl.reset();
//       trainingTypeControl.reset();

//       // Apply validation based on the selected value of Training Schedule
//       if (value === 'ON-REQUEST' || value === 'EXTERNAL') {
//         if (value === 'EXTERNAL') {
//           // Apply validation only to the specific fields for 'EXTERNAL'
//           urlControl.setValidators([Validators.required]);
//           usernameControl.setValidators([Validators.required]);
//           passwordControl.setValidators([Validators.required]);
//           courseControl.setValidators([Validators.required]);
//         }
//       }

//       // Update the validation state for URL, Username, Password, Course, Training Category, and Training Type controls
//       urlControl.updateValueAndValidity();
//       usernameControl.updateValueAndValidity();
//       passwordControl.updateValueAndValidity();
//       courseControl.updateValueAndValidity();
//       trainingCategoryControl.updateValueAndValidity();
//       trainingTypeControl.updateValueAndValidity();

//       // Reset validation for other fields
//       const otherControls = ['trainer_names', 'daily_hrs', 'total_days', 'prerequisites', 'course_description'];
//       otherControls.forEach((controlName) => {
//         const control = this.trainingForm.get(controlName);
//         control.clearValidators();
//          control.updateValueAndValidity();
//       });
//     });
//   }
// ngOnInit() {
//     // Initialize your form group with validators
//     this.trainingForm = this.fb.group({
//       training_category: ['', Validators.required],
//       training_type: ['', Validators.required],
//       training_schedule: ['', Validators.required],
//       course: ['', Validators.required],
//       trainer_names: ['', Validators.required],
//       daily_hrs: ['', Validators.required],
//       total_days: ['', Validators.required],
//       prerequisites: [''],
//       course_description: [''],
//       url: [''],
//       username: [''],
//       password: [''],
//     });
  
//     this.trainingForm.get('training_schedule').valueChanges.subscribe((value) => {
//       const urlControl = this.trainingForm.get('url');
//       const usernameControl = this.trainingForm.get('username');
//       const passwordControl = this.trainingForm.get('password');
//       const courseControl = this.trainingForm.get('course');
//       const trainingCategoryControl = this.trainingForm.get('training_category');
//       const trainingTypeControl = this.trainingForm.get('training_type');
  
//       // Reset validation and values for URL, Username, Password, Course, Training Category, and Training Type controls
//       urlControl.clearValidators();
//       usernameControl.clearValidators();
//       passwordControl.clearValidators();
//       courseControl.clearValidators();
//       trainingCategoryControl.clearValidators();
//       trainingTypeControl.clearValidators();
  
//       urlControl.reset();
//       usernameControl.reset();
//       passwordControl.reset();
//       courseControl.reset();
//       trainingCategoryControl.reset();
//       trainingTypeControl.reset();
  
//       // Apply validation based on the selected value of Training Schedule
//       if (value === 'ON-REQUEST') {
//         urlControl.setValidators([Validators.required]);
//         usernameControl.setValidators([Validators.required]);
//         passwordControl.setValidators([Validators.required]);
//         courseControl.setValidators([Validators.required]);
//         trainingCategoryControl.setValidators([Validators.required]);
//         trainingTypeControl.setValidators([Validators.required]);
//       } else if (value === 'EXTERNAL') {
//         urlControl.setValidators([Validators.required]);
//         usernameControl.setValidators([Validators.required]);
//         passwordControl.setValidators([Validators.required]);
//         courseControl.setValidators([Validators.required]);
//       }
  
//       // Update the validation state for URL, Username, Password, Course, Training Category, and Training Type controls
//       urlControl.updateValueAndValidity();
//       usernameControl.updateValueAndValidity();
//       passwordControl.updateValueAndValidity();
//       courseControl.updateValueAndValidity();
//       trainingCategoryControl.updateValueAndValidity();
//       trainingTypeControl.updateValueAndValidity();
  
//       // Reset validation for other fields
//       const otherControls = ['trainer_names', 'daily_hrs', 'total_days', 'prerequisites', 'course_description'];
//       otherControls.forEach((controlName) => {
//         const control = this.trainingForm.get(controlName);
//         control.clearValidators();
//         control.updateValueAndValidity();
//       });
//     });
//   }
// ngOnInit() {
//     // Initialize your form group with validators
//     this.trainingForm = this.fb.group({
//       training_category: ['', Validators.required],
//       training_type: ['', Validators.required],
//       training_schedule: ['', Validators.required],
//       course: ['', Validators.required],
//       trainer_names: ['', Validators.required],
//       daily_hrs: ['', Validators.required],
//       total_days: ['', Validators.required],
//       prerequisites: [''],
//       course_description: [''],
//       url: [''],
//       username: [''],
//       password: [''],
//     });
  
//     this.trainingForm.get('training_schedule').valueChanges.subscribe((value) => {
//       const urlControl = this.trainingForm.get('url');
//       const usernameControl = this.trainingForm.get('username');
//       const passwordControl = this.trainingForm.get('password');
//       const courseControl = this.trainingForm.get('course');
//       const trainingCategoryControl = this.trainingForm.get('training_category');
//       const trainingTypeControl = this.trainingForm.get('training_type');
  
//       // Reset validation and values for URL, Username, Password, Course, Training Category, and Training Type controls
//       urlControl.clearValidators();
//       usernameControl.clearValidators();
//       passwordControl.clearValidators();
//       courseControl.clearValidators();
//       trainingCategoryControl.clearValidators();
//       trainingTypeControl.clearValidators();
  
//       urlControl.reset();
//       usernameControl.reset();
//       passwordControl.reset();
//       courseControl.reset();
//       trainingCategoryControl.reset();
//       trainingTypeControl.reset();
  
//       // Apply validation based on the selected value of Training Schedule
//       if (value === 'ON-REQUEST') {
//         urlControl.setValidators([Validators.required]);
//         usernameControl.setValidators([Validators.required]);
//         passwordControl.setValidators([Validators.required]);
//         courseControl.setValidators([Validators.required]);
//         trainingCategoryControl.setValidators([Validators.required]);
//         trainingTypeControl.setValidators([Validators.required]);
//       } else if (value === 'EXTERNAL') {
//         urlControl.setValidators([Validators.required]);
//         usernameControl.setValidators([Validators.required]);
//         passwordControl.setValidators([Validators.required]);
//         courseControl.setValidators([Validators.required]);
  
//         // Disable fields without validation when External is selected
//         ['prerequisites', 'course_description', 'daily_hrs', 'total_days','trainer_names','training_type','training_category'].forEach((controlName) => {
//           const control = this.trainingForm.get(controlName);
//           control.disable();
//         });
//       } else {
//         // Enable all fields when neither ON-REQUEST nor EXTERNAL is selected
//         ['prerequisites', 'course_description', 'daily_hrs', 'total_days'].forEach((controlName) => {
//           const control = this.trainingForm.get(controlName);
//           control.enable();
//         });
//       }
  
//       // Update the validation state for URL, Username, Password, Course, Training Category, and Training Type controls
//       urlControl.updateValueAndValidity();
//       usernameControl.updateValueAndValidity();
//       passwordControl.updateValueAndValidity();
//       courseControl.updateValueAndValidity();
//       trainingCategoryControl.updateValueAndValidity();
//       trainingTypeControl.updateValueAndValidity();
//     });
//   }
// ngOnInit() {
//     // Initialize your form group with validators
//     this.trainingForm = this.fb.group({
//       training_category: ['', Validators.required],
//       training_type: ['', Validators.required],
//       training_schedule: ['', Validators.required],
//       course: ['', Validators.required],
//       trainer_names: ['', Validators.required],
//       daily_hrs: ['', Validators.required],
//       total_days: ['', Validators.required],
//       prerequisites: [''],
//       course_description: [''],
//       url: [''],
//       username: [''],
//       password: [''],
//     });
  
//     this.trainingForm.get('training_schedule').valueChanges.subscribe((value) => {
//       const urlControl = this.trainingForm.get('url');
//       const usernameControl = this.trainingForm.get('username');
//       const passwordControl = this.trainingForm.get('password');
//       const courseControl = this.trainingForm.get('course');
//       const trainingCategoryControl = this.trainingForm.get('training_category');
//       const trainingTypeControl = this.trainingForm.get('training_type');
  
//       // Reset validation and values for URL, Username, Password, Course, Training Category, and Training Type controls
//       urlControl.clearValidators();
//       usernameControl.clearValidators();
//       passwordControl.clearValidators();
//       courseControl.clearValidators();
//       trainingCategoryControl.clearValidators();
//       trainingTypeControl.clearValidators();
  
//       urlControl.reset();
//       usernameControl.reset();
//       passwordControl.reset();
//       courseControl.reset();
//       trainingCategoryControl.reset();
//       trainingTypeControl.reset();
  
//       // Apply validation based on the selected value of Training Schedule
//       if (value === 'ON-REQUEST') {
//         urlControl.setValidators([Validators.required]);
//         usernameControl.setValidators([Validators.required]);
//         passwordControl.setValidators([Validators.required]);
//         courseControl.setValidators([Validators.required]);
//         trainingCategoryControl.setValidators([Validators.required]);
//         trainingTypeControl.setValidators([Validators.required]);
//       } else if (value === 'EXTERNAL') {
//         urlControl.setValidators([Validators.required]);
//         usernameControl.setValidators([Validators.required]);
//         passwordControl.setValidators([Validators.required]);
//         courseControl.setValidators([Validators.required]);
  
//         // Disable fields without validation when External is selected
//         ['prerequisites', 'course_description', 'daily_hrs', 'total_days', 'trainer_names', 'training_type', 'training_category'].forEach((controlName) => {
//           const control = this.trainingForm.get(controlName);
//           control.disable();
//         });
//       } else {
//         // Enable all fields when neither ON-REQUEST nor EXTERNAL is selected
//         ['prerequisites', 'course_description', 'daily_hrs', 'total_days', 'trainer_names', 'training_type', 'training_category'].forEach((controlName) => {
//           const control = this.trainingForm.get(controlName);
//           control.enable();
//           control.setValidators(null); // Clear validators for these fields
//           control.updateValueAndValidity();
//         });
//       }
  
//       // Update the validation state for URL, Username, Password, Course, Training Category, and Training Type controls
//       urlControl.updateValueAndValidity();
//       usernameControl.updateValueAndValidity();
//       passwordControl.updateValueAndValidity();
//       courseControl.updateValueAndValidity();
//       trainingCategoryControl.updateValueAndValidity();
//       trainingTypeControl.updateValueAndValidity();
//     });
//   }
  
// ngOnInit() {
//     // Initialize your form group with validators
//     this.trainingForm = this.fb.group({
//       training_category: ['', Validators.required],
//       training_type: ['', Validators.required],
//       training_schedule: ['', Validators.required],
//       course: ['', Validators.required],
//       trainer_names: ['', Validators.required],
//       daily_hrs: ['', Validators.required],
//       total_days: ['', Validators.required],
//       prerequisites: [''],
//       course_description: [''],
//       url: [''],
//       username: [''],
//       password: [''],
//     });

//     this.trainingForm.get('training_schedule').valueChanges.subscribe((value) => {
//       this.ngZone.run(() => {
//         const urlControl = this.trainingForm.get('url');
//         const usernameControl = this.trainingForm.get('username');
//         const passwordControl = this.trainingForm.get('password');
//         const courseControl = this.trainingForm.get('course');
//         const trainingCategoryControl = this.trainingForm.get('training_category');
//         const trainingTypeControl = this.trainingForm.get('training_type');

//         // Reset validation and values for URL, Username, Password, Course, Training Category, and Training Type controls
//         urlControl.clearValidators();
//         usernameControl.clearValidators();
//         passwordControl.clearValidators();
//         courseControl.clearValidators();
//         trainingCategoryControl.clearValidators();
//         trainingTypeControl.clearValidators();

//         urlControl.reset();
//         usernameControl.reset();
//         passwordControl.reset();
//         courseControl.reset();
//         trainingCategoryControl.reset();
//         trainingTypeControl.reset();

//         // Apply validation based on the selected value of Training Schedule
//         if (value === 'ON-REQUEST') {
//           urlControl.setValidators([Validators.required]);
//           usernameControl.setValidators([Validators.required]);
//           passwordControl.setValidators([Validators.required]);
//           courseControl.setValidators([Validators.required]);
//           trainingCategoryControl.setValidators([Validators.required]);
//           trainingTypeControl.setValidators([Validators.required]);
//         } else if (value === 'EXTERNAL') {
//           urlControl.setValidators([Validators.required]);
//           usernameControl.setValidators([Validators.required]);
//           passwordControl.setValidators([Validators.required]);
//           courseControl.setValidators([Validators.required]);

//           // Disable fields without validation when External is selected
//           ['prerequisites', 'course_description', 'daily_hrs', 'total_days', 'trainer_names', 'training_type', 'training_category'].forEach((controlName) => {
//             const control = this.trainingForm.get(controlName);
//             control.disable();
//           });
//         } else {
//           // Enable all fields when neither ON-REQUEST nor EXTERNAL is selected
//           ['prerequisites', 'course_description', 'daily_hrs', 'total_days', 'trainer_names', 'training_type', 'training_category'].forEach((controlName) => {
//             const control = this.trainingForm.get(controlName);
//             control.enable();
//             control.setValidators(null); // Clear validators for these fields
//             control.updateValueAndValidity();
//           });
//         }

//         // Update the validation state for URL, Username, Password, Course, Training Category, and Training Type controls
//         urlControl.updateValueAndValidity();
//         usernameControl.updateValueAndValidity();
//         passwordControl.updateValueAndValidity();
//         courseControl.updateValueAndValidity();
//         trainingCategoryControl.updateValueAndValidity();
//         trainingTypeControl.updateValueAndValidity();
//       });
//     });
//   }
ngOnInit() {
    // Initialize your form group with validators
    this.trainingForm = this.fb.group({
      training_category: [''],
      training_type: ['' ],
      training_schedule: [''],
      course: [''],
      trainer_names: [''],
      daily_hrs: [''],
      total_days: [''],
      prerequisites: [''],
      course_description: [''],
      url: [''],
      username: [''],
      password: [''],
    });
  
    this.trainingForm.get('training_schedule').valueChanges.subscribe((value) => {
      this.ngZone.run(() => {
        const urlControl = this.trainingForm.get('url');
        const usernameControl = this.trainingForm.get('username');
        const passwordControl = this.trainingForm.get('password');
        const courseControl = this.trainingForm.get('course');
        const trainingCategoryControl = this.trainingForm.get('training_category');
        const trainingTypeControl = this.trainingForm.get('training_type');
  
        // Reset validation and values for URL, Username, Password, Course, Training Category, and Training Type controls
        urlControl.clearValidators();
        usernameControl.clearValidators();
        passwordControl.clearValidators();
        courseControl.clearValidators();
        trainingCategoryControl.clearValidators();
        trainingTypeControl.clearValidators();
  
        urlControl.reset();
        usernameControl.reset();
        passwordControl.reset();
        courseControl.reset();
        trainingCategoryControl.reset();
        trainingTypeControl.reset();
  
        // Apply validation based on the selected value of Training Schedule
        if (value === 'ON-REQUEST') {
          urlControl.setValidators([Validators.required]);
          usernameControl.setValidators([Validators.required]);
          passwordControl.setValidators([Validators.required]);
          courseControl.setValidators([Validators.required]);
          trainingCategoryControl.setValidators([Validators.required]);
          trainingTypeControl.setValidators([Validators.required]);
        } else if (value === 'EXTERNAL') {
          urlControl.setValidators([Validators.required]);
          usernameControl.setValidators([Validators.required]);
          passwordControl.setValidators([Validators.required]);
          courseControl.setValidators([Validators.required]);
  
          // Disable fields without validation when External is selected
          ['prerequisites', 'course_description', 'daily_hrs', 'total_days', 'trainer_names', 'training_type', 'training_category'].forEach((controlName) => {
            const control = this.trainingForm.get(controlName);
            control.disable();
          });
        } else if (value === 'PRE-DEFINED') {
          // Apply validators to specific fields for PRE-DEFINED
          ['training_category', 'training_type', 'training_schedule', 'course', 'trainer_names', 'daily_hrs', 'total_days'].forEach((controlName) => {
            const control = this.trainingForm.get(controlName);
           
            control.setValidators(null); // Clear validators for these fields
            control.updateValueAndValidity();
          });
        } else {
          // Enable all fields when neither ON-REQUEST nor EXTERNAL nor PRE-DEFINED is selected
          ['prerequisites', 'course_description', 'daily_hrs', 'total_days', 'trainer_names', 'training_type', 'training_category'].forEach((controlName) => {
            const control = this.trainingForm.get(controlName);
            control.enable();
            control.setValidators(null); // Clear validators for these fields
            control.updateValueAndValidity();
          });
        }
  
        // Update the validation state for URL, Username, Password, Course, Training Category, and Training Type controls
        urlControl.updateValueAndValidity();
        usernameControl.updateValueAndValidity();
        passwordControl.updateValueAndValidity();
        courseControl.updateValueAndValidity();
        trainingCategoryControl.updateValueAndValidity();
        trainingTypeControl.updateValueAndValidity();
      });
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
          alert('Training added successfully');
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

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
