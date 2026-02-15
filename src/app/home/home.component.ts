import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="home-container">
      <header class="header">
        <h1>Kanban</h1>
        <div class="user-info">
          <span>Olá, {{ auth.user() }}</span>
          <button type="button" class="btn-logout" (click)="logout()">Sair</button>
        </div>
      </header>
      <main class="main">
        <p class="welcome">Bem-vindo ao seu Kanban! 🎉</p>
        <p class="subtitle">O board será implementado em breve.</p>
      </main>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    }

    .header h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #f8fafc;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info span {
      color: #94a3b8;
      font-size: 0.9375rem;
    }

    .btn-logout {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      color: #f8fafc;
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-logout:hover {
      background: rgba(239, 68, 68, 0.3);
    }

    .main {
      padding: 3rem 2rem;
      text-align: center;
    }

    .welcome {
      font-size: 1.5rem;
      color: #f8fafc;
      margin: 0 0 0.5rem;
    }

    .subtitle {
      color: #94a3b8;
      margin: 0;
    }
  `]
})
export class HomeComponent {
  protected auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
