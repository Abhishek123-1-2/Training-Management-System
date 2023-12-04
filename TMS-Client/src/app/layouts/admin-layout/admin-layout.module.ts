import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent }       from '../../pages/admin/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';
import { AdminEmployeeFeedbackComponent } from 'app/pages/admin/admin_employee_feedback/admin_employee-feedback.component';
import { AdminRegistrationComponent } from 'app/pages/admin/admin_registration/admin_registration.component';
import { AdminTrainerFeedbackComponent } from 'app/pages/admin/admin_trainer_feedback/admin_trainer_feedback.component';
import { StudentListComponent } from 'app/pages/admin/student_list/student_list.component';
import { StudentList1Component } from 'app/pages/admin/student_list1/student_list1.component';
import { AddParticipantsComponent } from 'app/pages/admin/add_participants/add_participants.component';
import { ViewTrainingComponent } from 'app/pages/admin/view-training/view-training.component';
import { AdminAttendanceComponent } from 'app/pages/admin/admin-attendance/admin-attendance.component';
import { TimeFormatPipe } from 'app/pages/admin/schedule-list/schedule-training/schedule-training.pipe';
import { ScheduleTrainingComponent } from 'app/pages/admin/schedule-list/schedule-training/schedule-training.component';
import { AddTrainingComponent } from 'app/pages/admin/add-training/add-training.component';
import { TrainerDashboardComponent } from 'app/pages/trainer/trainer-dashboard/trainer-dashboard.component';
import { TableFilterService } from 'app/pages/admin/filtersearch/filterpipe.component';
import { TIDComponent } from 'app/pages/admin/view-training/TID/tid.component';
import { TypeComponent } from 'app/pages/admin/view-training/TID/type/type.component';
import { ScheduleListComponent } from 'app/pages/admin/schedule-list/schedule-list.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    
    
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
    AdminEmployeeFeedbackComponent,
    AdminRegistrationComponent,
    AdminTrainerFeedbackComponent,
    StudentListComponent,
    StudentList1Component,
    AddParticipantsComponent,
    TimeFormatPipe,
    ScheduleTrainingComponent,
    AddTrainingComponent,
    TrainerDashboardComponent,
    TIDComponent,
    TypeComponent,
    ScheduleListComponent,

    
    
    
  ]
})

export class AdminLayoutModule {}
