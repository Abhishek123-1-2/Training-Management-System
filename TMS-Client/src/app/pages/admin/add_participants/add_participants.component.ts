import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  course: string;
  trainer: string;
  s_date: string;
  e_date: string;
  filteredEmployeeNames: string[] = [];
  // participants: any[] = [
  //   { emp_code: '', emp_name: '',  course_name: '', reg_date: '', status: '', comments: '' },
  // ];

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private router: Router,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.course = this.route.snapshot.paramMap.get('course') || null;
    this.trainer = this.route.snapshot.paramMap.get('trainer') || null;
    this.s_date = this.route.snapshot.paramMap.get('s_date') || null;
    this.e_date = this.route.snapshot.paramMap.get('e_date') || null;
    this.addParticipantsForm = this.fb.group({
      cName: [this.course,[Validators.required]],
      tName:[this.trainer, [Validators.required]],
      empCode: ['', [Validators.required]],
      empName: ['', [Validators.required]],
      startDate: [this.s_date,[Validators.required]],
      endDate: [this.e_date, [Validators.required]],
      regDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      comments: [''] 
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

    this.addParticipantsForm.get('empName').valueChanges.subscribe((value) => {
      this.filterEmployeeNames(value);
    });
  }

// Inside your Angular component
// closeAutocompleteList() {
//   this.filteredEmployeeNames = [];
// }
// Inside your Angular component
closeAutocompleteList(autocompleteList: any) {
  autocompleteList.style.display = 'none';
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
  filterEmployeeNames(value: string) {
    if (value) {
      this.http.get<string[]>(`http://localhost:8083/api/employees/names?search=${value}`).subscribe(
        (employeeNames) => {
          this.filteredEmployeeNames = employeeNames;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching employee names', error);
        }
      );
    } else {
      this.filteredEmployeeNames = [];
    }
  }

  onEmpNameSelect(selectedName: string) {
    const apiUrl = `http://localhost:8083/api/employees/codeByName?empName=${selectedName}`;

    this.http.get<string>(apiUrl).subscribe(
      (empCode) => {
        if (empCode) {
          this.addParticipantsForm.get('empCode').setValue(empCode);
        } else {
          console.error('No employee found with the provided empName');
        }
      },
      (error) => {
        console.error('Error fetching employee code', error);
      }
    );
  }
  onCourseNameChange(index: number, selectedCourse: string) {
    this.http.get<number>(`http://localhost:8083/api/training-views/training-id?course=${selectedCourse}`).subscribe(
      (trainingId) => {
        // this.participants[index].training_id = trainingId;
        this.addParticipantsForm[index].get('trainingId').setValue(trainingId);
        console.log(`Fetched Training ID for ${selectedCourse}: ${trainingId}`);

        this.http.get<number>(`http://localhost:8083/api/training-views/schedule-id?trainingId=${trainingId}`).subscribe(
          (scheduleId) => {
            // this.participants[index].schedule_id = scheduleId;
            this.addParticipantsForm[index].get('scheduleId').setValue(scheduleId);
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

  onSubmit() {
    if (this.addParticipantsForm.valid) {
      const selectedEmpCode = this.addParticipantsForm.get('empCode').value;
  
      this.fetchEmpIdAndSetForRegistration(selectedEmpCode, (empId) => {
        const selectedCourse = this.addParticipantsForm.get('cName').value;
  
        this.http.get<number>(`http://localhost:8083/api/training-views/training-id-by-course?courseName=${selectedCourse}`).subscribe(
          (trainingId) => {
            const selectedTrainer = this.addParticipantsForm.get('tName').value;
  
            this.fetchScheduleIdByTrainer(selectedTrainer, (scheduleId) => {
              const regDateControl = this.addParticipantsForm.get('regDate');
              const registration_date = regDateControl ? regDateControl.value : null;
  
              const commentsControl = this.addParticipantsForm.get('comments');
              const registration_comments = commentsControl ? commentsControl.value : null;
  
              const statusControl = this.addParticipantsForm.get('status');
              const registration_status = statusControl ? statusControl.value : null;
  
              const registrationData = {
                schedule_id: scheduleId,
                training_id: trainingId,
                emp_id: empId,
                registration_date: registration_date,
                registration_comments: registration_comments,
                registration_status: registration_status,
                registration_response: null
              };
  
              this.http.post('http://localhost:8083/api/registrations/register', registrationData).subscribe(
                (response) => {
                  const employeeName = this.addParticipantsForm.get('empName').value;
                  const courseName = this.addParticipantsForm.get('cName').value;
                  alert(`${employeeName} has been registered successfully for ${courseName}`);
                  this.addParticipantsForm.reset();
                },
                (error) => {
                  console.error('Error adding data:', error);
                }
              );
            });
          },
          (error) => {
            console.error('Error fetching training ID', error);
          }
        );
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  fetchEmpIdAndSetForRegistration(selectedCode: string, callback: (empId: number) => void) {
    const apiUrl = `http://localhost:8083/api/employees/id/${selectedCode}`;
  
    this.http.get<number>(apiUrl).subscribe(
      (empId) => {
        if (empId) {
          console.log(`Fetched Employee ID for ${selectedCode}: ${empId}`);
          callback(empId);
        } else {
          console.error('No employee found with the provided empCode');
        }
      },
      (error) => {
        console.error('Error fetching employee details', error);
      }
    );
  }
  fetchScheduleIdByTrainer(trainerName: string, callback: (scheduleId: number) => void) {
    const apiUrl = `http://localhost:8083/api/training-views/schedule-id-by-trainer?trainerName=${trainerName}`;
  
    this.http.get<number>(apiUrl).subscribe(
      (scheduleId) => {
        if (scheduleId) {
          console.log(`Fetched Schedule ID for Trainer ${trainerName}: ${scheduleId}`);
          callback(scheduleId);
        } else {
          console.error('No schedule ID found for the provided trainer name');
        }
      },
      (error) => {
        console.error('Error fetching schedule ID', error);
      }
    );
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
 
  
}
