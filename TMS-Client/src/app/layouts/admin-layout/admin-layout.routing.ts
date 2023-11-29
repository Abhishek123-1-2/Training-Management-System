/* admin-layout.routing.ts */
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AdminRegistrationComponent } from 'app/pages/admin/admin_registration/admin_registration.component';
import { AdminAttendanceComponent } from 'app/pages/admin/admin-attendance/admin-attendance.component';
// import { AdminTrainingComponent } from 'app/pages/admin-training/admin-training.component';
import { AddTrainingComponent } from 'app/pages/admin/add-training/add-training.component';
import { ViewTrainingComponent } from 'app/pages/admin/view-training/view-training.component';
import { AttendanceDetailsComponent } from 'app/pages/admin/attendance-details/attendance-details.component';
import { ScheduleTrainingComponent } from 'app/pages/admin/schedule-training/schedule-training.component';
import { AddParticipantsComponent } from 'app/pages/admin/add_participants/add_participants.component';
import { TrainerDashboardComponent } from 'app/pages/trainer/trainer-dashboard/trainer-dashboard.component';
import { FeedbackComponent } from 'app/pages/employee/feedback/feedback.component';
/* import { AttendanceDetailsComponent } from 'app/pages/admin-attendance/attendance-details.component';
 */
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    // { path:'admin-training', component:AdminTrainingComponent},
    { path:'admin-attendance',component:AdminAttendanceComponent },
    { path:'add-training',component: AddTrainingComponent },
    { path:'view-training',component:ViewTrainingComponent},
    { path:'schedule-training',component:ScheduleTrainingComponent},
    { path:'attendance/:course',component:AttendanceDetailsComponent},
    { path: 'add-participants',component: AddParticipantsComponent},
    { path: 'trainer-dashboard', component: TrainerDashboardComponent},
    { path: 'feedback', component:FeedbackComponent}
];
