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
import { ViewTrainingComponent } from "./pages/admin-training/view-training/view-training.component";/* newly added */
import { AdminAttendanceComponent } from "./pages/admin-attendance/admin-attendance.component";
import { FormsModule } from "@angular/forms";
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { TableFilterService } from "./filtersearch/filterpipe.component";
/* newly added  */
@NgModule({
  declarations: [

    AppComponent,
    AdminLayoutComponent,
    ViewTrainingComponent,
    AdminAttendanceComponent,
    
    AttendanceDetailsComponent,
    
    
    
    
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
