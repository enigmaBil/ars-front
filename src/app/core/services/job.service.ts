import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JobOffer } from '../models/offre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService{
  /**
   * URL de l'API pour les offres d'emploi.
   */
  private apiUrl = 'http://localhost:8089/api/job-offers';
  
  constructor(private readonly http: HttpClient) { }



  /**
   * Récupère toutes les offres d'emploi.
   */
  getJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.apiUrl);
  }

  /**
   * Récupère une offre d'emploi spécifique par son ID.
   * @param id L'ID de l'offre d'emploi.
   */
  getJobOfferById(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crée une nouvelle offre d'emploi.
   * @param jobOffer Les données de l'offre d'emploi à créer.
   */
  createJobOffer(jobOffer: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(this.apiUrl, jobOffer);
  }

  /**
   * Met à jour une offre d'emploi existante.
   * @param id L'ID de l'offre d'emploi à mettre à jour.
   * @param updatedJobOffer Les nouvelles données de l'offre d'emploi.
   */
  updateJobOffer(id: number, updatedJobOffer: JobOffer): Observable<JobOffer> {
    return this.http.put<JobOffer>(`${this.apiUrl}/${id}`, updatedJobOffer);
  }

  /**
   * Supprime une offre d'emploi.
   * @param id L'ID de l'offre d'emploi à supprimer.
   */
  deleteJobOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  /**
   * Postuler à une offre d'emploi.
   * @param jobId L'ID de l'offre d'emploi.
   * @param applicationData Les données de la candidature.
   */ 
  applyToJob(jobId: number, applicationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${jobId}/apply`, applicationData);
  }
}
