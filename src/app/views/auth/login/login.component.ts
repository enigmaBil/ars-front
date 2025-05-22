import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { NavabarComponent } from '../../../layouts/navabar/navabar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NavabarComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storage: StorageService,
    private router: Router,
    private message: NzMessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.message.error('Veuillez remplir tous les champs correctement.');
      return;
    }

    const { email, password } = this.loginForm.value;
    if (email == null || password == null) {
      this.message.error('Veuillez remplir tous les champs correctement.');
      return;
    }
    this.authService.login({ email: email as string, password: password as string }).subscribe({
      next: (res) => {
        this.storage.saveToken(res.accessToken);
        this.message.success('Connexion réussie');
        this.router.navigate(['/admin/CandidatListComponent']); // Redirection ici
      },
      error: () => this.message.error('Email ou mot de passe invalide.')
    });
  }
}
