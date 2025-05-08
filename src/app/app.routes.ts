import { Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { BackOfficeComponent } from './layouts/back-office/back-office.component';
import { PublicComponent } from './layouts/public/public.component';
import { JobPageComponent } from './views/job/job-page/job-page.component';
import { JobDetailsComponent } from './views/job/job-details/job-details.component';
import { JobApplyComponent } from './views/job/job-apply/job-apply.component';
import { CandidatListComponent } from './views/candidats/candidat-list.component';

export const routes: Routes = [
  {
    path: 'portal',
    component: PublicComponent,
    children: [
      { path: 'home.face', component: JobPageComponent },
      { path: 'jobs/details/:id', component: JobDetailsComponent },
      { path: 'jobs/apply/:id', component: JobApplyComponent },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: BackOfficeComponent,
    children: [
      { path: 'candidats', component: CandidatListComponent }
    ]
  },
  { path: '', redirectTo: '/portal/home.face', pathMatch: 'full' }
];
