/* admin-layout.routing.ts */
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AdminAttendanceComponent } from 'app/pages/admin/admin-attendance/admin-attendance.component';
import { AddTrainingComponent } from 'app/pages/admin/add-training/add-training.component';
import { ViewTrainingComponent } from 'app/pages/admin/view-training/view-training.component';
// import { AttendanceDetailsComponent } from 'app/pages/admin/attendance-details/attendance-details.component';
import { ScheduleTrainingComponent } from 'app/pages/admin/schedule-list/schedule-training/schedule-training.component';
import { AddParticipantsComponent } from 'app/pages/admin/add_participants/add_participants.component';
import { TrainerDashboardComponent } from 'app/pages/trainer/trainer-dashboard/trainer-dashboard.component';
import { TIDComponent } from 'app/pages/admin/view-training/TID/tid.component';
import { TypeComponent } from 'app/pages/admin/view-training/TID/type/type.component';
import { ScheduleListComponent } from 'app/pages/admin/schedule-list/schedule-list.component';
import { FeedbackComponent } from 'app/pages/employee/feedback/feedback.component';

import { FeedbackDetailsComponent } from 'app/pages/admin/feedback-details/feedback-details.component';
import { StudentListComponent } from 'app/pages/admin/student_list/student_list.component';
import { AttendanceRecordComponent } from 'app/pages/admin/attendance-record/attendance-record.component';
import { StudentList1Component } from 'app/pages/admin/student_list1/student_list1.component';
import { FeedbackFormComponent } from 'app/pages/employee/feedback-form/feedback-form.component';
import { HrDashboardComponent } from 'app/pages/hr/hr-dashboard/hr-dashboard.component';
import { TrainerFeedbackComponent } from 'app/pages/hr/trainer-feedback/trainer-feedback.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path:'admin-attendance',component:AdminAttendanceComponent },
    { path:'add-training',component: AddTrainingComponent },
    { path:'view-training',component:ViewTrainingComponent},
    { path:'schedule-training',component:ScheduleTrainingComponent},
    { path:'schedule-training/:course/:trainer',component:ScheduleTrainingComponent},
    // { path:'attendance/:course',component:AttendanceDetailsComponent},
    { path: 'add-participants',component: AddParticipantsComponent},
    { path: 'trainer-dashboard', component: TrainerDashboardComponent},
    { path: 'feedback', component:FeedbackComponent},
    { path: 'feedback-details', component:FeedbackDetailsComponent},
    { path: 'feedback-form/:id', component:FeedbackFormComponent},
    { path: 'student-list', component: StudentListComponent},
    { path: 'student-list1', component: StudentList1Component},
    { path: 'attendance-record', component: AttendanceRecordComponent},
    { path: 'schedule-list', component: ScheduleListComponent},
    {path:'tid',component:TIDComponent},
    {path:'type/:course',component:TypeComponent},
    { path: "hr-dashboard",component:HrDashboardComponent},
    { path: 'trainer-feedback', component: TrainerFeedbackComponent }

    


];
