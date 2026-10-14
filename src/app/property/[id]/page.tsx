import type { Metadata } from "next";
import { PropertyDetailView } from "@/components/property/PropertyDetailView";

export const metadata: Metadata = {
  title: "Property Details",
  description: "View property details, gallery, location, amenities, and apply online.",
};

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyDetailView propertyId={Number(id)} />;
}
