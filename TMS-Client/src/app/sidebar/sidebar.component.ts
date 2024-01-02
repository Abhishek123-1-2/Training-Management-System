import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles: any;
    submenu?:RouteInfo[];
    children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '', roles: ['ROLE_ADMIN'] },
    { path: '/employee-search', title: 'Employee', icon: 'nc-circle-10', class:'', roles: ['ROLE_ADMIN']},
    { path:'/admin-training',title: 'Training' , icon :'nc-caps-small' , class : ' ', roles: ['ROLE_ADMIN'] ,submenu:[
        { path:'/add-training',title:'Add-Training',icon:'',class:'', roles: ['ROLE_ADMIN']},
        {path:'/view-training',title:'View-Training',icon:'',class:'', roles: ['ROLE_ADMIN']},
        {path:'/schedule-list',title:'Schedule-List',icon:'',class:'', roles: ['ROLE_ADMIN']},
    ]},     

   

    { path: '/registration',  title: 'Registration List',      icon:'nc-paper',      class: '', roles: ['ROLE_ADMIN'] },
    { path: '/admin-attendance' ,title :'Reports' ,icon :'nc-chart-bar-32' , class : '', roles: ['ROLE_ADMIN']}, 
    {path: '/admin-training', title: 'History', icon:'nc-tile-56', class: '', roles: ['ROLE_ADMIN'], submenu: [
        {path:'/training-record', title:'Training Record', icon:'', class:'', roles:['ROLE_ADMIN']},
        {path:'/training-history', title:'Training History', icon:'', class:'', roles: ['ROLE_ADMIN']},
    ]},

    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roles: ['ROLE_TRAINER']},
    { path: '/training-details', title: 'Trainings', icon: 'nc-caps-small', class: '', roles: ['ROLE_TRAINER']},
    { path:'/give-feedback', title:'Feedback', icon:'nc-chart-bar-32', class:'', roles: ['ROLE_TRAINER'] },
    {path:'report-main',title:'Reports',icon:'nc-chart-bar-32',class:'',roles:['ROLE_TRAINER']},
    




{ path: '/user-dashboard', title: 'Dashboard', class: '', icon: 'nc-bank', roles:['ROLE_USER']},
{ path: '/user-dashboard', title: 'Training', class: '', icon: 'nc-user-run', roles:['ROLE_USER'] ,
submenu:[
{path:'on-request',title:'On-Request',icon:'',class:'',roles:['ROLE_USER']},
{path:'training-history',title:'Training History',icon:'',class:'',roles:['ROLE_USER']},  
]},
{ path: '/feedback', title: 'Feedback', class: '', icon:'nc-bell-55', roles:['ROLE_USER']},

// {path:'performance',title:'Performance',class:'',icon:'nc-bell-55',roles:['ROLE_USER']},


  { path: '/hr-dashboard', title: 'Employee Feedback', class: '', icon:'nc-chart-bar-32', roles:['ROLE_HR']},
  { path: '/trainer-feedback', title: 'Trainer Feedback', class: '', icon: 'nc-app', roles:['ROLE_HR']},


     // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' }
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },

{path:'manager-dashboard', title:'Dashboard', icon:'nc-diamond', class:'', roles:['ROLE_MANAGER']},
{path:'employee-search', title:'Employee', icon:'nc-circle-10', class:'', roles:['ROLE_MANAGER']},
{path:'training', title:'Training Requests', icon:'nc-caps-small', class:'', roles:['ROLE_MANAGER'], submenu:[
{path:'training-request', title:'Scheduled Courses', icon:'', class:'', roles:['ROLE_MANAGER']},
{path:'training-request1', title:'On-Demand Courses', icon:'', class:'', roles:['ROLE_MANAGER']},
{path: '/approved-request', title: 'Request Details', class:'', icon:'', roles:['ROLE_MANAGER']}
]},
{path: '/admin-attendance' ,title :'Reports' ,icon :'nc-chart-bar-32' , class : '', roles: ['ROLE_MANAGER'],},
{path:'/admin-training',title:'History', icon:'nc-caps-small', class:'', roles:['ROLE_MANAGER'], submenu: [
{path:'/training-record', title:'Training Record', icon:'', class:'', roles:['ROLE_MANAGER']},
  {path:'/training-history', title:'Training History', icon:'', class:'', roles: ['ROLE_MANAGER']},
]},

    
];
/*  {path:'schedule-training',component:ScheduleTrainingComponent} */

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        const userRole = localStorage.getItem("role");
        this.menuItems = ROUTES.filter(menuItem => this.filterRoutesByRole(menuItem, userRole));
      }

      private filterRoutesByRole(route: RouteInfo, userRole: string): boolean {
        // If the route has children, filter the children based on the user's role
        if (route.children) {
          route.children = route.children.filter(child => this.filterRoutesByRole(child, userRole));
        }
    
        // Return true if the route is allowed for the user's role, or if it has children after filtering
        return !route.roles || route.roles.includes(userRole) || (route.children && route.children.length > 0);
      }
      
      
      toggleDropdown(menuItem) {
        if (menuItem.children) {
          menuItem.active = !menuItem.active;
          // Reset the active state for other items
          this.menuItems.forEach(item => {
            if (item !== menuItem && item.children) {
              item.active = false;
            }
          });
        } else {
          // When a leaf menu item is clicked, reset the active state for all items
          this.menuItems.forEach(item => {
            item.active = false;
            if (item.children) {
              item.children.forEach(childItem => {
                childItem.active = false;
              });
            }
          });
          menuItem.active = true;
        }
      }
}
