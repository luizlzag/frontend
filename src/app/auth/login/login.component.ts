import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(protected auth: AuthService) {}

  loginWithGithub(): void {
    window.location.href = this.auth.githubLoginUrl;
  }
}
