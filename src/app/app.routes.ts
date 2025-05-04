import { Routes } from '@angular/router';
import {jobRoute} from './views/job/job.route';
import { BackOfficeComponent } from './layouts/back-office/back-office.component';
import { PublicComponent } from './layouts/public/public.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { JobPageComponent } from './views/job/job-page/job-page.component';
import { JobDetailsComponent } from './views/job/job-details/job-details.component';
import { JobApplyComponent } from './views/job/job-apply/job-apply.component';

export const routes: Routes = [
  {
    path:"admin",
    component: BackOfficeComponent,
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent
      },
    ]
  },
  {
    path:"portal",
    component: PublicComponent,
    children:[
      {
        path: "home.face",
        component:JobPageComponent,
        children:[
          
        ]
      },
      {
        path: "jobs/details/:id",
        component: JobDetailsComponent
      },
      {
        path: "jobs/apply/:id",
        component: JobApplyComponent
      }
    ]
  },
  { path: '', redirectTo: '/portal/home.face', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/jobs' },
];
