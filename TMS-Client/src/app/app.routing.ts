import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AddTrainingComponent } from './pages/admin-training/add-training/add-training.component';
import { ViewTrainingComponent } from './pages/admin-training/view-training/view-training.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { TableFilterService } from './filtersearch/filterpipe.component';

export const AppRoutes: Routes = [
  {path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',}, 
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
        }
    
],

    },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  

  

]
