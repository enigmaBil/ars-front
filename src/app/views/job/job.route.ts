import {Routes} from '@angular/router';

export const jobRoute:Routes = [
  {
    path: '',
    loadComponent: () => import("./job-page/job-page.component").then(c => c.JobPageComponent)
  },
  {
    path: 'jobs/details:id',
    loadComponent: () => import("./job-details/job-details.component").then(c => c.JobDetailsComponent)
  },
  {
    path: 'jobs/apply:id',
    loadComponent: () => import("./job-apply/job-apply.component").then(c => c.JobApplyComponent)
  },
]
