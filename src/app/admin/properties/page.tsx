"use client";

import { useEffect, useState } from "react";
import { FileText, ImageIcon, MapPin, Plus, RefreshCcw, Trash2 } from "lucide-react";
import { propertyService, type PropertyResponse } from "@/lib/property-service";
import { PropertyMediaType, PropertyStatus } from "@/schema/property.enums";

const propertyCurrencies = ["GBP", "EUR", "USD"] as const;

const blankForm = {
  title: "",
  price: "",
  currency: "GBP" as (typeof propertyCurrencies)[number],
  status: PropertyStatus.AVAILABLE,
  property_type: "Residential",
  bedrooms: "0",
  bathrooms: "0",
  area: "0",
  full_description: "",
  amenities: "",
  address_line_1: "",
  city: "",
  state_province: "",
  postal_code: "",
  country: "",
  image_urls: "",
};

type PropertyForm = typeof blankForm;

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [form, setForm] = useState<PropertyForm>(blankForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const propertyImageUrls = form.image_urls
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean)
    .slice(0, 6);

  async function loadProperties() {
    setProperties(await propertyService.getProperties());
  }

  useEffect(() => {
    loadProperties().catch(() => setMessage("Unable to load properties."));
  }, []);

  function updateField(name: keyof PropertyForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function editProperty(property: PropertyResponse) {
    setEditingId(property.id);
    setForm({
      title: property.title,
      price: property.price,
      currency: property.currency ?? "GBP",
      status: property.status,
      property_type: property.property_type,
      bedrooms: String(property.bedrooms),
      bathrooms: String(property.bathrooms),
      area: String(property.area),
      full_description: property.full_description,
      amenities: property.amenities.join("\n"),
      address_line_1: property.location?.address_line_1 ?? "",
      city: property.location?.city ?? "",
      state_province: property.location?.state_province ?? "",
      postal_code: property.location?.postal_code ?? "",
      country: property.location?.country ?? "",
      image_urls: property.media.filter((media) => media.type === PropertyMediaType.IMAGE).map((media) => media.file_url).join("\n"),
    });
  }

  async function submitProperty(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const media = [
      ...form.image_urls.split("\n").map((url, index) => ({ file_url: url.trim(), type: PropertyMediaType.IMAGE, display_order: index })),
    ].filter((media) => media.file_url);

    const payload = {
      title: form.title,
      price: form.price,
      currency: form.currency,
      status: form.status,
      property_type: form.property_type,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      full_description: form.full_description,
      amenities: form.amenities.split("\n").map((item) => item.trim()).filter(Boolean),
      location: {
        address_line_1: form.address_line_1,
        city: form.city,
        state_province: form.state_province,
        postal_code: form.postal_code,
        country: form.country,
        latitude: null,
        longitude: null,
      },
      media,
    };

    const response = await fetch(editingId ? `/api/admin/properties/${editingId}` : "/api/admin/properties", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setMessage(body?.error ?? "Unable to save property.");
      return;
    }

    setForm(blankForm);
    setEditingId(null);
    setMessage("Property saved.");
    await loadProperties();
  }

  async function removeProperty(id: number) {
    await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    await loadProperties();
  }

  async function uploadImage(file: File) {
    setUploadingImage(true);
    setMessage("");

    const uploadForm = new FormData();
    uploadForm.append("file", file);

    try {
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: uploadForm,
      });
      const body = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;

      if (!response.ok || !body?.url) {
        setMessage(body?.error ?? "Unable to upload image.");
        return;
      }

      setForm((current) => ({
        ...current,
        image_urls: [current.image_urls.trim(), body.url].filter(Boolean).join("\n"),
      }));
      setMessage("Image uploaded to Cloudinary.");
    } finally {
      setUploadingImage(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-3xl font-bold">Property Management</h1>
        </div>
      </div>

      <form onSubmit={submitProperty} className="mt-8 space-y-6 rounded-2xl border border-theme-border bg-theme-surface p-6">
        <FormSection
          title="Listing Basics"
          description="These fields control the main card information users see on the listings page."
        >
          <AdminInput
            label="Property title"
            help="Use a clear public name, for example: Mayfair two-bedroom apartment."
            value={form.title}
            onChange={(value) => updateField("title", value)}
            placeholder="Mayfair two-bedroom apartment"
          />
          <AdminInput
            label="Price"
            help="Enter the numeric value for the listing price."
            value={form.price}
            onChange={(value) => updateField("price", value)}
            placeholder="850000"
            type="number"
          />
          <Select
            label="Currency"
            help="Choose the currency used for this listing price."
            value={form.currency}
            onChange={(value) => updateField("currency", value)}
            options={[...propertyCurrencies]}
          />
          <Select
            label="Listing status"
            help="Available appears as active. Draft is hidden from public listing results."
            value={form.status}
            onChange={(value) => updateField("status", value)}
            options={Object.values(PropertyStatus)}
          />
          <AdminInput
            label="Property type"
            help="Used by the property type filter. Examples: Residential, Commercial, Apartment, Villa."
            value={form.property_type}
            onChange={(value) => updateField("property_type", value)}
            placeholder="Residential"
          />
          <AdminInput
            label="Bedrooms"
            help="Enter 0 for commercial listings where bedrooms do not apply."
            value={form.bedrooms}
            onChange={(value) => updateField("bedrooms", value)}
            placeholder="3"
            type="number"
          />
          <AdminInput
            label="Bathrooms"
            help="Total bathrooms shown on listing cards and detail pages."
            value={form.bathrooms}
            onChange={(value) => updateField("bathrooms", value)}
            placeholder="2"
            type="number"
          />
          <AdminInput
            label="Area"
            help="Enter total area in square feet."
            value={form.area}
            onChange={(value) => updateField("area", value)}
            placeholder="1250"
            type="number"
          />
        </FormSection>

        <FormSection
          title="Description And Amenities"
          description="This content appears on the property detail page after a visitor opens a listing."
        >
          <AdminTextarea
            label="Full description"
            help="Write the full property overview, including condition, layout, and selling points."
            value={form.full_description}
            onChange={(value) => updateField("full_description", value)}
            placeholder="Describe the property, location benefits, layout, and important notes."
          />
          <AdminTextarea
            label="Amenities"
            help="Add one amenity per line. Each line becomes one bullet on the detail page."
            value={form.amenities}
            onChange={(value) => updateField("amenities", value)}
            placeholder={"Private parking\nConcierge\nBalcony\nNear transport links"}
          />
        </FormSection>

        <FormSection
          title="Location"
          description="Address details power the location text on the public property page."
          icon={<MapPin size={18} />}
        >
          <AdminInput
            label="Street address"
            help="Main street address shown to visitors."
            value={form.address_line_1}
            onChange={(value) => updateField("address_line_1", value)}
            placeholder="12 Berkeley Square"
          />
          <AdminInput
            label="City"
            help="City used by location search."
            value={form.city}
            onChange={(value) => updateField("city", value)}
            placeholder="London"
          />
          <AdminInput
            label="State or province"
            help="County, state, or province for the address."
            value={form.state_province}
            onChange={(value) => updateField("state_province", value)}
            placeholder="Greater London"
          />
          <AdminInput
            label="Postal code"
            help="Postal code or ZIP code."
            value={form.postal_code}
            onChange={(value) => updateField("postal_code", value)}
            placeholder="W1J 6BD"
          />
          <AdminInput
            label="Country"
            help="Country used by search and detail page location."
            value={form.country}
            onChange={(value) => updateField("country", value)}
            placeholder="United Kingdom"
          />
        </FormSection>

        <FormSection
          title="Images"
          description="Paste publicly accessible image URLs for the listing gallery."
          icon={<ImageIcon size={18} />}
        >
          <FieldFrame label="Upload image" help="Choose an image file and it will be uploaded to Cloudinary.">
            <input
              type="file"
              accept="image/*"
              disabled={uploadingImage}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) uploadImage(file);
                event.target.value = "";
              }}
              className="rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-sm text-theme-primary file:mr-4 file:rounded-lg file:border-0 file:bg-legacy-red file:px-3 file:py-2 file:text-xs file:font-bold file:uppercase file:text-white disabled:cursor-not-allowed disabled:opacity-60"
            />
            {uploadingImage && <span className="text-xs text-theme-muted">Uploading image.</span>}
          </FieldFrame>
          <AdminTextarea
            label="Image URLs"
            help="Add one image URL per line. The first image becomes the featured listing image."
            value={form.image_urls}
            onChange={(value) => updateField("image_urls", value)}
            placeholder={"https://example.com/front.jpg\nhttps://example.com/living-room.jpg"}
          />
          {propertyImageUrls.length > 0 && (
            <div className="lg:col-span-2">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-theme-muted">Preview</p>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {propertyImageUrls.map((imageUrl, index) => (
                  <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-xl border border-theme-border bg-theme-surface">
                    <img src={imageUrl} alt={`Property preview ${index + 1}`} className="h-32 w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </FormSection>

        <div className="lg:col-span-2">
          {message && <p className="mb-3 text-sm text-theme-secondary">{message}</p>}
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-legacy-red px-5 py-3 text-xs font-bold uppercase tracking-wider text-white">
            <Plus size={15} />
            {editingId ? "Update property" : "Add property"}
          </button>
        </div>
      </form>

      <div className="mt-8 grid gap-3">
        {properties.map((property) => (
          <article key={property.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-theme-border bg-theme-surface p-4">
            <div>
              <h2 className="font-bold">{property.title}</h2>
              <p className="text-sm text-theme-muted">{property.status} · {property.property_type} · {property.currency} {property.price}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => editProperty(property)} className="rounded-xl border border-theme-border px-3 py-2 text-xs font-bold uppercase">
                <RefreshCcw size={14} />
              </button>
              <button type="button" onClick={() => removeProperty(property.id)} className="rounded-xl border border-red-300 px-3 py-2 text-xs font-bold uppercase text-red-700">
                <Trash2 size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FormSection({
  children,
  description,
  icon = <FileText size={18} />,
  title,
}: {
  children: React.ReactNode;
  description: string;
  icon?: React.ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-2xl border border-theme-border bg-theme-page p-5">
      <div className="mb-5 flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-theme-border bg-theme-surface text-legacy-red">
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-bold text-theme-primary">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-theme-muted">{description}</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">{children}</div>
    </section>
  );
}

function FieldFrame({
  children,
  help,
  label,
}: {
  children: React.ReactNode;
  help: string;
  label: string;
}) {
  return (
    <label className="grid gap-2 text-sm text-theme-secondary">
      <span className="font-semibold text-theme-primary">{label}</span>
      {children}
      <span className="text-xs leading-5 text-theme-muted">{help}</span>
    </label>
  );
}

function AdminInput({
  help,
  label,
  onChange,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  help: string;
  label: string;
  onChange: (value: string) => void;
}) {
  return (
    <FieldFrame label={label} help={help}>
      <input
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted"
      />
    </FieldFrame>
  );
}

function AdminTextarea({
  help,
  label,
  onChange,
  ...props
}: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  help: string;
  label: string;
  onChange: (value: string) => void;
}) {
  return (
    <FieldFrame label={label} help={help}>
      <textarea
        {...props}
        rows={5}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted"
      />
    </FieldFrame>
  );
}

function Select({
  help,
  label,
  onChange,
  options,
  value,
}: {
  help: string;
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <FieldFrame label={label} help={help}>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-sm text-theme-primary">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </FieldFrame>
  );
}
