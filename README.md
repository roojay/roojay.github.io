# roojay.github.io

Personal website for roojay.com, built with React, Vite, Tailwind CSS, and pnpm.

## Development

Requirements:

- Node.js 22
- pnpm 10

Install dependencies:

```sh
pnpm install
```

Start the local development server:

```sh
pnpm dev
```

Run type checks:

```sh
pnpm lint
```

Build the production site:

```sh
pnpm build
```

## Deployment

The source branch contains the application code. GitHub Actions builds the site from `source` and publishes the generated `dist` output to `master`, which is the GitHub Pages publishing branch for this repository.

Static files in `public/` are copied to the root of `dist` by Vite. The custom domain is defined in `public/CNAME`.
