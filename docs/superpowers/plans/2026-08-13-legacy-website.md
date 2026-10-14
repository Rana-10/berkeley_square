# Legacy Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality public Next.js website for Loan Legacy, Property Legacy, and Construction Legacy with a secure-ready multi-step loan application.

**Architecture:** Fresh Next.js App Router project with strict TypeScript, Tailwind CSS, client components only where interactivity is needed, static content data files, reusable layout/section/form components, and a service abstraction for future backend integration.

**Tech Stack:** Next.js, TypeScript, React, Tailwind CSS, Framer Motion, React Hook Form, Zod, Lucide React.

## Global Constraints

- Use Next.js and TypeScript only for the app implementation.
- Do not build an admin panel, admin authentication, admin dashboards, chatbot widget, chatbot API, or AI assistant.
- Do not log passport numbers, addresses, uploaded identity documents, or sensitive application data.
- Do not store sensitive data in localStorage or expose it in URL query parameters.
- Use static structured content files for editable public content.
- Loan application must be multi-step, mobile-first, validated, and backend-ready.

---

### Task 1: Scaffold Project

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `.eslintrc.json`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`

**Interfaces:**
- Produces: working Next.js App Router shell and global theme tokens.

- [x] Create config files for strict TypeScript, Next.js, Tailwind, and linting.
- [x] Create root layout with metadata and global styles.
- [x] Create initial home page route.

### Task 2: Public Website Structure

**Files:**
- Create: `src/data/*.ts`, `src/components/layout/*.tsx`, `src/components/sections/*.tsx`, `src/components/cards/*.tsx`, `src/components/gallery/*.tsx`, `src/components/animations/*.tsx`
- Create: public routes under `src/app/{services,loans,property,construction,about,gallery,reviews,contact}/page.tsx`

**Interfaces:**
- Consumes: static content arrays from `src/data`.
- Produces: reusable public-facing sections and all required routes.

- [x] Build responsive navigation and footer.
- [x] Build premium dark sections, cards, CTAs, stats, gallery, reviews, contact.
- [x] Add route metadata and semantic headings.

### Task 3: Loan Application Data Model And Services

**Files:**
- Create: `src/types/loan.ts`, `src/lib/validation.ts`, `src/lib/loan-application-service.ts`

**Interfaces:**
- Produces: `LoanApplication`, Zod schemas, and `loanApplicationService`.

- [x] Define strongly typed loan application model.
- [x] Define validation schemas with conditional sections.
- [x] Add backend-ready service abstraction without logging sensitive data.

### Task 4: Loan Application Wizard

**Files:**
- Create: `src/components/loan/*.tsx`, `src/app/loan-application/page.tsx`

**Interfaces:**
- Consumes: `LoanApplication` types, validation schemas, and service abstraction.
- Produces: functional 17-step wizard with dynamic repeatable sections.

- [x] Build stepper, progress, navigation, success screen.
- [x] Build reusable address, contact, applicant, mortgage, asset, upload components.
- [x] Implement conditional previous address, mortgage, additional questions, and file upload UI.

### Task 5: Verification

**Files:**
- Modify any file with TypeScript/build issues.

**Interfaces:**
- Produces: passing build or a clear blocker if dependencies cannot be installed.

- [ ] Run dependency install when available.
- [ ] Run type check/build.
- [ ] Start dev server and verify routes.
