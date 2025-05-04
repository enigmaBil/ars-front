import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobOffer } from '../../../core/models/offre';
import { JobService } from '../../../core/services/job.service';
import { CandidatureService } from '../../../core/services/candidature.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-job-apply',
  imports: [ReactiveFormsModule, NgClass, ],
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.css']
})
export class JobApplyComponent {
  jobOffer!: JobOffer;
  jobId: number = 0;
  selectedFile: File | null = null;
  fileError: string | null = null;

  candidatForm!: FormGroup;

  constructor(
    private readonly jobService: JobService,
    private readonly candidatureService: CandidatureService,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) {
    this.candidatForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern("^(?:\\+216|00216|)[24579]\\d{7}$")]],
      experienceYears: [null, [Validators.required, Validators.min(0)]],
      educationLevel: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = +params['id'];
      this.jobService.getJobOfferById(this.jobId).subscribe(
        data => {
          this.jobOffer = data;
        },
        error => {
          console.error('Erreur lors de la récupération de l\'offre d\'emploi :', error);
        }
      );
    });
  }

  get nameCtrl(): FormControl {
    return this.candidatForm.get('name') as FormControl;
  }

  get emailCtrl(): FormControl {
    return this.candidatForm.get('email') as FormControl;
  }

  get phoneCtrl(): FormControl {
    return this.candidatForm.get('phone') as FormControl;
  }

  get experienceYearsCtrl(): FormControl {
    return this.candidatForm.get('experienceYears') as FormControl;
  }

  get educationLevelCtrl(): FormControl {
    return this.candidatForm.get('educationLevel') as FormControl;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['pdf', 'doc', 'docx'];
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(extension || '')) {
        this.fileError = 'Le fichier doit être au format PDF, DOC ou DOCX.';
        this.selectedFile = null;
        return;
      }
      this.fileError = null;
      this.selectedFile = file;
    } else {
      this.fileError = 'Veuillez sélectionner un fichier.';
    }
  }

  onSubmit(): void {
    if (this.candidatForm.invalid || !this.selectedFile) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    
    const formData = new FormData();
    formData.append('name', this.nameCtrl.value);
    formData.append('email', this.emailCtrl.value);
    formData.append('phone', this.phoneCtrl.value);
    formData.append('experienceYears', String(this.experienceYearsCtrl.value));
    formData.append('educationLevel', this.educationLevelCtrl.value);
    formData.append('file', this.selectedFile);
    console.log("FormData:", formData);
    console.log("Job ID:", this.jobId);
    
    this.candidatureService.applyToJob(this.jobId, formData).subscribe(
      response => {
        console.log("Candidature soumise avec succès !", response);
        alert("Candidature soumise avec succès !");
        this.candidatForm.reset();
        this.selectedFile = null;
        this.fileError = null;
      },
      error => {
        console.error("Erreur lors de la soumission de la candidature :", error);
        alert("Erreur lors de la soumission de la candidature : " + error.message);
      }
    );
  }
}