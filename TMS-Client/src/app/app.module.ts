import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';


import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminEmployeeFeedbackComponent } from "./pages/admin/admin_employee_feedback/admin_employee-feedback.component";
import { AdminRegistrationComponent } from "./pages/admin/admin_registration/admin_registration.component";
import { AdminTrainerFeedbackComponent } from "./pages/admin/admin_trainer_feedback/admin_trainer_feedback.component";
import { StudentListComponent } from "./pages/admin/student_list/student_list.component";
// import { StudentList1Component } from "./pages/admin/student_list1/student_list1.component";
import { AddParticipantsComponent } from "./pages/admin/add_participants/add_participants.component";
import { TimeFormatPipe } from "./pages/admin/schedule-training/schedule-training.pipe";
import { ScheduleTrainingComponent } from "./pages/admin/schedule-training/schedule-training.component";
import { TrainerDashboardComponent } from './pages/trainer/trainer-dashboard/trainer-dashboard.component';
import { FeedbackComponent } from './pages/employee/feedback/feedback.component';
import { FeedbackDetailsComponent } from './pages/admin/feedback-details/feedback-details.component';
import { EmployeeFeedbackDetailsComponent } from "./pages/admin/employee_feedback_details/employee_feedback_details.component";
import { AttendanceRecordComponent } from './pages/admin/attendance-record/attendance-record.component';
import { UserDashboardComponent } from "./pages/employee/user-dashboard/user-dashboard.component";


import { AdminTrainingHistoryComponent } from './pages/admin/admin-training-history/admin-training-history.component';
import { EmployeeSearchComponent } from './pages/admin/employee-search/employee-search.component';
import { CourseDetailsComponent } from './pages/admin/course-details/course-details.component';
import { TrainingRecordComponent } from './pages/admin/training-record/training-record.component';
import { EmployeeHistoryComponent } from './pages/admin/employee-history/employee-history.component';
import { StudentList2Component } from './pages/trainer/student-list2/student-list2.component';
import { TrainingViewComponent } from './pages/hr/training-view/training-view.component';
import { HrDashboardComponent } from "./pages/hr/hr-dashboard/hr-dashboard.component";
// import { NgxPaginationModule } from "ngx-pagination";

import { UpcomingTrainingComponent } from './pages/trainer/upcoming-training/upcoming-training.component';
import { CompletedTrainingComponent } from './pages/trainer/completed-training/completed-training.component';
import { TrainerFeedbackToEmployeeComponent } from './pages/trainer/trainer-feedback-to-employee/trainer-feedback-to-employee.component';
import { StudentList3Component } from './pages/trainer/student-list3/student-list3.component';
import { FeedbackToEmployeeComponent } from './pages/trainer/feedback-to-employee/feedback-to-employee.component';
import { AttendanceComponent } from './pages/hr/attendance/attendance.component';
import { Attendance2Component } from './pages/hr/attendance2/attendance2.component';
import { OnRequestComponent } from "./pages/employee/on-request/on-request.component";
import { ManagerDashboardComponent } from './pages/manager/manager-dashboard/manager-dashboard.component';
import { TrainingRequestComponent } from './pages/manager/training-request/training-request.component';
import { TrainingRequest1Component } from './pages/manager/training-request1/training-request1.component';
import { ApprovedRequestComponent } from './pages/manager/approved-request/approved-request.component';
import { TrainerTrainingDetailsComponent } from './pages/trainer/trainer-training-details/trainer-training-details.component';
import { ConfirmationstatusDetailsComponent } from './pages/employee/confirmationstatus-details/confirmationstatus-details.component';
import { ManagerTrainingHistoryComponent } from './pages/manager/manager-training-history/manager-training-history.component';
import { ManagerEmployeeHistoryComponent } from './pages/manager/manager-employee-history/manager-employee-history.component';
import { ManagerTrainingRecordComponent } from './pages/manager/manager-training-record/manager-training-record.component';


@NgModule({
  declarations: [

    AppComponent,
    AdminLayoutComponent,
    FeedbackComponent,
    FeedbackDetailsComponent,
    UserDashboardComponent,
    ConfirmationstatusDetailsComponent,
    ManagerTrainingHistoryComponent,
    ManagerEmployeeHistoryComponent,
    ManagerTrainingRecordComponent,
    


  
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
