import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles: any;
    submenu?:RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '', roles: ['ROLE_ADMIN'] },
    { path:'/admin-training',title: 'Training' , icon :'nc-caps-small' , class : ' ', roles: ['ROLE_ADMIN'] ,submenu:[
        { path:'/add-training',title:'Add Training',icon:'',class:'', roles: ['ROLE_ADMIN']},
        {path:'/view-training',title:'View Training',icon:'',class:'', roles: ['ROLE_ADMIN']},
        {path:'/schedule-training',title:'Schedule Training',icon:'',class:'', roles: ['ROLE_ADMIN']}

    ]},
    { path: '/admin-attendance' ,title :'Attendance' ,icon :'nc-caps-small' , class : '', roles: ['ROLE_ADMIN']}, 
    { path: '/registration',  title: 'Registration List',      icon:'nc-pin-3',      class: '', roles: ['ROLE_ADMIN'] },
    { path: '/feedback',      title: 'Feedback',          icon:'nc-bell-55',    class: '',roles: ['ROLE_ADMIN'], submenu: [
        { path: '/employee-feedback', title: 'Employee Feedback', icon:'', class: '', roles: ['ROLE_ADMIN'] },
        { path: '/trainer-feedback',  title: 'Training Feedback', icon: '', class: '', roles: ['ROLE_ADMIN'] },
    ]},
    { path: '/trainer-dashboard', title: 'Dashboard', icon: '', class: '', roles: ['ROLE_TRAINER'] }
     // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' }
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];
/*  {path:'schedule-training',component:ScheduleTrainingComponent} */

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    router: any;
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
