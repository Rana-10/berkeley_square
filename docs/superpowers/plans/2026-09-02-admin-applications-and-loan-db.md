# Admin Applications And Loan DB Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Save loan applications to Postgres, expose admin views for property, appointment, and loan applications, and provide PDF downloads for individual records.

**Architecture:** Follow the existing appointment approach: API routes validate input and write through `pg` using `DATABASE_URL`. TypeORM schema files document the tables used by the app. Admin pages read from focused `/api/admin/*` endpoints and download PDFs from record-specific endpoints.

**Tech Stack:** Next.js App Router, React, TypeScript, Postgres, TypeORM schema entities, PDFKit.

**Spec:** Approved in chat on 2026-09-02.

## Global Constraints

- Keep edits tightly scoped to loan submission, admin application views, PDFs, and admin bottom-section cleanup.
- Do not send loan application emails.
- Persist loan submissions using the same direct Postgres approach as appointment submission.
- Use the existing PDFKit style for professional PDF downloads.

---

### Task 1: Loan Persistence

**Files:**
- Create: `src/schema/loan-application.entity.ts`
- Modify: `src/schema/index.ts`
- Modify: `src/lib/typeorm.ts`
- Create: `src/lib/loan-application-repository.ts`
- Modify: `src/app/api/loan-application/route.ts`

**Interfaces:**
- Produces: `createLoanApplication(input: LoanApplication): Promise<{ reference: string; receivedAt: string }>`
- Produces: `findLoanApplications(): Promise<LoanApplicationRecord[]>`
- Produces: `findLoanApplicationById(id: number): Promise<LoanApplicationRecord>`

- [ ] Add a TypeORM entity for the `loan_application` table.
- [ ] Add repository functions using `getPgPool()`.
- [ ] Replace Resend email behavior with database persistence.
- [ ] Run `npm.cmd run typecheck`.

### Task 2: Admin Views

**Files:**
- Modify: `src/app/admin/applications/page.tsx`
- Create: `src/app/api/admin/appointments/route.ts`
- Create: `src/app/api/admin/loan-applications/route.ts`

**Interfaces:**
- Consumes: property application, appointment, and loan admin endpoints.

- [ ] Split admin applications page into three sections.
- [ ] Add PDF download links for each record type.
- [ ] Remove bottom contact-detail blocks from admin cards.
- [ ] Run `npm.cmd run typecheck`.

### Task 3: PDF Downloads

**Files:**
- Create: `src/app/api/admin/appointments/[id]/pdf/route.ts`
- Create: `src/app/api/admin/applications/[id]/pdf/route.ts`
- Create: `src/app/api/admin/loan-applications/[id]/pdf/route.ts`
- Create: `src/lib/property-application-pdf.ts`

**Interfaces:**
- Consumes: existing `createAppointmentPdf()` and `createLoanApplicationPdf()`.
- Produces: downloadable `application/pdf` responses.

- [ ] Generate appointment PDFs from saved appointment rows.
- [ ] Generate property application PDFs from saved application rows.
- [ ] Generate loan application PDFs from saved JSON payloads.
- [ ] Run `npm.cmd run typecheck`.
