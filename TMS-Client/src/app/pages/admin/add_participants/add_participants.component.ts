import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'add-participants-cmp',
  moduleId: module.id,
  templateUrl: 'add_participants.component.html'
})
export class AddParticipantsComponent {
  addParticipantsForm: FormGroup;
  employeeCodes: string[] = [];
  courseNames: string[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.addParticipantsForm = this.fb.group({
      empCode: ['', Validators.required],
      empName: ['', Validators.required],
      courseName: ['', Validators.required],
      schDate: ['', Validators.required],
      status: ['confirmed', Validators.required], // Default value for status
      comments: [''], // Optional, can be removed if not needed
    });

    this.http.get<string[]>('http://localhost:8083/api/employees/codes').subscribe(
      (codes) => {
        this.employeeCodes = codes;
        console.log('Employee Codes:', this.employeeCodes);
      },
      (error) => {
        console.error('Error fetching employee codes', error);
      }
    );

    this.http.get<string[]>('http://localhost:8083/api/training-views/courses').subscribe(
      (courses) => {
        // Filter out null values
        this.courseNames = courses.filter(course => course !== null);
      },
      (error) => {
        console.error('Error fetching training courses', error);
      }
    );
  }

  onEmpCodeChange(selectedCode: string) {
    if (selectedCode) {
      this.fetchEmpIdAndSet(selectedCode);
    }
  }

  fetchEmpIdAndSet(selectedCode: string) {
    const apiUrl = `http://localhost:8083/api/employees/id/${selectedCode}`;

    this.http.get<number>(apiUrl).subscribe(
      (empId) => {
        if (empId) {
          console.log(`Fetched Employee ID for ${selectedCode}: ${empId}`);

          this.http.get<any[]>(`http://localhost:8083/api/employees/${selectedCode}`).subscribe(
            (employee) => {
              if (employee && employee.length > 0) {
                this.addParticipantsForm.get('empName').setValue(employee[0].empName);
                console.log(`Fetched Employee Name for ${selectedCode}: ${employee[0].empName}`);
                this.cdr.detectChanges();
              } else {
                console.error('No employee found with the provided empCode');
              }
            },
            (error) => {
              console.error('Error fetching employee details', error);
            }
          );
        } else {
          console.error('No employee found with the provided empCode');
        }
      },
      (error) => {
        console.error('Error fetching employee details', error);
      }
    );
  }

  onCourseNameChange(selectedCourse: string) {
    console.log(`Course changed: ${selectedCourse}`);

    const courseName = selectedCourse.split(' - ')[0];
    console.log('Extracted courseName:', courseName);

    if (courseName) {
      const trainingIdUrl = `http://localhost:8083/api/training-views/training-id?course=${courseName}`;
      console.log(`Request URL for Training ID: ${trainingIdUrl}`);

      this.http.get<number>(trainingIdUrl).subscribe(
        (trainingId) => {
          console.log(`Training ID Response:`, trainingId);
          this.cdr.detectChanges();
          console.log(`Fetched Training ID for ${courseName}`);
        },
        (error) => {
          console.error('Error fetching training ID', error);
        }
      );
    }
  }

  addParticipants() {
    console.log('Form Value:', this.addParticipantsForm.value);

    this.http.post('http://localhost:8083/api/registration/add', this.addParticipantsForm.value).subscribe(
      (response) => {
        console.log('Data added successfully:', response);
        this.addParticipantsForm.reset();
      },
      (error) => {
        console.error('Error adding data:', error);
      }
    );
  }
}
