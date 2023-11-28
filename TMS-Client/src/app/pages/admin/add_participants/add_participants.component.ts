import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-participants-cmp',
  moduleId: module.id,
  templateUrl: 'add_participants.component.html'
})
export class AddParticipantsComponent {
    addParticipantsForm : FormGroup;

    constructor(private http: HttpClient,private fb: FormBuilder) {}

    ngOnInit(): void {
        this.addParticipantsForm = this.fb.group({
            empCode: ['', Validators.required],
            empName: ['', Validators.required],
            courseName: ['', Validators.required],
            schDate: ['', Validators.required],
            status: ['', Validators.required]
        })
    }

  participants: any[] = [
    { emp_code: '', emp_name: '', c_name: '', reg_date: '', status: '', comments: '' },
  ];

  

  onEmpCodeChange(index: number) {
    const empCode = this.participants[index].emp_code;
    if (empCode) {
      this.http.get<any[]>(`http://localhost:8083/api/employees/${empCode}`).subscribe(
        (employees) => {
          if (employees && employees.length > 0) {
            // Assuming the response contains empName
            this.participants[index].emp_name = employees[0].empName;
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

  addParticipants() {
    // Implement the logic to add a participant here
  }
}
