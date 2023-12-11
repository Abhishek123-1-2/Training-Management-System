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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminEmployeeFeedbackComponent } from "./pages/admin/admin_employee_feedback/admin_employee-feedback.component";
import { AdminRegistrationComponent } from "./pages/admin/admin_registration/admin_registration.component";
import { AdminTrainerFeedbackComponent } from "./pages/admin/admin_trainer_feedback/admin_trainer_feedback.component";
import { StudentListComponent } from "./pages/admin/student_list/student_list.component";
// import { StudentList1Component } from "./pages/admin/student_list1/student_list1.component";
import { AddParticipantsComponent } from "./pages/admin/add_participants/add_participants.component";
import { TimeFormatPipe } from "./pages/admin/schedule-list/schedule-training/schedule-training.pipe";
import { ScheduleTrainingComponent } from "./pages/admin/schedule-list/schedule-training/schedule-training.component";
import { TrainerDashboardComponent } from './pages/trainer/trainer-dashboard/trainer-dashboard.component';
import { FeedbackComponent } from './pages/employee/feedback/feedback.component';
import { FeedbackDetailsComponent } from './pages/admin/feedback-details/feedback-details.component';
import { EmployeeFeedbackDetailsComponent } from "./pages/admin/employee_feedback_details/employee_feedback_details.component";
import { AttendanceRecordComponent } from './pages/admin/attendance-record/attendance-record.component';
import { UserDashboardComponent } from "./pages/employee/user-dashboard/user-dashboard.component";

import { TrainerFeedbackComponent } from './pages/hr/trainer-feedback/trainer-feedback.component';

import { AdminTrainingHistoryComponent } from './pages/admin/admin-training-history/admin-training-history.component';
import { EmployeeSearchComponent } from './pages/admin/employee-search/employee-search.component';
import { CourseDetailsComponent } from './pages/admin/course-details/course-details.component';
import { TrainingRecordComponent } from './pages/admin/training-record/training-record.component';
import { EmployeeHistoryComponent } from './pages/admin/employee-history/employee-history.component';
import { StudentList2Component } from './pages/trainer/student-list2/student-list2.component';
import { EmployeeFeedbackComponent } from './pages/hr/employee-feedback/employee-feedback.component';
import { HrFeedbackComponent } from "./pages/hr/hr-feedback/hr-feedback.component";
import { HrTrainingComponent } from './pages/hr/hr-training/hr-training.component';
import { TrainingViewComponent } from './pages/hr/training-view/training-view.component';

import { UpcomingTrainingComponent } from './pages/trainer/upcoming-training/upcoming-training.component';
import { CompletedTrainingComponent } from './pages/trainer/completed-training/completed-training.component';
import { TrainerFeedbackToEmployeeComponent } from './pages/trainer/trainer-feedback-to-employee/trainer-feedback-to-employee.component';
import { StudentList3Component } from './pages/trainer/student-list3/student-list3.component';
import { FeedbackToEmployeeComponent } from './pages/trainer/feedback-to-employee/feedback-to-employee.component';
import { ManagerDashboardComponent } from './pages/manager/manager-dashboard/manager-dashboard.component';
import { TrainingRequestComponent } from './pages/manager/training-request/training-request.component';
import { TrainingRequest1Component } from './pages/manager/training-request1/training-request1.component';
import { ApprovedRequestComponent } from './pages/manager/approved-request/approved-request.component';


@NgModule({
  declarations: [

    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    FeedbackComponent,
    FeedbackDetailsComponent,
    EmployeeFeedbackDetailsComponent,
    AttendanceRecordComponent,
    UserDashboardComponent,
    HrTrainingComponent,
    TrainingViewComponent,
    ManagerDashboardComponent,
    TrainingRequestComponent,
    TrainingRequest1Component,
    ApprovedRequestComponent

  
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
