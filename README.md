# Blog App

A Next.js + TypeScript blog application scaffolded with a component-driven UI. It includes client and server actions, reusable UI components, and a dashboard for managing blogs and profile updates.

## Features

- Next.js (App Router) with server and client components
- TypeScript and Zod for schema validation
- React Hook Form for form handling
- Reusable UI primitives (Button, Card, Dialog, Form controls)
- Dashboard with blog CRUD pages and profile/project update screens
- API utilities and Axios wrapper in `src/utils`

## Quick structure overview

- `src/app` - Next.js app routes and layouts
  - `(dashboard)` - Authenticated dashboard area (create/update blogs, profile)
  - `(public)` - Public-facing pages (home, about, blogs)
- `src/components` - UI components and modules grouped by feature
  - `modules/Blog` - Blog components (list, details, forms)
  - `ui` - Design system primitives (button, input, dialog, form helpers)
- `src/action` - Client/server actions (create/update blog, profile)
- `src/utils` - API helpers and Axios instance
- `src/provider` - Auth provider and context

## Prerequisites

- Node.js 18+ (recommended)
- pnpm or npm (examples below use npm)

## Setup (Windows PowerShell)

Open PowerShell in the project root (`c:\Level2\blog-app`) and run:

```powershell
# install dependencies
npm install

# start development server
npm run dev
```

The app will typically be available at http://localhost:3000

## Linting, Formatting & Typecheck

```powershell
npm run lint
npm run build  # runs TypeScript checks and Next build
```

## Working with forms

- Forms use `react-hook-form` and `zod` for validation. Example form schemas are in `src/components/modules/*`.
- Tags are handled as a string list separated by commas in the UI and normalized to arrays before submission.

## Common types and troubleshooting

- If you see TypeScript complaints about `thumbnail` or other optional props (e.g. `Type 'string | undefined' is not assignable to type 'string'`), either:
  - Ensure the type on the receiving API expects optional fields (e.g. `thumbnail?: string`), or
  - Normalize the value before calling the API: `payload.thumbnail = payload.thumbnail ?? ''`.



## Contributing

1. Fork the repo
2. Create a topic branch
3. Open a PR describing your changes

Follow the project's code style and add tests for new features where appropriate.


## Live Link

- **frontend**   https://blog-app-pied-three.vercel.app
- **Backend**    https://blog-server-ah0g.onrender.com
