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
import { FeedbackComponent } from './pages/employee/feedback/feedback.component';
import { UserDashboardComponent } from './pages/employee/user-dashboard/user-dashboard.component';
import { FeedbackDetailsComponent } from './pages/admin/feedback-details/feedback-details.component';
import { EmployeeFeedbackDetailsComponent } from "./pages/admin/employee_feedback_details/employee_feedback_details.component";
import { AttendanceRecordComponent } from './pages/admin/attendance-record/attendance-record.component';

@NgModule({
  declarations: [

    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    FeedbackComponent,
    UserDashboardComponent,
    FeedbackDetailsComponent,
    EmployeeFeedbackDetailsComponent,
    AttendanceRecordComponent,
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
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
