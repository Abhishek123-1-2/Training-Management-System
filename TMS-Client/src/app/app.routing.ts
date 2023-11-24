import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { AdminTrainingComponent } from './pages/admin-training/admin-training.component';
import { AdminAttendanceComponent } from './pages/admin-attendance/admin-attendance.component';
import { AddTrainingComponent } from './pages/admin-training/add-training/add-training.component';
import { ViewTrainingComponent } from './pages/admin-training/view-training/view-training.component';
import { ScheduleTrainingComponent } from './pages/admin-training/schedule-training/schedule-training.component';

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
          path:'attendance/:attendance_id',
          component: AttendanceDetailsComponent,
        },

        
    
],

    },
  {
    path: '**',
    redirectTo: 'error'
  },

  


]
