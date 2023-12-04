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
import { HrDashboardComponent } from './pages/hr/hr-dashboard/hr-dashboard.component';
import { TrainerFeedbackComponent } from './pages/hr/trainer-feedback/trainer-feedback.component';


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
    HrDashboardComponent,
    TrainerFeedbackComponent
  
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
