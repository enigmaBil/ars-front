import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobOffer } from '../../../core/models/offre';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-job-list',
  imports: [RouterLink],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  jobOffers: JobOffer[] = [];

    constructor(private jobOfferService: JobService) {}

    ngOnInit(): void {
        this.jobOfferService.getJobOffers().subscribe((offers) => {
            this.jobOffers = offers;
            console.log(this.jobOffers);
        });
    }

   
    

    applyToJob(jobId: number): void {
        console.log(`Candidature pour l'offre ${jobId}`);
        // Rediriger vers la page de candidature
    }
}
