import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminEmployeeFeedbackComponent } from 'app/pages/admin_employee_feedback/admin_employee-feedback.component';
import { AdminRegistrationComponent } from 'app/pages/admin_registration/admin_registration.component';
import { AdminTrainerFeedbackComponent } from 'app/pages/admin_trainer_feedback/admin_trainer_feedback.component';
import { StudentListComponent } from 'app/pages/student_list/student_list.component';
import { StudentList1Component } from 'app/pages/student_list1/student_list1.component';
import { AddParticipantsComponent } from 'app/pages/add_participants/add_participants.component';
import { ViewTrainingComponent } from 'app/pages/admin-training/view-training/view-training.component';
import { viewport } from '@popperjs/core';
import { AdminAttendanceComponent } from 'app/pages/admin-attendance/admin-attendance.component';
import { AttendanceDetailsComponent } from 'app/attendance-details/attendance-details.component';
import { TimeFormatPipe } from 'app/pages/admin-training/schedule-training/schedule-training.pipe';
import { ScheduleTrainingComponent } from 'app/pages/admin-training/schedule-training/schedule-training.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,ReactiveFormsModule,
    
    
    
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    AdminAttendanceComponent,
    ViewTrainingComponent,
    AttendanceDetailsComponent,
    AdminEmployeeFeedbackComponent,
    AdminRegistrationComponent,AdminTrainerFeedbackComponent,
    StudentListComponent,
    StudentList1Component,
    AddParticipantsComponent,
    TimeFormatPipe,
    ScheduleTrainingComponent
    
  ]
})

export class AdminLayoutModule {}
