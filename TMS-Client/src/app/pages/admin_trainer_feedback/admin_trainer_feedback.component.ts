import { Component } from '@angular/core'

declare interface TableData {
    headerRow: string[];
    dataRows: {
        t_id: string;
        t_name: string;
        s_date: string;
        e_date: string;
        t_status: string;
        view_attendees: string;
    }[];
}

interface TableRow {
    t_id: string;
    t_name: string;
    s_date: string;
    e_date: string;
    t_status: string;
    view_attendees: string;
}
@Component({
    selector: 'admin-trainer-feedback-cmp',
    moduleId: module.id,
    templateUrl: 'admin_trainer_feedback.component.html'
})

export class AdminTrainerFeedbackComponent{
    public tableData1: TableData;
    public filteredData: TableRow[];
    public searchValue: string = '';

    ngOnInit(){
        this.tableData1 = {
            headerRow: ['Training ID', 'Trainer Name', 'Start Date', 'End Date', 'Training Status', 'View Attendees'],
            dataRows: [
                {t_id:'T101', t_name:'Amisha Jangipuria', s_date:'11-11-2023', e_date:'20-11-2023',t_status:'COMPLETED',view_attendees:'View'},
                { t_id: 'T102', t_name: 'John Smith', s_date: '15-11-2023', e_date: '25-11-2023', t_status: 'ON-GOING', view_attendees: 'View' },
                { t_id: 'T103', t_name: 'Alice Johnson', s_date: '18-11-2023', e_date: '28-11-2023', t_status: 'UPCOMING', view_attendees: 'View' },
                { t_id: 'T104', t_name: 'Michael Brown', s_date: '22-11-2023', e_date: '02-12-2023', t_status: 'UPCOMING', view_attendees: 'View' },
            ]
        };
        this.filteredData = [...this.tableData1.dataRows]
    }
    applyFilter() {
        this.filteredData = this.tableData1.dataRows.filter(row =>
          Object.values(row).some(value =>
            value.toString().toLowerCase().includes(this.searchValue.toLowerCase())
          )
        );
      }
}