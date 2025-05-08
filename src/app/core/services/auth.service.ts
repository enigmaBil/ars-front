// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, password: string): boolean {
    return email === 'rh@entreprise.com' && password === 'admin123';
  }
  logout(): void {
    // Si vous avez des informations de session comme un token, vous pouvez les effacer ici
    // Par exemple : localStorage.removeItem('auth_token');
    console.log("Utilisateur déconnecté");
  }

}
