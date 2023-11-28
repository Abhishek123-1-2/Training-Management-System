import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'add-participants-cmp',
  moduleId: module.id,
  templateUrl: 'add_participants.component.html'
})
export class AddParticipantsComponent {
    addParticipantsForm : FormGroup;

    constructor(private fb: FormBuilder){}

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
        { emp_code: '', emp_name: '', c_name: '', sch_date: '', status: '',comments: '' },
    ];
    newParticipantName: string = '';
    participantName: string = '';

    addParticipants() {
        // Implement the logic to add a participant here
      }
}
