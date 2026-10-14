import assert from "node:assert/strict";
import test from "node:test";
import { filterPropertyViewModels, type PropertyViewModel } from "./property-view-model";
import { PropertyStatus } from "../schema/property.enums";

function property({
  city,
  country,
  status = PropertyStatus.AVAILABLE_FOR_SALE,
}: {
  city: string;
  country: string;
  status?: PropertyStatus;
}): PropertyViewModel {
  return {
    id: Math.random(),
    title: `${status} property`,
    price: 100000,
    priceDisplay: "£100,000",
    status,
    propertyType: "Residential",
    bedrooms: 2,
    bathrooms: 1,
    area: 900,
    description: "",
    addressLabel: "London, United Kingdom",
    city,
    country,
    featuredImage: null,
    images: [],
    amenities: [],
    createdAt: new Date().toISOString(),
  };
}

test("filters property listings by selected market", () => {
  const properties = [
    property({ city: "London", country: "United Kingdom" }),
    property({ city: "Dubai", country: "United Arab Emirates" }),
    property({ city: "Lahore", country: "Pakistan" }),
  ];

  assert.deepEqual(
    filterPropertyViewModels(properties, {
      market: "Dubai",
    }).map((item) => item.city),
    ["Dubai"],
  );
});

test("keeps draft property listings hidden from the public portfolio", () => {
  const properties = [
    property({ city: "London", country: "United Kingdom" }),
    property({ city: "Dubai", country: "United Arab Emirates", status: PropertyStatus.DRAFT }),
  ];

  assert.deepEqual(
    filterPropertyViewModels(properties, {
      market: "All",
    }).map((item) => item.city),
    ["London"],
  );
});
