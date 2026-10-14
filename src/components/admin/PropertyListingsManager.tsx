"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bath,
  Bed,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Edit3,
  ExternalLink,
  Eye,
  FileUp,
  Filter,
  Image as ImageIcon,
  Layers,
  MapPin,
  Maximize2,
  Plus,
  PoundSterling,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  UploadCloud,
  X
} from "lucide-react";
import {
  propertyCategories,
  propertyStatuses,
  type PropertyCategory,
  type PropertyItem,
  type PropertyStatus
} from "@/data/properties";
import { cn } from "@/lib/utils";

export function PropertyListingsManager() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyItem | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<PropertyItem | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");
  const [formError, setFormError] = useState("");
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    referenceCode: "",
    category: "Prime Residential" as PropertyCategory,
    status: "Available" as PropertyStatus,
    price: "",
    priceType: "Guide Price",
    location: "",
    addressLine: "",
    city: "London",
    postcode: "W1K",
    bedrooms: "4",
    bathrooms: "4",
    areaSqFt: "4500",
    tenure: "Freehold",
    featuredImage: "",
    galleryImages: [] as string[],
    description: "",
    extendedOverview: "",
    highlights: "Prime Location, Grade II Listed, 24/7 Security",
    amenities: "Concierge, Private Lift, Swimming Pool, Wine Vault, Underground Garage"
  });

  // Fetch properties from API
  async function fetchProperties() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/properties");
      if (res.ok) {
        const data = await res.json();
        setProperties(data.properties || []);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  function triggerSuccess(msg: string) {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(""), 4000);
  }

  // Open Add Modal
  function handleOpenAdd() {
    setFormError("");
    const defaultGallery = [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
    ];
    setFormData({
      title: "",
      slug: "",
      referenceCode: "",
      category: "Super-Prime Mayfair",
      status: "Available",
      price: "15000000",
      priceType: "Guide Price",
      location: "Mayfair, London",
      addressLine: "Mount Street, Mayfair",
      city: "London",
      postcode: "W1K 2PB",
      bedrooms: "5",
      bathrooms: "6",
      areaSqFt: "5200",
      tenure: "Freehold",
      featuredImage: defaultGallery[0],
      galleryImages: defaultGallery,
      description: "Exceptional Mayfair residence featuring bespoke architectural finishes, private terrace, and 24-hour concierge.",
      extendedOverview: "Architecturally curated luxury freehold positioned moments from Berkeley Square.",
      highlights: "Freehold Title, Private Lift, Mayfair Heritage, Bespoke Joinery",
      amenities: "24/7 Concierge, Private Lift, Wine Cellar, Secure Parking, Spa Facility"
    });
    setIsAddModalOpen(true);
  }

  // Open Edit Modal
  function handleOpenEdit(property: PropertyItem) {
    setFormError("");
    setEditingProperty(property);
    const galleryList = property.gallery && property.gallery.length > 0 ? property.gallery : [property.featuredImage];
    setFormData({
      title: property.title,
      slug: property.slug,
      referenceCode: property.referenceCode,
      category: property.category,
      status: property.status,
      price: String(property.price),
      priceType: property.priceType,
      location: property.location,
      addressLine: property.addressLine || property.location,
      city: property.city,
      postcode: property.postcode,
      bedrooms: String(property.specs.bedrooms),
      bathrooms: String(property.specs.bathrooms),
      areaSqFt: String(property.specs.areaSqFt),
      tenure: property.specs.tenure,
      featuredImage: property.featuredImage || galleryList[0],
      galleryImages: galleryList,
      description: property.description,
      extendedOverview: Array.isArray(property.extendedOverview)
        ? property.extendedOverview.join("\n\n")
        : (property.extendedOverview || property.description),
      highlights: property.highlights ? property.highlights.join(", ") : "",
      amenities: property.amenities ? property.amenities.join(", ") : ""
    });
  }

  // Handle Multi-Image Upload via API
  async function handleImageFilesUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploadingImages(true);
    const files = Array.from(e.target.files);

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const uploadForm = new FormData();
        uploadForm.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: uploadForm
        });

        if (res.ok) {
          const data = await res.json();
          if (data.url) uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => {
          const updatedGallery = [...prev.galleryImages, ...uploadedUrls];
          return {
            ...prev,
            galleryImages: updatedGallery,
            featuredImage: prev.featuredImage || updatedGallery[0]
          };
        });
        triggerSuccess(`Uploaded ${uploadedUrls.length} new image(s)`);
      }
    } catch (err) {
      console.error("Error uploading image files:", err);
      setFormError("Failed to upload image files.");
    } finally {
      setIsUploadingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  // Set Primary / Featured Image
  function handleSetFeaturedImage(url: string) {
    setFormData((prev) => ({
      ...prev,
      featuredImage: url
    }));
  }

  // Remove Image from Gallery
  function handleRemoveImage(urlToRemove: string) {
    setFormData((prev) => {
      const updatedGallery = prev.galleryImages.filter((img) => img !== urlToRemove);
      let updatedFeatured = prev.featuredImage;
      if (updatedFeatured === urlToRemove) {
        updatedFeatured = updatedGallery.length > 0 ? updatedGallery[0] : "";
      }
      return {
        ...prev,
        galleryImages: updatedGallery,
        featuredImage: updatedFeatured
      };
    });
  }

  // Add External Image URL directly
  function handleAddExternalImageUrl(url: string) {
    if (!url.trim()) return;
    setFormData((prev) => {
      const updatedGallery = [...prev.galleryImages, url.trim()];
      return {
        ...prev,
        galleryImages: updatedGallery,
        featuredImage: prev.featuredImage || url.trim()
      };
    });
  }

  // Submit Add
  async function handleSaveNew(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim() || !formData.location.trim() || !formData.price) {
      setFormError("Title, location, and price are required.");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug || undefined,
        referenceCode: formData.referenceCode || undefined,
        category: formData.category,
        status: formData.status,
        price: Number(formData.price),
        priceType: formData.priceType,
        location: formData.location,
        addressLine: formData.addressLine || formData.location,
        city: formData.city,
        postcode: formData.postcode,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        areaSqFt: Number(formData.areaSqFt),
        tenure: formData.tenure,
        featuredImage: formData.featuredImage || formData.galleryImages[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
        galleryImages: formData.galleryImages,
        description: formData.description,
        extendedOverview: formData.extendedOverview,
        highlights: formData.highlights.split(",").map((s) => s.trim()).filter(Boolean),
        amenities: formData.amenities.split(",").map((s) => s.trim()).filter(Boolean)
      };

      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to add property");

      setIsAddModalOpen(false);
      triggerSuccess(`Successfully added property: "${formData.title}" (${formData.status})`);
      fetchProperties();
    } catch (err: any) {
      setFormError(err.message || "Failed to add property.");
    }
  }

  // Submit Edit
  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProperty) return;

    try {
      const payload = {
        id: editingProperty.id,
        slug: editingProperty.slug,
        title: formData.title,
        category: formData.category,
        status: formData.status,
        price: Number(formData.price),
        priceType: formData.priceType,
        location: formData.location,
        addressLine: formData.addressLine,
        city: formData.city,
        postcode: formData.postcode,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        areaSqFt: Number(formData.areaSqFt),
        tenure: formData.tenure,
        featuredImage: formData.featuredImage || formData.galleryImages[0],
        galleryImages: formData.galleryImages,
        description: formData.description,
        extendedOverview: formData.extendedOverview,
        highlights: formData.highlights.split(",").map((s) => s.trim()).filter(Boolean),
        amenities: formData.amenities.split(",").map((s) => s.trim()).filter(Boolean)
      };

      const res = await fetch("/api/admin/properties", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to update property");

      setEditingProperty(null);
      triggerSuccess(`Successfully updated property: "${formData.title}" (${formData.status})`);
      fetchProperties();
    } catch (err: any) {
      setFormError(err.message || "Failed to update property.");
    }
  }

  // Delete Property
  async function handleConfirmDelete() {
    if (!deletingProperty) return;

    try {
      const res = await fetch(`/api/admin/properties?id=${deletingProperty.id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete property");

      triggerSuccess(`Property "${deletingProperty.title}" deleted.`);
      setDeletingProperty(null);
      fetchProperties();
    } catch (err: any) {
      alert("Failed to delete property.");
    }
  }

  // Quick Inline Status Changer
  async function handleQuickStatusChange(property: PropertyItem, newStatus: PropertyStatus) {
    try {
      const res = await fetch("/api/admin/properties", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: property.id, status: newStatus })
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === property.id ? { ...p, status: newStatus } : p))
        );
        triggerSuccess(`Updated status for "${property.title}" to ${newStatus}`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }

  // Filtered property list
  const filteredListings = useMemo(() => {
    return properties.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedStatus !== "All" && p.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchRef = p.referenceCode.toLowerCase().includes(q);
        const matchLoc = p.location.toLowerCase().includes(q);
        if (!matchTitle && !matchRef && !matchLoc) return false;
      }
      return true;
    });
  }, [properties, selectedCategory, selectedStatus, searchQuery]);

  function getStatusBadge(status: PropertyStatus) {
    switch (status) {
      case "Available":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
      case "Under Offer":
        return "border-amber-500/40 bg-amber-500/10 text-amber-300";
      case "Sold":
        return "border-rose-500/40 bg-rose-500/10 text-rose-300";
      case "Rented":
        return "border-purple-500/40 bg-purple-500/10 text-purple-300";
      case "Draft":
        return "border-slate-500/40 bg-slate-500/10 text-slate-400";
      case "Off-Market Exclusive":
        return "border-legacy-red/50 bg-legacy-red/20 text-white font-bold";
      case "Recently Completed":
        return "border-slate-400/30 bg-slate-500/10 text-slate-300";
      default:
        return "border-white/10 bg-white/5 text-white";
    }
  }

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="eyebrow">Listing &amp; Asset Management</span>
          <h2 className="display text-2xl font-bold text-white mt-1">
            Real Estate Portfolio Manager
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload multiple images, toggle statuses (Available, Sold, Rented, Draft), and control inventory in real-time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-legacy-deepRed to-legacy-red px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(225,18,45,0.4)] hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {actionSuccessMsg && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 sm:grid-cols-[1.5fr_1fr_1fr]">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, location, or ref code..."
            className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 pl-9 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-legacy-red"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="focus-ring w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-200 focus:border-legacy-red focus:bg-black cursor-pointer"
        >
          <option value="All" className="bg-black text-white">All Property Types</option>
          {propertyCategories.map((c) => (
            <option key={c} value={c} className="bg-black text-white">{c}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="focus-ring w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-200 focus:border-legacy-red focus:bg-black cursor-pointer"
        >
          <option value="All" className="bg-black text-white">All Listing Statuses</option>
          {propertyStatuses.map((s) => (
            <option key={s} value={s} className="bg-black text-white">
              {s} {s === "Draft" ? "(Private)" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Property Inventory Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c12] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] font-mono text-[10px] uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Property &amp; Photos</th>
                <th className="px-4 py-3.5">Category &amp; Location</th>
                <th className="px-4 py-3.5">Price &amp; Terms</th>
                <th className="px-4 py-3.5">Specifications</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredListings.map((prop) => (
                <tr key={prop.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Property Info */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-14 rounded-lg overflow-hidden shrink-0 bg-black">
                        <Image
                          src={prop.featuredImage}
                          alt={prop.title}
                          fill
                          className="object-cover"
                          sizes="60px"
                        />
                        <span className="absolute bottom-0.5 right-0.5 rounded bg-black/80 px-1 font-mono text-[8px] text-white">
                          {prop.gallery?.length || 1} 📷
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] text-legacy-red font-bold block">
                          {prop.referenceCode}
                        </span>
                        <span className="font-bold text-white text-xs truncate block max-w-xs">
                          {prop.title}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category & Location */}
                  <td className="px-4 py-4">
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10.5px] font-medium text-slate-300 border border-white/10 block w-max">
                      {prop.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-1">
                      <MapPin size={11} className="text-legacy-red shrink-0" />
                      <span className="truncate max-w-[150px]">{prop.location}</span>
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4 font-mono">
                    <span className="text-white font-bold text-xs block">
                      {prop.priceDisplay}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase">
                      {prop.priceType}
                    </span>
                  </td>

                  {/* Specs */}
                  <td className="px-4 py-4 font-mono text-[11px] text-slate-300">
                    <div className="flex items-center gap-2">
                      <span>{prop.specs.bedrooms} Beds</span>
                      <span>•</span>
                      <span>{prop.specs.bathrooms} Baths</span>
                      <span>•</span>
                      <span>{prop.specs.areaSqFt.toLocaleString()} sq ft</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{prop.specs.tenure}</span>
                  </td>

                  {/* Status with Quick Dropdown */}
                  <td className="px-4 py-4">
                    <select
                      value={prop.status}
                      onChange={(e) => handleQuickStatusChange(prop, e.target.value as PropertyStatus)}
                      className={cn(
                        "rounded-lg border px-2 py-1 font-mono text-[10px] uppercase font-bold cursor-pointer transition-all bg-black",
                        getStatusBadge(prop.status)
                      )}
                    >
                      {propertyStatuses.map((s) => (
                        <option key={s} value={s} className="bg-black text-white">
                          {s} {s === "Draft" ? "(Private)" : ""}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/property/${prop.slug}`}
                        target="_blank"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                        title="View Public Detail Page"
                      >
                        <ExternalLink size={14} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(prop)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                        title="Edit Property & Images"
                      >
                        <Edit3 size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingProperty(prop)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PROPERTY MODAL WITH MULTI-IMAGE MANAGEMENT */}
      {(isAddModalOpen || editingProperty) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#0e0e14] p-6 sm:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="eyebrow">
                  {editingProperty ? "Update Listing & Imagery" : "Create New Listing"}
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">
                  {editingProperty ? `Edit: ${editingProperty.title}` : "Add Property to Inventory"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProperty(null);
                }}
                className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {formError && (
              <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                {formError}
              </div>
            )}

            {/* Form */}
            <form onSubmit={editingProperty ? handleSaveEdit : handleSaveNew} className="mt-6 space-y-5 text-xs">
              {/* Row 1: Title & Reference Code */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Property Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Grosvenor Penthouse & Sky Garden"
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white focus:border-legacy-red"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Ref Code (Leave blank for auto)</label>
                  <input
                    type="text"
                    value={formData.referenceCode}
                    onChange={(e) => setFormData({ ...formData, referenceCode: e.target.value })}
                    placeholder="e.g. BSQ-MAY-0101"
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white font-mono focus:border-legacy-red"
                  />
                </div>
              </div>

              {/* Row 2: Category, Status, Price */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white focus:bg-black"
                  >
                    {propertyCategories.map((c) => (
                      <option key={c} value={c} className="bg-black text-white">{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Listing Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white focus:bg-black"
                  >
                    {propertyStatuses.map((s) => (
                      <option key={s} value={s} className="bg-black text-white">
                        {s} {s === "Draft" ? "(Hidden from public)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Guide Price (£ GBP) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="18500000"
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white font-mono focus:border-legacy-red"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Location & Address */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Area / Sub-Market *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Grosvenor Square, Mayfair"
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white focus:border-legacy-red"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Postcode</label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    placeholder="W1K 2PB"
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white font-mono focus:border-legacy-red"
                  />
                </div>
              </div>

              {/* Row 4: Specs (Beds, Baths, SqFt, Tenure) */}
              <div className="grid gap-3 sm:grid-cols-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Area (Sq Ft)</label>
                  <input
                    type="number"
                    value={formData.areaSqFt}
                    onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Tenure</label>
                  <input
                    type="text"
                    value={formData.tenure}
                    onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    placeholder="Freehold / 999 yrs"
                    className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white"
                  />
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* IMAGE MANAGEMENT HUB (Upload, Preview, Set Primary) */}
              {/* ---------------------------------------------------- */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={15} className="text-legacy-red" />
                    <span className="font-sans text-xs font-bold text-white">Image Management Hub</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    {formData.galleryImages.length} Image(s) Attached
                  </span>
                </div>

                {/* Upload Action Bar */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* File Upload Dropzone */}
                  <label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 p-4 text-center hover:border-legacy-red/60 transition-colors cursor-pointer">
                    <UploadCloud size={20} className="text-slate-400 mb-1" />
                    <span className="font-bold text-white text-xs">
                      {isUploadingImages ? "Uploading..." : "Upload Multiple Images"}
                    </span>
                    <span className="text-[10px] text-slate-400">Click to select files (JPG, PNG, WebP)</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageFilesUpload}
                      disabled={isUploadingImages}
                    />
                  </label>

                  {/* Add URL Field */}
                  <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                    <label className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                      Or Add Image by URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        className="focus-ring flex-1 rounded-lg border border-white/15 bg-black px-2.5 py-1.5 text-xs text-white font-mono"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddExternalImageUrl((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                          if (input && input.value) {
                            handleAddExternalImageUrl(input.value);
                            input.value = "";
                          }
                        }}
                        className="rounded-lg bg-legacy-red px-3 py-1.5 font-bold text-white text-xs hover:bg-legacy-deepRed"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Thumbnails Grid */}
                {formData.galleryImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                    {formData.galleryImages.map((imgUrl, idx) => {
                      const isFeatured = formData.featuredImage === imgUrl;
                      return (
                        <div
                          key={idx}
                          className={cn(
                            "group relative aspect-[4/3] rounded-xl overflow-hidden border transition-all bg-black",
                            isFeatured
                              ? "border-legacy-red ring-2 ring-legacy-red/50 shadow-[0_0_15px_rgba(225,18,45,0.4)]"
                              : "border-white/10 hover:border-white/30"
                          )}
                        >
                          <Image
                            src={imgUrl}
                            alt={`Gallery image ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />

                          {/* Featured Badge */}
                          {isFeatured && (
                            <span className="absolute top-1 left-1 flex items-center gap-1 rounded bg-legacy-red px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase text-white shadow-md">
                              <Star size={9} className="fill-white" /> Featured
                            </span>
                          )}

                          {/* Hover Actions Overlay */}
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                            {!isFeatured && (
                              <button
                                type="button"
                                onClick={() => handleSetFeaturedImage(imgUrl)}
                                className="rounded bg-white/20 px-2 py-1 text-[9px] font-bold text-white hover:bg-legacy-red transition-colors whitespace-nowrap"
                              >
                                Set Primary
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(imgUrl)}
                              className="rounded bg-red-600/80 p-1 text-white hover:bg-red-500 transition-colors"
                              title="Delete photo"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Row 6: Description */}
              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Editorial Overview &amp; Narrative</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive description of property features and investment appeal..."
                  className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white"
                />
              </div>

              {/* Row 7: Amenities */}
              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Amenities (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  placeholder="Concierge, Swimming Pool, Wine Vault, Garage"
                  className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-white"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProperty(null);
                  }}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-legacy-deepRed to-legacy-red px-6 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:scale-105 transition-all"
                >
                  <Check size={14} />
                  <span>{editingProperty ? "Save Changes" : "Create Listing"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0e0e14] p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <Trash2 size={24} />
              <h3 className="font-sans text-base font-bold text-white">Delete Property Listing?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">&quot;{deletingProperty.title}&quot;</strong> ({deletingProperty.referenceCode})? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingProperty(null)}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold uppercase text-white hover:bg-red-500 transition-colors shadow-lg"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
