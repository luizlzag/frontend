# Kanban Frontend

Aplicação Angular para gerenciamento de board Kanban com autenticação (GitHub OAuth e convidado), CRUD de colunas e cards, e atualizações em tempo real via Socket.IO.

## Stack

- Angular 21 (standalone components, signals)
- Angular CDK (drag-and-drop)
- RxJS 7.8
- Socket.IO Client 4.8
- ng-icons (Heroicons)

## Requisitos

- Node.js 18+
- npm 11+

## Instalação

```bash
npm install
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` | Servidor de desenvolvimento em `http://localhost:4200` |
| `npm run build` | Build de produção em `dist/` |
| `npm run watch` | Build em modo watch (dev) |
| `npm test` | Executa testes |

## Configuração

A URL da API é definida em `src/app/core/api/api.config.ts`:

```ts
export const API_URL = 'https://backend-kanban-bhsz.onrender.com';
```

Para ambiente local, altere para `http://localhost:3000` (ou a porta do backend).

## Estrutura

```
src/app/
├── auth/                 # Autenticação
│   ├── auth.service.ts   # Token, login guest, GitHub OAuth
│   ├── auth.interceptor.ts
│   ├── auth.guard.ts     # authGuard, guestGuard
│   ├── login/
│   └── auth-callback/
├── board/                # Board Kanban
│   └── board.component   # Colunas, cards, drag-drop
├── core/
│   ├── api/api.config.ts
│   ├── models/           # User, Column, Card
│   └── services/
│       ├── columns.service.ts
│       ├── cards.service.ts
│       └── kanban-socket.service.ts
├── home/
└── shared/
```

## Autenticação

- **GitHub:** redireciona para `GET /auth/github`; callback em `/auth/callback` recebe `token` e `user` na query.
- **Convidado:** `POST /auth/guest` retorna `access_token` e `user`.
- Token e user são armazenados em `localStorage` (`kanban_token`, `kanban_user`).
- O interceptor HTTP adiciona `Authorization: Bearer <token>` em todas as requisições autenticadas.

## Rotas

| Rota | Guard | Descrição |
|------|-------|-----------|
| `/login` | guestGuard | Login (GitHub ou convidado) |
| `/auth/callback` | - | Callback OAuth |
| `/` | authGuard | Home com board |

## API

Serviços `ColumnsService` e `CardsService` consomem REST:

- Colunas: `POST/GET/PATCH/DELETE /columns`
- Cards: `POST/GET/PATCH/DELETE /cards`, `PATCH` para mover entre colunas

Rotas de criação, edição e exclusão exigem token.

## Socket.IO

Namespace `/kanban`. Eventos: `card:created`, `card:updated`, `card:deleted`, `column:created`, `column:updated`, `column:deleted`.

O board atualiza o estado local ao receber eventos, sem recarregar a lista. Drag-and-drop usa atualização otimista: o card muda de coluna imediatamente e reverte em caso de erro na API.

## Board

- Colunas horizontais com scroll
- Cards com título, conteúdo e autor (avatar ou inicial)
- Drag-and-drop entre colunas (Angular CDK)
- CRUD inline (editar coluna/card, mover card, excluir)
- Overlay de loading em operações assíncronas (criar, editar, mover, excluir)
