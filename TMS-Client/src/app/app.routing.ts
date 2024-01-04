import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminEmployeeFeedbackComponent } from './pages/admin/admin_employee_feedback/admin_employee-feedback.component';
import { AdminTrainerFeedbackComponent } from './pages/admin/admin_trainer_feedback/admin_trainer_feedback.component';
import { RegistrationDetailsComponent } from './pages/admin/registration_details/registration_details.component';
import { StudentListComponent } from './pages/admin/student_list/student_list.component';
import { EmployeeFeedbackDetailsComponent } from './pages/admin/employee_feedback_details/employee_feedback_details.component';
import { StudentList1Component } from './pages/admin/student_list1/student_list1.component';
import { CourseFeedbackComponent } from './pages/admin/course_feedback/course_feedback.component';
import { AdminRegistrationComponent } from './pages/admin/admin_registration/admin_registration.component';
import { RegistrationEditComponent } from './pages/admin/registration_edit/registration_edit.component';
import { AddParticipantsComponent } from './pages/admin/add_participants/add_participants.component';
import { LoginComponent } from './pages/login/login.component';
// import { AttendanceDetailsComponent } from './pages/admin/attendance-details/attendance-details.component';
// import { AdminTrainingComponent } from './pages/admin-training/admin-training.component';
import { AdminAttendanceComponent } from './pages/admin/admin-attendance/admin-attendance.component';
import { AddTrainingComponent } from './pages/admin/add-training/add-training.component';
import { ViewTrainingComponent } from './pages/admin/view-training/view-training.component';
import { ScheduleTrainingComponent } from './pages/admin/schedule-training/schedule-training.component';
import { UserDashboardComponent } from './pages/employee/user-dashboard/user-dashboard.component';
import { HrDashboardComponent } from './pages/hr/hr-dashboard/hr-dashboard.component';
import { AdminTrainingHistoryComponent } from './pages/admin/admin-training-history/admin-training-history.component';
import { EmployeeSearchComponent } from './pages/admin/employee-search/employee-search.component';
import { CourseDetailsComponent } from './pages/admin/course-details/course-details.component';
import { TrainingRecordComponent } from './pages/admin/training-record/training-record.component';
import { EmployeeHistoryComponent } from './pages/admin/employee-history/employee-history.component';
import { AttendanceComponent } from './pages/hr/attendance/attendance.component';
import { Attendance2Component } from './pages/hr/attendance2/attendance2.component';
import { ManagerDashboardComponent } from './pages/manager/manager-dashboard/manager-dashboard.component';
import { TrainingViewComponent } from './pages/hr/training-view/training-view.component';


export const AppRoutes: Routes = [
  {path:'login',
  component:LoginComponent
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, 
  
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
          path: '',
          loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
        },
        {
          path: 'employee-feedback',
          component: AdminEmployeeFeedbackComponent,
        },
        {
          path: 'trainer-feedback',
          component: AdminTrainerFeedbackComponent,
        },
        {
          path: 'registration_details/:regId/:empCode',
          component: RegistrationDetailsComponent,
        },
        {
          path: 'student-list/:t_id',
          component: StudentListComponent,
        },
        {
          path: 'student-list1',
          component: StudentList1Component,
        },
        {
          path: 'employee-feedback/:empCode',
          component: EmployeeFeedbackDetailsComponent,
        },
        {
          path: 'course-feedback/:empCode',
          component: CourseFeedbackComponent,
        },
        {
          path: 'registration/edit/:regId',
          component: RegistrationEditComponent,
        },
        {
          path: 'add-participants',
          component: AddParticipantsComponent,
        },
        {
          path: 'user-dashboard',
          component: UserDashboardComponent,
        },
        {
          path: 'hr-dashboard',
          component: HrDashboardComponent,
        },
        {
          path: 'manager-dashboard',
          component: ManagerDashboardComponent,
        },

        {
          path: 'training-view',
          component: TrainingViewComponent,

        },

        {
          path: 'attendance',
          component: AttendanceComponent
        },

        {
          path: 'attendance2',
          component: Attendance2Component
        }
        
      ]},
  {
    path: '**',
    redirectTo: 'error'
  }
]
