# Property Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build public property listings, property detail pages, online applications, admin management, and remove static seeded property data.

**Architecture:** The TypeORM entities and `/api/properties` routes remain the source of truth. Client UI fetches serialized API records, maps them through focused helpers, and renders public views with empty states instead of seeded fallbacks. Admin and application APIs use repository functions so data access remains centralized.

**Tech Stack:** Next.js App Router, React 19, TypeScript, TypeORM, Postgres, Tailwind CSS, Zod, lucide-react.

**Spec:** `docs/superpowers/specs/2026-09-01-property-platform-design.md`

## Global Constraints

- Reuse existing property folders and routes; do not duplicate them.
- Remove user-facing dependency on `src/data/properties.ts`.
- Public listings must support grid cards, featured image, price, status badge, bedrooms, bathrooms, area, search, filters, and pagination.
- Detail pages must show gallery, location map/block, amenities, and application entry point.
- Application records must use the existing `Application` entity fields.
- Add `property_type` and `amenities` to `Property` because the requested UI needs those fields.

---

### Task 1: Property API Types And Mapping Helpers

**Files:**
- Modify: `src/schema/property.entity.ts`
- Modify: `src/lib/property-repository.ts`
- Modify: `src/lib/property-service.ts`
- Create: `src/lib/property-view-model.ts`

**Interfaces:**
- Produces: `PropertyViewModel`, `mapPropertyToViewModel(property: PropertyResponse): PropertyViewModel`, `filterPropertyViewModels(properties, filters): PropertyViewModel[]`.
- Consumes: existing `PropertyResponse` from `src/lib/property-service.ts`.

- [ ] **Step 1: Add failing type-level/helper tests if a local test runner exists**

Run `Get-Content package.json` and check for a test script. If no test runner exists, use `npm run typecheck` as the verification gate for this task and document that automated unit tests are unavailable.

- [ ] **Step 2: Add schema fields**

Add to `Property`:

```ts
@Column({ type: "varchar", default: "Residential" })
property_type!: string;

@Column({ type: "jsonb", nullable: true })
amenities!: string[] | null;
```

- [ ] **Step 3: Extend serialized response**

Add `property_type` and `amenities` to `PropertyResponse` and `serializeProperty`.

- [ ] **Step 4: Create view model helpers**

Create `src/lib/property-view-model.ts` with:

```ts
export type PropertyViewModel = {
  id: number;
  title: string;
  price: number;
  priceDisplay: string;
  status: PropertyStatus;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  addressLabel: string;
  city: string;
  country: string;
  featuredImage: string | null;
  images: string[];
  documents: PropertyMediaResponse[];
  amenities: string[];
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
};
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck`

Expected: exits successfully.

### Task 2: Public Listings From API

**Files:**
- Replace focused sections in: `src/components/property/PropertyListingsHub.tsx`
- Modify: `src/app/property/page.tsx`
- Modify: `src/app/property/listings/page.tsx`
- Delete after imports are gone: `src/data/properties.ts`

**Interfaces:**
- Consumes: `propertyService.getProperties()`, `mapPropertyToViewModel`, `filterPropertyViewModels`.
- Produces: API-backed listings UI with pagination and empty state.

- [ ] **Step 1: Replace static data imports**

Remove imports from `@/data/properties`. Import `propertyService`, `PropertyViewModel`, mapping and filtering helpers, and schema enum types.

- [ ] **Step 2: Fetch live properties**

Use `useEffect` to load `/api/properties`, track `loading`, `error`, and `properties`.

- [ ] **Step 3: Implement filters**

Filter by keyword across title/address/city/country, status, `propertyType`, bedrooms minimum, and price range. Exclude `Draft` in public view.

- [ ] **Step 4: Keep pagination and cards**

Keep the existing grid/list visual direction, but bind each card to `PropertyViewModel`. Link detail actions to `/property/${property.id}` and include a direct apply link to `/property/${property.id}#apply`.

- [ ] **Step 5: Remove seeded data**

Run `rg "@/data/properties|propertyListings|propertyCategories|propertyStatuses" src`. If only `src/data/properties.ts` remains, delete it.

- [ ] **Step 6: Verify**

Run: `npm run typecheck`

Expected: exits successfully.

### Task 3: Property Detail And Application Form

**Files:**
- Create: `src/app/property/[id]/page.tsx`
- Create: `src/components/property/PropertyDetailView.tsx`
- Create: `src/components/property/PropertyApplicationForm.tsx`
- Create: `src/app/api/applications/route.ts`
- Create: `src/lib/application-repository.ts`
- Create: `src/lib/application-validation.ts`

**Interfaces:**
- Consumes: `propertyService.getProperty(id)` and `POST /api/applications`.
- Produces: `createApplication(input)` and `applicationInputSchema`.

- [ ] **Step 1: Create validation**

Use Zod to validate: `property_id`, `guest_first_name`, `guest_last_name`, `guest_email`, `guest_phone_number`, `guest_current_address`, optional `message_from_applicant`, optional `guest_document_upload_urls`.

- [ ] **Step 2: Create repository**

Create `createApplication(input)` that writes an `Application` record with status `Pending`.

- [ ] **Step 3: Create API route**

`POST /api/applications` validates JSON, persists the application, and returns `{ id, status, submitted_at }`.

- [ ] **Step 4: Build detail view**

Render gallery, specs, description, amenities, documents, address, coordinates, map iframe when coordinates exist, and fallback map link when only address exists.

- [ ] **Step 5: Build application form**

Post to `/api/applications`, show pending/success/error states, and reset on success.

- [ ] **Step 6: Verify**

Run: `npm run typecheck`

Expected: exits successfully.

### Task 4: Admin Property And Application Management

**Files:**
- Create: `src/app/admin/properties/page.tsx`
- Create: `src/app/admin/applications/page.tsx`
- Create: `src/app/api/admin/properties/route.ts`
- Create: `src/app/api/admin/properties/[id]/route.ts`
- Create: `src/app/api/admin/applications/route.ts`
- Create: `src/app/api/admin/applications/[id]/route.ts`
- Modify: `src/lib/property-repository.ts`
- Modify: `src/lib/application-repository.ts`

**Interfaces:**
- Produces: `createProperty`, `updateProperty`, `deleteProperty`, `findApplications`, `updateApplicationStatus`.
- Consumes: existing TypeORM data source.

- [ ] **Step 1: Add repository CRUD**

Implement create/update/delete for properties including nested location and media arrays.

- [ ] **Step 2: Add admin property API**

Support `GET`, `POST`, `PATCH`, and `DELETE` with JSON validation.

- [ ] **Step 3: Add application admin API**

Support listing applications and status updates with enum validation.

- [ ] **Step 4: Build admin pages**

Create simple form-based pages for property create/edit/delete/status/media fields and application status management.

- [ ] **Step 5: Verify**

Run: `npm run typecheck`

Expected: exits successfully.

### Task 5: Final Verification

**Files:**
- Review all changed files.

**Interfaces:**
- Consumes: completed Tasks 1-4.
- Produces: verified working build.

- [ ] **Step 1: Run import scan**

Run: `rg "@/data/properties|src/data/properties|propertyListings" src`

Expected: no output.

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`

Expected: exits successfully.

- [ ] **Step 3: Run build**

Run: `npm run build`

Expected: exits successfully.
