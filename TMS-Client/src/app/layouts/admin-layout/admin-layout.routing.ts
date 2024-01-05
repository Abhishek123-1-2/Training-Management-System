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
import { ScheduleTrainingComponent } from 'app/pages/admin/schedule-training/schedule-training.component';
import { AddParticipantsComponent } from 'app/pages/admin/add_participants/add_participants.component';
import { TrainerDashboardComponent } from 'app/pages/trainer/trainer-dashboard/trainer-dashboard.component';
import { TIDComponent } from 'app/pages/admin/TID/tid.component';
import { TypeComponent } from 'app/pages/admin/type/type.component';
import { ScheduleListComponent } from 'app/pages/admin/schedule-list/schedule-list.component';
import { FeedbackComponent } from 'app/pages/employee/feedback/feedback.component';
import { FeedbackDetailsComponent } from 'app/pages/admin/feedback-details/feedback-details.component';
import { StudentListComponent } from 'app/pages/admin/student_list/student_list.component';
import { AttendanceRecordComponent } from 'app/pages/admin/attendance-record/attendance-record.component';
import { StudentList1Component } from 'app/pages/admin/student_list1/student_list1.component';
import { FeedbackFormComponent } from 'app/pages/employee/feedback-form/feedback-form.component';
import { HrDashboardComponent } from 'app/pages/hr/hr-dashboard/hr-dashboard.component';

import { UserDashboardComponent } from 'app/pages/employee/user-dashboard/user-dashboard.component';
import { AdminTrainingHistoryComponent } from 'app/pages/admin/admin-training-history/admin-training-history.component';
import { OngoingTrainingComponent } from 'app/pages/trainer/ongoing-training/ongoing-training.component';
import { StudentList2Component } from 'app/pages/trainer/student-list2/student-list2.component';
import { TrainingRecordComponent } from 'app/pages/admin/training-record/training-record.component';
import { EmployeeHistoryComponent } from 'app/pages/admin/employee-history/employee-history.component';
import { AdminRegistrationComponent } from 'app/pages/admin/admin_registration/admin_registration.component';
import { EmployeeSearchComponent } from 'app/pages/admin/employee-search/employee-search.component';
import { CourseDetailsComponent } from 'app/pages/admin/course-details/course-details.component';
import { UpcomingTrainingComponent } from 'app/pages/trainer/upcoming-training/upcoming-training.component';
import { CompletedTrainingComponent } from 'app/pages/trainer/completed-training/completed-training.component';
import { TrainerFeedbackToEmployeeComponent } from 'app/pages/trainer/trainer-feedback-to-employee/trainer-feedback-to-employee.component';
import { StudentList3Component } from 'app/pages/trainer/student-list3/student-list3.component';
import { FeedbackToEmployeeComponent } from 'app/pages/trainer/feedback-to-employee/feedback-to-employee.component';
import { AttendanceComponent } from 'app/pages/hr/attendance/attendance.component';
import { Attendance2Component } from 'app/pages/hr/attendance2/attendance2.component';
import { OnRequestComponent } from 'app/pages/employee/on-request/on-request.component';
import { TrainingRequestComponent } from 'app/pages/manager/training-request/training-request.component';
import { TrainingRequest1Component } from 'app/pages/manager/training-request1/training-request1.component';
import { ApprovedRequestComponent } from 'app/pages/manager/approved-request/approved-request.component';
import { ReportOfCoursesComponent } from 'app/pages/trainer/report-courses/report-courses.component';
import { ReportMainComponent } from 'app/pages/trainer/report-main/report-main.component';
import { ReportOfEmployeeComponent } from 'app/pages/trainer/report-emp/report-emp.component';
import { TrainerTrainingDetailsComponent } from 'app/pages/trainer/trainer-training-details/trainer-training-details.component';
import { ParticipantsListComponent } from 'app/pages/admin/participants-list/participants-list.component';
import { TrainingHistoryComponent } from 'app/pages/employee/training-history/training-history.component';


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
    { path: 'feedback-form/:number', component:FeedbackFormComponent},
    { path: 'student-list', component: StudentListComponent},
    { path: 'student-list1', component: StudentList1Component},
    { path: 'attendance-record', component: AttendanceRecordComponent},
    { path: 'schedule-list', component: ScheduleListComponent},
    {path:'tid',component:TIDComponent},
    {path:'type/:course',component:TypeComponent},
    {path:'ongoing-training', component: OngoingTrainingComponent},
    {path:'student-list2', component: StudentList2Component},
    {path:'training-record', component: TrainingRecordComponent},
    {path:'employee-history/:c_name', component: EmployeeHistoryComponent},
    {path:'admin-training-history', component: AdminTrainingHistoryComponent},
    {path:'registration', component: AdminRegistrationComponent},
    {path:'employee-search', component: EmployeeSearchComponent},
    {path:'course-details/:emp_code', component: CourseDetailsComponent},
    {path:'view-training', component: ViewTrainingComponent},
    {path:'upcoming-training', component: UpcomingTrainingComponent},
    {path:'completed-training', component: CompletedTrainingComponent},
    {path:'give-feedback', component: TrainerFeedbackToEmployeeComponent },
    {path:'student-list3', component: StudentList3Component},
    {path:'feedback-to-employee', component: FeedbackToEmployeeComponent},
    {path:'training-request', component: TrainingRequestComponent},
    {path:'training-request1', component: TrainingRequest1Component},
    {path:'approved-request', component: ApprovedRequestComponent},
    {path:'training-details', component: TrainerTrainingDetailsComponent},  
    {path:'on-request',component:OnRequestComponent},
    {path:'report-main',component:ReportMainComponent},
    {path:'report-employee',component:ReportOfEmployeeComponent},
    {path:'report-courses',component:ReportOfCoursesComponent},
    {path:'participants-list', component: ParticipantsListComponent},
    {path:'on-request', component: OnRequestComponent},    
    {path:'on-request', component:OnRequestComponent},

    {path:'user-training-history', component: TrainingHistoryComponent}
];
