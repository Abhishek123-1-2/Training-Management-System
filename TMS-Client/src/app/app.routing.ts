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
        { path: 'registration',   
          component: AdminRegistrationComponent,
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
        }
        
      ]},
  {
    path: '**',
    redirectTo: 'error'
  }
]
