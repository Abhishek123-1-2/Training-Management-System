import { Component } from '@angular/core';

@Component({
    selector: 'add-participants-cmp',
    moduleId: module.id,
    templateUrl: 'add_participants.component.html'
})
export class AddParticipantsComponent {
    participants: any[] = [
        { emp_code: '', emp_name: '', c_name: '', reg_date: '', status: '',comments: '' },
    ];
    newParticipantName: string = '';
    participantName: string = '';

    addParticipants() {
        // Implement the logic to add a participant here
      }
}
