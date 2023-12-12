import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-participants-cmp',
  moduleId: module.id,
  templateUrl: 'add_participants.component.html'
})
export class AddParticipantsComponent {
  addParticipantsForm: FormGroup;
  employeeCodes: string[] = [];
  courseNames: string[] = [];
  // participants: any[] = [
  //   { emp_code: '', emp_name: '',  course_name: '', reg_date: '', status: '', comments: '' },
  // ];
  participantForms: FormGroup[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addParticipantsForm = this.fb.group({
      empCode: ['', Validators.required],
      empName: ['', Validators.required],
      courseName: ['', Validators.required],
      schDate: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.participantForms.push(this.createParticipantForm());

    this.http.get<string[]>('http://localhost:8083/api/employees/codes').subscribe(
      (codes) => {
        this.employeeCodes = codes;
      },
      (error) => {
        console.error('Error fetching employee codes', error);
      }
    );

    this.http.get<string[]>('http://localhost:8083/api/training-views/courses').subscribe(
      (courses) => {
        this.courseNames = courses;
      },
      (error) => {
        console.error('Error fetching training courses', error);
      }
    );
  }

  createParticipantForm(): FormGroup {
    return this.fb.group({
      empCode: ['', Validators.required],
      empName: ['', Validators.required],
      courseName: ['', Validators.required],
      schDate: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onEmpCodeChange(index: number, selectedCode: string) {
    if (selectedCode) {
      this.http.get<any[]>(`http://localhost:8083/api/employees/${selectedCode}`).subscribe(
        (employee) => {
          if (employee && employee.length > 0) {
            // this.participants[index].emp_name = employee[0].empName;
            // this.participants[index].emp_id = employee[0].empId;
            this.participantForms[index].get('empName').setValue(employee[0].empName);
            this.participantForms[index].get('empId').setValue(employee[0].empId);
            console.log(`Fetched Employee ID for ${selectedCode}: ${employee[0].empId}`);
          } else {
            console.error('No employee found with the provided empCode');
          }
        },
        (error) => {
          console.error('Error fetching employee details', error);
        }
      );
    }
  }

  onCourseNameChange(index: number, selectedCourse: string) {
    this.http.get<number>(`http://localhost:8083/api/training-views/training-id?course=${selectedCourse}`).subscribe(
      (trainingId) => {
        // this.participants[index].training_id = trainingId;
        this.participantForms[index].get('trainingId').setValue(trainingId);
        console.log(`Fetched Training ID for ${selectedCourse}: ${trainingId}`);

        this.http.get<number>(`http://localhost:8083/api/training-views/schedule-id?trainingId=${trainingId}`).subscribe(
          (scheduleId) => {
            // this.participants[index].schedule_id = scheduleId;
            this.participantForms[index].get('scheduleId').setValue(scheduleId);
            console.log(`Fetched Schedule ID for Training ID ${trainingId}: ${scheduleId}`);
          },
          (error) => {
            console.error('Error fetching schedule ID', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching training ID', error);
      }
    );
  }
  addParticipants() {
    console.log('Participants Array:', this.participantForms);
  
    this.http.post('http://localhost:8083/api/registration/add', this.participantForms).subscribe(
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
