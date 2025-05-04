import { Component, OnInit } from '@angular/core';
import { JobOffer } from '../../../core/models/offre';
import { JobService } from '../../../core/services/job.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-details',
  imports: [RouterLink],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit{
  jobOffer!: JobOffer;
  jobId: number = 0;
  skills: string[] = [];
  constructor(
    private readonly jobservice:JobService,
    private readonly route:ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = +params['id'];
      console.log(this.jobId);
      this.jobservice.getJobOfferById(this.jobId).subscribe(
        data => {
          this.jobOffer = data;
          this.skills = this.jobOffer.requiredSkills.substring(1, this.jobOffer.requiredSkills.length - 1).split(',');
          console.log('Job Offer ..... :',this.jobOffer);
        },
        error => {
          console.error('Error fetching job offer:', error);
        }
      );
    });
  }

}
