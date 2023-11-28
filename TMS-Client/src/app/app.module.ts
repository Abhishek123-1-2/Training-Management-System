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
import { AdminEmployeeFeedbackComponent } from "./pages/admin_employee_feedback/admin_employee-feedback.component";
import { AdminRegistrationComponent } from "./pages/admin_registration/admin_registration.component";
import { AdminTrainerFeedbackComponent } from "./pages/admin_trainer_feedback/admin_trainer_feedback.component";
import { StudentListComponent } from "./pages/student_list/student_list.component";
import { StudentList1Component } from "./pages/student_list1/student_list1.component";
import { AddParticipantsComponent } from "./pages/add_participants/add_participants.component";
import { TimeFormatPipe } from "./pages/admin-training/schedule-training/schedule-training.pipe";
import { ScheduleTrainingComponent } from "./pages/admin-training/schedule-training/schedule-training.component";

@NgModule({
  declarations: [

    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
  
    
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
