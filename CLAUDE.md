# Custimoo Admin v3

E-commerce admin dashboard built with Vue 3 + TypeScript + Vite.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Type-check and build for production
- `npm run type-check` — Run `vue-tsc --build`
- `npm run lint` — ESLint with auto-fix
- `npm run format` — Prettier on `src/`
- `npm run storybook` — Storybook on port 6007

## Stack

- **Framework:** Vue 3 with `<script setup lang="ts">`
- **Build:** Vite 7
- **UI:** shadcn-vue (new-york style) + reka-ui + Tailwind CSS 4
- **Icons:** lucide-vue-next
- **Tables:** @tanstack/vue-table
- **Forms:** vee-validate + zod
- **Utilities:** @vueuse/core, clsx, tailwind-merge

## Project Structure

```
src/
  components/admin/   # App-specific components (AdminLayout, SidebarNav, DataTable, etc.)
  components/ui/      # shadcn-vue primitives (button, card, dialog, table, etc.)
  pages/              # Route page components
  composables/        # Composition API hooks (useOrders, etc.)
  router/             # Vue Router config (lazy-loaded routes)
  data/               # Mock data
  lib/utils.ts        # cn() helper (clsx + tailwind-merge)
```

## Component Hierarchy

- `components/admin/` contains high-level, app-specific components that compose `ui/` primitives with our design tokens and layout patterns.
- `components/ui/` contains low-level shadcn-vue primitives.
- **Always prefer admin components over ui components.** Before using a `ui/` component directly, ask the user — they need to validate whether an existing admin component already covers the use case or whether a new one should be created.

## Figma to Code Workflow

When implementing designs from Figma:

1. The user shares a Figma link to a component.
2. Figma Console MCP takes a screenshot of the design.
3. Code is generated to match the design.
4. MCP screenshots the implementation and evaluates it against the Figma design — both visually and functionally.
5. This screenshot-code-evaluate loop repeats until the result matches the Figma spec.

## Code Style

- **No semicolons**, single quotes, no trailing commas, 100-char line width
- Components use PascalCase filenames, composables use `use` prefix
- Path alias: `@/*` maps to `src/*`
- Tailwind utility classes only — no scoped CSS or BEM
- Use `cn()` from `@/lib/utils` for conditional/merged classes
- Props typed with `defineProps<Props>()`
- Barrel exports via `index.ts` in component directories

## Pre-commit Hooks

Husky runs on commit: `vue-tsc` type-check, then lint-staged (Prettier + ESLint on staged files).

## Design Tokens

- Warm beige color palette (not gray) defined as CSS custom properties in `src/index.css`
- Geist font family (Regular, Medium, SemiBold, Bold) in `/public/fonts/`
- Base border radius: `0.625rem`
