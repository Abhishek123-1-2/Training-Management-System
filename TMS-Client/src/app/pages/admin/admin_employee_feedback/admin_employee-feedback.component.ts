import { Component } from '@angular/core'

declare interface TableData {
    headerRow: string[];
    dataRows: {
        t_id: string;
        c_name: string;
        t_name: string;
        s_date: string;
        e_date: string;
        t_status: string;
        view_attendees: string;
    }[];
}

interface TableRow {
    t_id: string;
    c_name: string;
    t_name: string;
    s_date: string;
    e_date: string;
    t_status: string;
    view_attendees: string;
}
@Component({
    selector: 'admin-employee-feedback-cmp',
    moduleId: module.id,
    templateUrl: 'admin_employee_feedback.component.html'
})

export class AdminEmployeeFeedbackComponent{
    public tableData1: TableData;
    public filteredData: TableRow[];
    public searchValue: string = '';

    ngOnInit(){
        this.tableData1 = {
            headerRow: ['Training ID', 'Course Name', 'Trainer Name', 'Start Date', 'End Date', 'Training Status', 'View Attendees'],
            dataRows: [
                { t_id: 'T101',   c_name: 'Angular',      t_name: 'Amisha Jangipuria', s_date: '11-11-2023',  e_date: '20-11-2023', t_status: 'COMPLETED', view_attendees: 'View'},
                { t_id: 'T102',   c_name: 'Node JS',      t_name: 'John Smith',        s_date: '15-11-2023',  e_date: '25-11-2023', t_status: 'ON-GOING',  view_attendees: 'View' },
                { t_id: 'T103',   c_name: 'HTML CSS',     t_name: 'Alice Johnson',     s_date: '18-11-2023',  e_date: '28-11-2023', t_status: 'UPCOMING',  view_attendees: 'View' },
                { t_id: 'T104',   c_name: 'Data Science', t_name: 'Michael Brown',     s_date: '22-11-2023',  e_date: '02-12-2023', t_status: 'UPCOMING',  view_attendees: 'View' },
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