# JapWorld — Context Summary

Use this file when starting a **fresh chat** so the assistant has project context without copying from prior sessions.

**Last updated:** May 2026 (from full build session: portals, invoices, PDF viewer, admin revamp, notes).

---

## 1. What We’re Building

**JapWorld** — Premium Japanese vehicle import website with:

- **Public marketing site** (warm charcoal/gold heritage theme, hero, services, etc.)
- **Client portal** (B2B): balance, transactions, invoices, vehicles, documents, stock status — **no self-registration**
- **Admin portal**: manage clients, payments, invoices, vehicles, documents, notes — **manual control only**

**Goal:** Professional, transparent, organized — clients shouldn’t need to message for balances or vehicle status.

**Hosting:** Netlify via GitHub (`japworld.co.uk`). SPA routing required.

---

## 2. Tech Stack

| Layer | Choice |
|--------|--------|
| Frontend | React 18, TypeScript, Vite, React Router |
| Data | TanStack Query, Supabase client |
| UI | shadcn/ui, Tailwind CSS, Lucide icons |
| Forms | react-hook-form, Zod |
| PDF invoices | `@react-pdf/renderer` (Helvetica only — **no custom fonts**) |
| Backend | Supabase: PostgreSQL, Auth, Storage, Edge Functions (Deno) |

**Supabase project URL:** `https://rulolhueynckktfljgwk.supabase.co`

**Env vars (frontend):** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — in `.env.local` (gitignored) and Netlify.

**Never commit:** `service_role` key, access tokens, `.env.local`.

---

## 3. Git / Deploy Conventions

- User wants changes **pushed to git automatically** after work (don’t ask each time).
- `netlify.toml` + `public/_redirects`: `/* /index.html 200` for SPA routes.
- Build: `npm run build` → `dist/`.

---

## 4. Database Schema (Migrations)

Run in order in Supabase SQL Editor (or `supabase db push` if linked):

| Migration | Purpose |
|-----------|---------|
| `001_initial_schema.sql` | Tables, enums, RLS helpers (`get_my_role`, `get_my_client_id`), triggers |
| `002_storage.sql` | `vehicle-documents` bucket policies |
| `003_must_change_password.sql` | `profiles.must_change_password` + `handle_new_user` for clients |
| `004_invoice_pdfs.sql` | `invoices.pdf_storage_path`, `invoices` bucket + RLS |
| `005_client_notes.sql` | `client_notes` table — confirm applied in production |

### Core tables

- `profiles` (role: `admin` \| `client`, `client_id`, `must_change_password`)
- `clients`, `transactions`, `invoices`, `vehicles`, `vehicle_documents`, `vehicle_status_history`
- **`client_notes`**: `client_id`, `created_by` (auth user), `note_text`, timestamps — admin-only RLS

### Enums

- `vehicle_status`: `in_yard`, `waiting_booking`, `loaded`, `on_ship`
- `invoice_status`: `draft`, `issued`, `paid`, `partially_paid`, `overdue`
- `document_type`: `photo`, `auction_sheet`, `invoice`, `other`

**Admin user:** Must have `profiles.role = 'admin'` (often fixed manually via SQL).

---

## 5. Authentication & Security

### Supabase Auth (configured by user)

- Email/password auth; signups enabled for admin-created clients.
- Email confirmation / 2FA **disabled** per user request.
- **First login:** clients with `must_change_password = true` → forced to `/portal/change-password` before portal (`ClientRoute` + `AuthContext`).

### Password reset

- Dedicated page: `/reset-password` (parses hash token, `updateUser`).
- `resetPasswordForEmail` redirect must be whitelisted in Supabase:  
  `https://japworld.co.uk/reset-password` (and localhost for dev).

### Edge Functions (`verify_jwt = false` — manual JWT in function)

| Function | Purpose |
|----------|---------|
| `create-client-user` | `admin.createUser()` without logging out admin |
| `delete-auth-user` | `admin.deleteUser()` + cascade client data; caller must be admin |

**Secrets:** `SERVICE_ROLE_KEY` set in Supabase Edge Function secrets.

**Frontend:** Pass `Authorization: Bearer ${session.access_token}` on `fetch()` to functions.

### RLS pattern

- Admins: full access via `get_my_role() = 'admin'`.
- Clients: read own data via `get_my_client_id()`.

---

## 6. Storage Buckets

| Bucket | Use | Path pattern |
|--------|-----|----------------|
| `vehicle-documents` | Photos, auction sheets, linked invoice PDFs as docs | per vehicle |
| `invoices` | Auto/custom invoice PDFs | `{client_id}/{invoice_id}.pdf` |

Signed URLs for private access (`getInvoicePDFUrl`, vehicle doc hooks).

---

## 7. Admin Portal — Features & Files

**Layout:** `src/components/admin/AdminLayout.tsx` — floating glass nav (`glass-nav`), theme toggle, user dropdown (email `truncate`, `w-64`).

**Pages:** `AdminDashboard`, `AdminClients`, `AdminClientDetail`, `AdminVehicles`, `AdminLogin`

### AdminClientDetail tabs

1. **Account Info** — inline edit, portal login creation (Edge Function), password reset email
2. **Balance & Payments** — record payments, transaction history
3. **Invoices** — create, status, delete, **auto PDF**, custom PDF upload, link to vehicle → auto-upload as `vehicle_document` type `invoice`
4. **Vehicles & Docs** — bulk photo upload (50–100), thumbnails, **ImageGallery** fullscreen
5. **Notes & Activity** — activity log, timestamps, add/delete; **delete uses in-app modal** (not `window.confirm`)

### Important invoice flow (fixed)

`useCreateInvoice` must **re-fetch** invoice after setting `pdf_storage_path` so `AdminClientDetail` can attach PDF to vehicle documents. Without this, client vehicle “Invoices” tab was empty.

### PDF generation

- `src/components/InvoicePDF.tsx` — **Helvetica / Helvetica-Bold only** (Inter caused `DataView` font error).
- `src/lib/invoicePDF.tsx` — generate, upload, signed URL, custom upload.

### PDF viewing (critical implementation)

- `src/components/PDFViewer.tsx` — modal (not new tab).
- On open: `document.body.style.pointerEvents = "none"`; modal has `pointerEvents: "auto"`.
- Modal `z-[99999]`; header buttons use `stopPropagation`.
- **Do not** rely only on z-index vs nav (`z-50`) — body pointer-events pattern is required.

### Delete confirmations

- Clients, invoices, vehicles: custom modals.
- **Notes:** `noteToDelete` state + modal at `z-[100]`, preview text, Cancel / Delete note, backdrop click closes.

### Client creation

- Temp password auto-generated; shown after create via Edge Function (admin stays logged in).
- Full client delete via `delete-auth-user` Edge Function.

---

## 8. Client Portal — Features & Files

**Layout:** `src/components/portal/PortalLayout.tsx` (mirrors admin floating nav + theme toggle).

**Pages:** Dashboard, Account, Transactions, Invoices, Vehicles, Vehicle Detail, Stock, ChangePassword

- Outstanding balance: **red** (`text-red-500`), not gold.
- **PortalInvoices** + vehicle detail: view invoice PDF via **PDFViewer** modal.
- **PortalVehicleDetail**: photo grid + **ImageGallery** (same as admin).
- Read-only; data scoped by `client_id` from auth profile.

---

## 9. UI / UX Evolution

### Public site

- Background: **warm charcoal** (user preferred over pure black).
- Theme toggle on main nav; dark = charcoal/gold, light = clean + **blue primary** (`217 91% 60%`).
- User reverted one hero opacity experiment via git revert to `main@5aa4f11` — don’t re-apply without asking.

### Admin + client dashboards (revamp)

- **UI/UX Pro Max skill:** `.cursor/skills/ui-ux-pro-max/` (**project-only**, not global Cursor).
- Design system: Trust & Authority, navy/slate, **Fira Sans** on dashboards (public site may still use Zen Kaku).
- CSS utilities: `metric-card`, `admin-table`, `status-badge`; `prefers-reduced-motion` respected.
- **Bug fixed:** `User` icon missing import on `AdminDashboard` → blank white screen.

### Readability

- Light mode foreground → near black; titles bold.

### Icons

- Replaced 🚗 on admin dashboard with Lucide status icons (`Warehouse`, `Clock`, `Package`, `Ship`).

---

## 10. Key Components (Reusable)

| Component | Path | Purpose |
|-----------|------|---------|
| `ImageGallery` | `src/components/ImageGallery.tsx` | Fullscreen images, arrows, zoom, thumbs, download |
| `PDFViewer` | `src/components/PDFViewer.tsx` | Fullscreen PDF iframe modal |
| `InvoicePDF` | `src/components/InvoicePDF.tsx` | Branded PDF template |
| `ThemeToggle` | `src/components/ThemeToggle.tsx` | Light/dark |
| `ClientRoute` / `AdminRoute` | `src/components/` | Role + forced password change |

---

## 11. Data Hooks

**File:** `src/hooks/usePortalData.ts`

Central queries/mutations. Notable:

- `useCreateInvoice` — generates PDF, uploads, updates `pdf_storage_path`, returns fresh row.
- `useDeleteClient` → Edge Function.
- `useClientNotes`, `useCreateClientNote`, `useDeleteClientNote`.
- Helpers: `formatCurrency`, `computeBalance`, `computeOutstanding`, status label/color maps.

**Types:** `src/lib/database.types.ts` (keep in sync with migrations).

---

## 12. App Routing

**File:** `src/App.tsx`

Provider order (must stay nested correctly):

`QueryClientProvider` → `ThemeProvider` → `TooltipProvider` → `BrowserRouter` → `AuthProvider`

Routes: `/admin/*`, `/portal/*`, `/login`, `/admin/login`, `/reset-password`, `/portal/change-password`, public pages.

---

## 13. Supabase Setup Checklist

1. Run migrations `001`–`005`.
2. Ensure `vehicle-documents` bucket exists.
3. Enable email signups; disable confirm email if desired.
4. Set admin `profiles.role = 'admin'` via SQL.
5. Deploy Edge Functions + `SERVICE_ROLE_KEY` secret.
6. Whitelist redirect URLs for password reset.
7. Netlify env vars for Vite Supabase keys.

**Past issue:** `004` was sometimes applied manually via Management API when `db push` failed (`Bucket not found`).

---

## 14. Troubleshooting History

| Issue | Cause | Fix |
|-------|--------|-----|
| Netlify 404 on `/admin/login` | No SPA fallback | `netlify.toml` + `_redirects` |
| Admin login “no admin access” | `profiles.role` not admin | SQL update |
| “Signups not allowed” | Supabase setting | Enable signups |
| Admin logged out on client create | `signUp` from frontend | `create-client-user` Edge Function |
| Client delete leaves auth user | No service role on client | `delete-auth-user` Edge Function |
| Edge Function 401 | JWT gateway vs manual verify | `verify_jwt = false` + manual `getUser(token)` |
| Invoice PDF font crash | Custom Inter font | Helvetica only |
| Bucket not found `invoices` | Migration not applied | Run `004` |
| Invoice missing on vehicle tab | Stale invoice row after PDF | Re-select after `pdf_storage_path` update |
| PDF modal buttons dead | Nav + iframe pointer events | `body pointer-events: none` + modal `auto` |
| Dashboard white screen | `User` not imported | Add to lucide imports |

---

## 15. Agent / User Conventions

- **Push to git** after changes unless user says otherwise.
- **Minimize scope**; match existing patterns.
- **Don’t commit** secrets or service role keys.
- For major UI work: read `.cursor/skills/ui-ux-pro-max/SKILL.md`.

---

## 16. Repo Structure (Quick Reference)

```
src/
  pages/admin/          AdminDashboard, AdminClients, AdminClientDetail, ...
  pages/portal/         Portal* pages, ChangePassword
  components/           ImageGallery, PDFViewer, InvoicePDF, admin/, portal/
  hooks/usePortalData.ts
  contexts/AuthContext.tsx, ThemeContext.tsx
  lib/supabase.ts, database.types.ts, invoicePDF.tsx
supabase/
  migrations/001-005
  functions/create-client-user/, delete-auth-user/
netlify.toml
public/_redirects
.cursor/skills/ui-ux-pro-max/
Context Summary.md      ← this file
```

---

## 17. Starting a Fresh Chat

Tell the assistant:

> Read `Context Summary.md` in the JapWorld repo for full project context. Stack: React/Vite/Supabase/Netlify. [Then describe your task.]

Or attach / `@Context Summary.md` in Cursor.

---

*Maintain this file when major features, schema, or deployment steps change.*
