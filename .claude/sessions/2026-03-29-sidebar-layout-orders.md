# Session: Sidebar, Layout & Orders Page Components
**Date:** 2026-03-29

## What we're building
Custimoo Admin v3 — a Vue 3 + TypeScript admin panel using shadcn-vue patterns, TailwindCSS 4, reka-ui primitives, and a warm beige design system. The UI kit lives in `custimoo-ui-kit` (shared components) and the app in `custimoo-admin-v3` (admin-specific components + pages).

## What was done this session

### 1. Sidebar Logo & Toggle Button
- **CustimooLogo.vue** — Full SVG wordmark, uses `currentColor` for text paths, hardcoded `#14A892` teal for the "i" dot.
- **CustimooLogoMark.vue** — Collapsed "C" SVG logomark for the narrow sidebar.
- **SidebarButton.vue** — 28x28 toggle button with `PanelLeft` icon. Calls `toggleCollapsed` (injected from AdminLayout).
- **Hover behavior:** The `group/sidebar` class is on the `<nav>` element. In expanded mode, the logo stays visible and the sidebar button appears on hover (absolutely positioned, `right-2`). In collapsed mode, the logomark becomes `invisible` (preserving height) and the button replaces it centered.

### 2. Admin Layout — Content Area
- **Outer wrapper:** `pt-2 pr-2 pb-2` (8px padding top/right/bottom, 0 left) creates the beige frame around the white content.
- **White page container:** `rounded-xl border border-border bg-card shadow-[...]` — full border radius, 1px border, subtle shadow.
- **Sheet-ready architecture:** The main area is a flex row (`gap-2`) with `<slot name="sheets" />` alongside the `<main>`. Future sheets will stack as flex siblings, compressing the main content via `min-w-0 flex-1`.

### 3. PageHeader Component
- Simplified to just `title` prop + `#actions` slot.
- Fixed height `h-16` (64px), `px-4`, `border-b border-border`.
- Title: `text-xl font-semibold`. Actions: `gap-2` flex row.
- Removed breadcrumbs/description props (were unused per Figma design). Cleaned up SettingsPage and OrderDetailPage accordingly.

### 4. Button Size Fix (UI Kit)
- **Critical:** Figma default button is 32px (`h-8`), not 36px (`h-9`).
- Updated `buttonVariants` default size from `h-9 px-4 py-2` to `h-8 px-3`.
- Also fixed `sm` size: removed forced `text-xs` so it inherits base `text-sm`.
- Icon sizes adjusted: `icon: 'size-8'`, `icon-sm: 'size-7'`.

### 5. Tab View System (Orders Page)
- **TabViewItem.vue** — Reusable tab component: 48px tall, inner 32px rounded-md container, color indicator dot, label, optional edit icon (pen). Props: `active`, `editable`, `indicatorColor`. Named `#edit` slot for custom edit trigger content.
- **Tab bar layout:** `h-12`, `border-b border-border`, `px-2`. Tabs in a flex group with `gap-1`. Vertical `1px` divider. Ghost "Save view" button.
- "All orders" tab has no `editable` flag (no pen icon). "Invoice dashboard" and "Mark to factory" have `editable` + `indicatorColor`.

### 6. ViewPopover Component
- **Two modes:** New view (Save button footer) vs. editing existing view (Share view + Delete view sections).
- **Mode detection:** `isEditing` computed — `true` when `viewName` prop is provided.
- **Sections:** Name input with color dot, color selector (8 dots), "Included in this view" (Columns + Filters checkboxes), and conditionally: "Share view" (Global toggle + Copy link) or "Save" footer.
- Uses `Separator` between each section.
- **Switch component** from UI kit used for Global toggle.

## Known issues / in-progress

### ViewPopover edit mode not rendering
The `isEditing` computed evaluates to `false` even when `viewName` prop is passed. The prop value reaches the component (confirmed: input shows pre-filled name), but the computed doesn't see it as truthy. **Suspect:** May be a Vue reactivity edge case with the prop name or computed timing. This was being actively debugged when the session paused.

The prop was renamed from `name` to `viewName` to avoid potential HTML attribute conflicts, but the issue persists. The `@click.stop` on the edit wrapper in TabViewItem was also adjusted to prevent tab navigation when clicking the pen icon.

### Click propagation on pen icon
Nesting a `PopoverTrigger` button inside a `TabViewItem` (which is a `div[role="button"]`) creates click bubbling complexity. Current approach: TabViewItem is a `div` (not `button`) to allow nested buttons. The `#edit` slot wraps content in a `<span>` for isolation. The pen icon trigger uses a `<button>` wrapped in `ViewPopover`.

## Architecture notes for future LLMs

### Component locations
- **UI Kit** (`custimoo-ui-kit/src/components/ui/`): Shared primitives (Button, Checkbox, Switch, Popover, Separator, etc.). shadcn-vue pattern with CVA variants.
- **Admin components** (`custimoo-admin-v3/src/components/admin/`): App-specific (AdminLayout, SidebarNav, PageHeader, TabViewItem, ViewPopover, CustimooLogo, etc.).
- **Pages** (`custimoo-admin-v3/src/pages/`): OrdersPage, OrderDetailPage, SettingsPage.

### Design tokens
All in `custimoo-admin-v3/src/index.css`. Warm beige palette, OKLCH color space. Key tokens: `--background` (beige), `--card` (white), `--primary` (teal #14A892), `--border` (beige-200), `--foreground-secondary`, `--foreground-tertiary`.

### Patterns to follow
- Use semantic color tokens (`text-foreground`, `bg-card`, `border-border`) not hardcoded hex.
- Use `cn()` utility for class merging.
- Components use `<script setup lang="ts">` with `defineProps<{}>()`.
- Button sizes: default=32px, sm=28px, icon=32px. Do NOT use `h-9` for buttons.
- Popover pattern: `Popover > PopoverTrigger(as-child) > slot > PopoverContent`.

### What NOT to do
- Don't use `name` as a Vue component prop — it can conflict with HTML attributes and cause reactivity issues.
- Don't nest `<button>` inside `<button>` — use `div[role="button"]` for the outer element.
- Don't use `@click.stop` on a `PopoverTrigger`'s child — it prevents the trigger from receiving the click. Instead, stop propagation on a wrapper element above the trigger.
