import { Component } from '@angular/core';
import {JobSearchComponent} from '../job-search/job-search.component';
import {JobListComponent} from '../job-list/job-list.component';

@Component({
  selector: 'app-job-page',
  imports: [
    JobSearchComponent,
    JobListComponent
  ],
  templateUrl: './job-page.component.html',
  styleUrl: './job-page.component.css'
})
export class JobPageComponent {

}
