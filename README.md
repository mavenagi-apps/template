## App Template for Maven AGI

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/mavenagi-apps/template?template=false)

### About

This template is a boilerplate App for Maven AGI, which allows developers to add additional capabilities to an agent running on Maven AGI. There are several types of available APIs, including the `ask` API for making conversational requests, APIs for ingesting knowledge and user data for personalization, plus event listeners for important agent events. See our [developer documentation](https://developers.mavenagi.com) for more info.

### Capabilities

All capabililties are installed into Maven AGI on app installation in `src/index.ts`.

- Experience - see `src/app/page.tsx`
- Knowledge - see `src/lib/knowledge.ts`
- Actions - see `src/lib/actions.ts`
- `TODO` Personalization - see `src/lib/users.ts`
- `TODO` Triggers - see `src/app/api/routes.ts`

### Getting Started

First, install the project dependencies:

```bash
% pnpm install
```

Run the development server:

```bash
% pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Use `curl -X POST http://localhost:3000/api` to exercise the api route.

### Committing

This App template uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) to drive [semantic versioning](https://semver.org/). Commits are linted and `git-cz` is installed to help create quality commit messages. To run:

```bash
% pnpm cz
```

### Installing

For instructions on installing on an agent, see our [product documentation](https://docs.mavenagi.com)

### Using
