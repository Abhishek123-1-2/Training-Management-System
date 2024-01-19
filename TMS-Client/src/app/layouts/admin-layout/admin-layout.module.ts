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
import { HrDashboardComponent } from 'app/pages/hr/hr-dashboard/hr-dashboard.component';
import { TrainingRecordComponent } from 'app/pages/admin/training-record/training-record.component';
import { EmployeeSearchComponent } from 'app/pages/admin/employee-search/employee-search.component';
import { OngoingTrainingComponent } from 'app/pages/trainer/ongoing-training/ongoing-training.component';
import { StudentList2Component } from 'app/pages/trainer/student-list2/student-list2.component';
import { TypeComponent } from 'app/pages/admin/type/type.component';
import { TIDComponent } from 'app/pages/admin/TID/tid.component';
import { OnRequestComponent } from 'app/pages/employee/on-request/on-request.component';
import { TrainingHistoryComponent } from 'app/pages/employee/training-history/training-history.component';
import { StudentList3Component } from 'app/pages/trainer/student-list3/student-list3.component';
import { UpcomingTrainingComponent } from 'app/pages/trainer/upcoming-training/upcoming-training.component';
import { TrainerFeedbackToEmployeeComponent } from 'app/pages/trainer/trainer-feedback-to-employee/trainer-feedback-to-employee.component';
import { CompletedTrainingComponent } from 'app/pages/trainer/completed-training/completed-training.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { TrainingRequestComponent } from 'app/pages/manager/training-request/training-request.component';
import { TrainingRequest1Component } from 'app/pages/manager/training-request1/training-request1.component';
import { ApprovedRequestComponent } from 'app/pages/manager/approved-request/approved-request.component';
import { FeedbackToEmployeeComponent } from 'app/pages/trainer/feedback-to-employee/feedback-to-employee.component';
import { EmployeeFeedbackDetailsComponent } from 'app/pages/admin/employee_feedback_details/employee_feedback_details.component';
import { FeedbackFormComponent } from 'app/pages/employee/feedback-form/feedback-form.component';
import { ReportMainComponent } from 'app/pages/trainer/report-main/report-main.component';
import { ReportOfEmployeeComponent } from 'app/pages/trainer/report-emp/report-emp.component';
import { ReportOfCoursesComponent } from 'app/pages/trainer/report-courses/report-courses.component';
import { AttendanceRecordComponent } from 'app/pages/admin/attendance-record/attendance-record.component';
import { TrainerTrainingDetailsComponent } from 'app/pages/trainer/trainer-training-details/trainer-training-details.component';
import { Attendance2Component } from 'app/pages/hr/attendance2/attendance2.component';
import { AttendanceComponent } from 'app/pages/hr/attendance/attendance.component';
import { ParticipantsListComponent } from 'app/pages/admin/participants-list/participants-list.component';
import { ViewTrainingComponent } from 'app/pages/admin/view-training/view-training.component';
import { TrainingViewComponent } from 'app/pages/hr/training-view/training-view.component';
import { HrTrainingHistoryComponent } from 'app/pages/hr/hr-training-history/hr-training-history.component';
import { ManagerEmployeeHistoryComponent } from 'app/pages/manager/manager-employee-history/manager-employee-history.component';
import { ManagerTrainingHistoryComponent } from 'app/pages/manager/manager-training-history/manager-training-history.component';
import { ManagerTrainingRecordComponent } from 'app/pages/manager/manager-training-record/manager-training-record.component';
import { UserDashboardComponent } from 'app/pages/employee/user-dashboard/user-dashboard.component';
import { FeedbackComponent } from 'app/pages/employee/feedback/feedback.component';
import { ViewDetailsComponent } from 'app/pages/employee/view-details/view-details.component';
import { EmployeeFeedbackComponent } from 'app/pages/admin/employee-feedback/employee-feedback.component';
import { ExternalCourseComponent } from 'app/pages/employee/external-course/external-course.component';
import { ManagerExternalCourseComponent } from 'app/pages/manager/manager-external-course/manager-external-course.component';



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
    AdminEmployeeFeedbackComponent,
    AdminRegistrationComponent,
    AdminTrainerFeedbackComponent,
    StudentListComponent,
    StudentList1Component,
    AddParticipantsComponent,
    TimeFormatPipe,
    ScheduleTrainingComponent,
    AddTrainingComponent,
    // TrainerDashboardComponent,
    ScheduleListComponent,
    AdminTrainingHistoryComponent,
    CourseDetailsComponent,
    EmployeeHistoryComponent,
    HrDashboardComponent,
    TrainingRecordComponent,
    EmployeeSearchComponent,
    OngoingTrainingComponent,
    StudentList2Component,
    TrainingRecordComponent,
    AdminAttendanceComponent,
    UpcomingTrainingComponent,
    TrainerFeedbackToEmployeeComponent,
    CompletedTrainingComponent,
    AdminAttendanceComponent,
    EmployeeFeedbackDetailsComponent,
    FeedbackFormComponent,
    OnRequestComponent,
    TrainingHistoryComponent,
    LoginComponent,
    FeedbackToEmployeeComponent,
    StudentList3Component,
    UpcomingTrainingComponent,
    ReportMainComponent,
    ReportOfEmployeeComponent,
    ReportOfCoursesComponent,
    TrainingRequest1Component,
    TrainingRequestComponent,
    ApprovedRequestComponent,
    ReportMainComponent,
    ReportOfEmployeeComponent,
    ReportOfCoursesComponent,
    TrainerTrainingDetailsComponent,
    AttendanceComponent,
    Attendance2Component,
    ParticipantsListComponent,
    AttendanceRecordComponent,
    CourseDetailsComponent,
    EmployeeFeedbackDetailsComponent,
    ViewTrainingComponent,
    TrainingViewComponent,
    HrTrainingHistoryComponent,
    ManagerEmployeeHistoryComponent,
    ManagerTrainingHistoryComponent,
    ManagerTrainingRecordComponent,
    UserDashboardComponent,
    FeedbackComponent,
    EmployeeFeedbackComponent,
    ExternalCourseComponent,
    ManagerExternalCourseComponent,



    
    
    
    
    
  ]
})

export class AdminLayoutModule {}
