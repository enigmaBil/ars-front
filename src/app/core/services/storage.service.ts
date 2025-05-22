import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  clear(): void {
    localStorage.clear();
  }
}
