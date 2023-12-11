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
import { TimeFormatPipe } from 'app/pages/admin/schedule-training/schedule-training.pipe';
import { ScheduleTrainingComponent } from 'app/pages/admin/schedule-training/schedule-training.component';
import { AddTrainingComponent } from 'app/pages/admin/add-training/add-training.component';
import { TrainerDashboardComponent } from 'app/pages/trainer/trainer-dashboard/trainer-dashboard.component';
// import { TIDComponent } from 'app/pages/admin/view-training/TID/tid.component';
// import { TypeComponent } from 'app/pages/admin/view-training/TID/type/type.component';
import { ScheduleListComponent } from 'app/pages/admin/schedule-list/schedule-list.component';
import { AdminTrainingHistoryComponent } from 'app/pages/admin/admin-training-history/admin-training-history.component';
import { CourseDetailsComponent } from 'app/pages/admin/course-details/course-details.component';
import { EmployeeHistoryComponent } from 'app/pages/admin/employee-history/employee-history.component';
import { TrainerFeedbackComponent } from 'app/pages/hr/trainer-feedback/trainer-feedback.component';
import { HrDashboardComponent } from 'app/pages/hr/hr-dashboard/hr-dashboard.component';
import { TrainingRecordComponent } from 'app/pages/admin/training-record/training-record.component';
import { EmployeeSearchComponent } from 'app/pages/admin/employee-search/employee-search.component';
import { OngoingTrainingComponent } from 'app/pages/trainer/ongoing-training/ongoing-training.component';
import { StudentList2Component } from 'app/pages/trainer/student-list2/student-list2.component';
import { EmployeeFeedbackComponent } from 'app/pages/hr/employee-feedback/employee-feedback.component';
import { TypeComponent } from 'app/pages/admin/type/type.component';
import { TIDComponent } from 'app/pages/admin/TID/tid.component';
import { OnRequestComponent } from 'app/pages/employee/on-request/on-request.component';
import { TrainingHistoryComponent } from 'app/pages/employee/training-history/training-history.component';
import { StudentList3Component } from 'app/pages/trainer/student-list3/student-list3.component';
import { UpcomingTrainingComponent } from 'app/pages/trainer/upcoming-training/upcoming-training.component';
import { TrainerFeedbackToEmployeeComponent } from 'app/pages/trainer/trainer-feedback-to-employee/trainer-feedback-to-employee.component';
import { CompletedTrainingComponent } from 'app/pages/trainer/completed-training/completed-training.component';


@NgModule({//
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
    ScheduleListComponent,
    AdminTrainingHistoryComponent,
    CourseDetailsComponent,
    EmployeeHistoryComponent,
    TrainerFeedbackComponent,
    HrDashboardComponent,
    TrainingRecordComponent,
    EmployeeSearchComponent,
    OngoingTrainingComponent,
    StudentList2Component,
    TrainingRecordComponent,
    EmployeeFeedbackComponent,
    TypeComponent,
    TIDComponent,
    TrainingHistoryComponent,
    StudentList3Component,
    UpcomingTrainingComponent,
    TrainerFeedbackToEmployeeComponent,
    CompletedTrainingComponent,

    
    
    
    
  ]
})

export class AdminLayoutModule {}
