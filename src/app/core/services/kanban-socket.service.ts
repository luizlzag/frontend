import { Injectable, inject, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import { API_URL } from '../api/api.config';
import type { Card, Column } from '../models';
import { AuthService } from '../../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class KanbanSocketService implements OnDestroy {
  private auth = inject(AuthService);
  private socket: Socket | null = null;

  readonly cardCreated$ = new Subject<Card>();
  readonly cardUpdated$ = new Subject<Card>();
  readonly cardDeleted$ = new Subject<Card>();
  readonly columnCreated$ = new Subject<Column>();
  readonly columnUpdated$ = new Subject<Column>();
  readonly columnDeleted$ = new Subject<Column>();

  connect(): void {
    if (this.socket?.connected) return;

    const token = this.auth.getToken();
    const socketUrl = new URL(API_URL).origin;

    this.socket = io(`${socketUrl}/kanban`, {
      auth: token ? { token } : {},
      transports: ['websocket', 'polling'],
    });

    this.socket.on('card:created', (card: Card) => this.cardCreated$.next(card));
    this.socket.on('card:updated', (card: Card) => this.cardUpdated$.next(card));
    this.socket.on('card:deleted', (card: Card) => this.cardDeleted$.next(card));
    this.socket.on('column:created', (column: Column) => this.columnCreated$.next(column));
    this.socket.on('column:updated', (column: Column) => this.columnUpdated$.next(column));
    this.socket.on('column:deleted', (column: Column) => this.columnDeleted$.next(column));
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
