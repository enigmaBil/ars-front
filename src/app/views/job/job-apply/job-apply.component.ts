import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  isModalVisible: boolean = false;

  availableSkills: string[] = [
  'Java', 'Spring Boot', 'Angular', 'Docker', 'Kubernetes',
  'Python', 'SQL', 'Git', 'CI/CD', 'Communication'
];

  candidatForm!: FormGroup;

  constructor(
    private readonly jobService: JobService,
    private readonly candidatureService: CandidatureService,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.candidatForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern("^(?:\\+216|00216|)[24579]\\d{7}$")]],
      experienceYears: [null, [Validators.required, Validators.min(0)]],
      educationLevel: [null, [Validators.required]],
      // skills: new FormControl([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = +params['id'];
      this.jobService.getJobOfferById(this.jobId).subscribe({
        next: data => {
            if (data) {
              this.jobOffer = data;
            } else {
              console.error('Aucune offre d\'emploi trouvée avec cet ID.');
            }
          },
        error: error => {
            console.error('Erreur lors de la récupération de l\'offre d\'emploi :', error);
          }
        
        }
      );
    });
  }

  

  // get skillsCtrl(): FormControl {
  //   return this.candidatForm.get('skills') as FormControl;
  // }

  onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const allowedExtensions = ['pdf'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(extension || '')) {
      this.fileError = 'Le fichier doit être au format PDF.';
      this.selectedFile = null;
      return;
    }
    this.fileError = null;
    this.selectedFile = file;
  } else {
    this.fileError = 'Veuillez sélectionner un fichier.';
  }
}

  onSubmit = () => {
    if (!this.selectedFile) {
      this.fileError = "Veuillez sélectionner un fichier valide (PDF).";
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log("Fichier CV à envoyer :", this.selectedFile?.name);
    this.isModalVisible = true;

    
    this.candidatureService.applyToJob(this.jobId, formData).subscribe({
      next: (response) => {
        console.log('Candidature soumise avec succès !', response);
        
        this.selectedFile = null;
        this.fileError = null;
      },
      error: (error) => {
        console.error('Erreur lors de la soumission de la candidature :', error);
      }
    });
  }

   closeModal() {
    this.isModalVisible = false;
    this.router.navigate(['/portal/home.face']); // Redirige vers la liste des jobs
  }

}