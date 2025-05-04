import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Candidate } from "../models/candidate";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CandidatureService{
    /**
       * URL de l'API pour les offres d'emploi.
       */
      private apiUrl = 'http://localhost:8080/api/candidates';
      
      constructor(private readonly http: HttpClient) { }

      /**
         * Soumettre un cv.
         * @param jobOffer Les données de l'offre d'emploi à créer.
         */
        applyToJob(jobId: number, formData: FormData): Observable<any> {
          return this.http.post(`${this.apiUrl}/apply/${jobId}`, formData);
        }
}