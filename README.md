# Aluna Bienestar Integral

Website for Aluna Bienestar Integral, a therapeutic massage and wellness practice in Cartagena. The site is built with React and Vite, with multilingual UI support and markdown-based blog articles in Spanish, English, and French.

## Features

- Responsive one-page homepage with sections for philosophy, treatments, blog previews, testimonials, process, and booking.
- Language selector for Spanish, English, and French.
- Markdown-powered blog with language-specific article folders.
- Clean blog URLs for each language:
  - Spanish: `/blog/drenaje-linfatico`
  - English: `/en/blog/lymphatic-drainage`
  - French: `/fr/blog/drainage-lymphatique`
- Homepage shows the latest 3 articles, with a full blog index available at `/blog`, `/en/blog`, and `/fr/blog`.

## Tech Stack

- React
- Vite
- ESLint
- Markdown files loaded with Vite `import.meta.glob`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm.cmd run dev
```

Build for production:

```bash
npm.cmd run build
```

Run lint checks:

```bash
npm.cmd run lint
```

Preview the production build:

```bash
npm.cmd run preview
```

On Windows PowerShell, `npm.cmd` avoids execution policy issues that can block `npm.ps1`.

## Project Structure

```txt
src/
  App.jsx          Main site layout, routes, language selector, and homepage
  blogPosts.js     Loads and parses markdown blog posts
  blog/
    es/            Spanish articles
    en/            English articles
    fr/            French articles
public/
  logo_h_nb.png
  Katy.jpeg
  tejido-profundo.png
  drenaje.png
  liberacion.png
```

## Blog Articles

Blog articles live in language folders:

```txt
src/blog/es/
src/blog/en/
src/blog/fr/
```

Each translation of the same article should share the same `translationKey`. This lets the language switcher move between equivalent articles.

Example:

```md
---
translationKey: "drenaje-linfatico"
title: "When is lymphatic drainage recommended?"
summary: "Common signs, benefits, and when it can be useful as part of a therapeutic plan."
date: "2026-04-21"
---

Article content goes here.

## Section heading

More article content.
```

The filename becomes the article URL slug for that language.

## Adding a New Article

1. Create one markdown file in each language folder.
2. Use the same `translationKey` in all three files.
3. Use natural slugs for each language.
4. Add `title`, `summary`, and `date` frontmatter.

Example set:

```txt
src/blog/es/nuevo-articulo.md
src/blog/en/new-article.md
src/blog/fr/nouvel-article.md
```

All posts are sorted by `date`, newest first.
