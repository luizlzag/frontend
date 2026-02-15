import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  template: `
    <div class="callback-container">
      @if (error) {
        <div class="message error">
          <p>Erro ao fazer login. {{ error }}</p>
          <a href="/login" class="link">Voltar ao login</a>
        </div>
      } @else if (success) {
        <div class="message success">
          <p>Login realizado com sucesso!</p>
          <p class="redirecting">Redirecionando...</p>
        </div>
      } @else {
        <div class="message loading">
          <div class="spinner"></div>
          <p>Processando login...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .callback-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      padding: 1rem;
    }

    .message {
      background: rgba(30, 41, 59, 0.8);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 1rem;
      padding: 2rem;
      text-align: center;
      max-width: 400px;
    }

    .message p {
      margin: 0 0 1rem;
      color: #f8fafc;
    }

    .message p:last-child {
      margin-bottom: 0;
    }

    .redirecting {
      color: #94a3b8 !important;
      font-size: 0.875rem;
    }

    .error p {
      color: #fca5a5;
    }

    .link {
      color: #60a5fa;
      text-decoration: none;
      font-size: 0.9375rem;
    }

    .link:hover {
      text-decoration: underline;
    }

    .spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto 1rem;
      border: 3px solid rgba(148, 163, 184, 0.2);
      border-top-color: #60a5fa;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class AuthCallbackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthService);

  error: string | null = null;
  success = false;

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const user = this.route.snapshot.queryParamMap.get('user');

    if (token && user) {
      this.auth.saveAuth(token, user);
      this.success = true;
      setTimeout(() => this.router.navigate(['/']), 1200);
    } else {
      this.error = 'Token ou usuário não recebidos.';
    }
  }
}
