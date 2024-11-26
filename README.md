## App Template for [Maven AGI](https://developers.mavenagi.com/)

[![License](https://img.shields.io/badge/license-APACHE2-blue.svg)](https://github.com/mavenagi-apps/template/blob/main/LICENSE) ![Coverage](https://gist.githubusercontent.com/mwflaher/46d409f23d2b17672adfa2dfe9b6b1f0/raw/coverage.svg) ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=flat&logo=discord&logoColor=white)

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

### Updating your project with the latest template

1. Set the template as a remote for your repo: `git remote add template https://github.com/mavenagi-apps/template.git`
2. `git fetch all`
3. `git merge template/main --allow-unrelated-histories`

Note that you will most likely have merge conflicts for all the existing template files that you have touched; resolving those boils down to always keeping your current changes and ignore incoming changes.

### Installing

For instructions on installing on an agent, see our [product documentation](https://docs.mavenagi.com)

### Using
