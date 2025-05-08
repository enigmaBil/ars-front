// src/app/views/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { NavabarComponent } from '../../../layouts/navabar/navabar.component';
import { FooterComponent } from '../../../layouts/footer/footer.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FooterComponent,FormsModule, RouterModule,NavabarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.authService.login(this.email, this.password)) {
      Swal.fire({
        title: "Connexion réussie !",
        text: "Bienvenue dans votre espace RH.",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        this.router.navigate(['/admin/candidats']);
      });
    } else {
      this.error = 'Identifiants invalides';
    }
  }

}
