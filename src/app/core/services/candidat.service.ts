import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  getCandidats() {
    return [
      { nom: 'Dupont', poste: 'Développeur', email: 'dupont@example.com' },
      { nom: 'Martin', poste: 'Designer', email: 'martin@example.com' },
    ];
  }
}
