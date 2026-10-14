# Property Platform Design

## Goal

Build the property experience on top of the existing Next.js app, TypeORM entities, and `/api/properties` routes, removing the old static seeded listing data from the user-facing flow.

## Scope

The implementation covers public listings, property detail pages, online applications, and a lightweight admin panel for managing listings and applications. Existing folders must be reused: `src/app/property`, `src/app/api/properties`, `src/components/property`, `src/schema`, and `src/lib`.

## Data Model

The existing `Property`, `PropertyMedia`, `PropertyLocation`, and `Application` entities remain the source of truth. `Property` will add `property_type` for filter support and `amenities` as a JSON string array for the detail page amenities list. Property statuses remain `Available`, `Sold`, `Rented`, and `Draft`. Public listings show non-draft properties by default.

## Public Listings

`PropertyListingsHub` will fetch from `/api/properties` using `propertyService`. It will map API records into card data, using the first image media item as the featured image and a neutral visual fallback when no image exists. The page will support grid and list views, keyword/location search, status/type/bedroom filters, price range filters, sorting, and pagination.

## Property Detail

Create `/property/[id]` as a dedicated detail page. It will fetch a single property from `/api/properties/[id]`, show a photo gallery, core specs, full description, amenities, documents, a location block, and a map embed when latitude and longitude are available. It will include a direct application form for that property.

## Online Application

Create an application API route that validates applicant fields and stores `Application` records. Uploaded document handling will be URL-based for this pass: the form accepts one or more document URLs and stores them in `guest_document_upload_urls`. Confirmation and admin notification email fields are designed for Resend integration, but if email keys are unavailable the API still records the application and leaves `confirmation_email_id` empty.

## Admin Panel

Create admin pages under `src/app/admin/properties` and `src/app/admin/applications`. Listing management will use server actions or API routes to create, update, delete, and status-change properties. Image management will accept media URLs, media type, and display order. Application management will show submitted applications and allow status updates.

## Seeded Data Removal

Remove user-facing imports from `src/data/properties.ts`, then delete the file if no imports remain. The application should display an empty state when the database has no properties instead of falling back to seeded placeholders.

## Testing

Add focused tests for property mapping/filter helpers and application validation where the project tooling supports them. Always run `npm run typecheck`; run `npm run build` after implementation to verify route compilation.
