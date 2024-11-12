## App Template for Maven AGI

### About

This template shows how to create and install a Maven AGI App, which adds additional capabilities to an agent running on Maven AGI. There are several types, including complete interfaces, knowledge adapters, user personalization adapters and event listeners. See our documentation for more info.

### Capabilities

All capabililties are installed into Maven AGI on app installation in `src/index.ts`.

- Experience - see `src/app/page.tsx`
- Knowledge - see `src/lib/knowledge.ts`
- Actions - see `src/lib/actions.ts`
- `TODO` Personalization - see `src/lib/users.ts`
- `TODO` Triggers - see `src/app/api/routes.ts`

### Getting Started

First, install the dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Use `curl -X POST http://localhost:3000/api` to exercise the api route.
