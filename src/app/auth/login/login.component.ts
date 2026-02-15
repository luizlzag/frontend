import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected auth = inject(AuthService);
  private router = inject(Router);

  protected guestLoading = false;
  protected guestError: string | null = null;

  loginWithGithub(): void {
    window.location.href = this.auth.githubLoginUrl;
  }

  loginAsGuest(): void {
    this.guestLoading = true;
    this.guestError = null;
    this.auth.loginAsGuest().subscribe({
      next: (res) => {
        this.auth.saveAuth(res.access_token, JSON.stringify(res.user));
        this.auth.fetchMe();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.guestError = err.error?.message || 'Erro ao entrar como convidado';
        this.guestLoading = false;
      },
    });
  }
}
