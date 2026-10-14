import fs from "fs";
import path from "path";
import { propertyListings as defaultListings, type PropertyItem } from "@/data/properties";

// Filepath for runtime persistent JSON storage
const DATA_FILE = path.join(process.cwd(), "src", "data", "properties-data.json");

// In-memory cache
let cachedProperties: PropertyItem[] | null = null;

function loadProperties(): PropertyItem[] {
  if (cachedProperties) {
    return cachedProperties;
  }

  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      cachedProperties = JSON.parse(data);
      return cachedProperties || defaultListings;
    }
  } catch (error) {
    console.error("Error reading properties-data.json, falling back to defaults:", error);
  }

  cachedProperties = [...defaultListings];
  saveProperties(cachedProperties);
  return cachedProperties;
}

function saveProperties(properties: PropertyItem[]) {
  cachedProperties = properties;
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(properties, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing properties-data.json:", error);
  }
}

export const propertiesStore = {
  getAll(): PropertyItem[] {
    return loadProperties();
  },

  getBySlug(slug: string): PropertyItem | undefined {
    const properties = loadProperties();
    return properties.find((p) => p.slug === slug);
  },

  getById(id: string): PropertyItem | undefined {
    const properties = loadProperties();
    return properties.find((p) => p.id === id);
  },

  create(newProperty: Omit<PropertyItem, "id"> & { id?: string }): PropertyItem {
    const properties = loadProperties();
    const id = newProperty.id || `prop-${Date.now()}`;
    const slug =
      newProperty.slug ||
      newProperty.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const referenceCode =
      newProperty.referenceCode ||
      `BSQ-${newProperty.location.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const property: PropertyItem = {
      ...newProperty,
      id,
      slug,
      referenceCode
    };

    properties.unshift(property);
    saveProperties(properties);
    return property;
  },

  update(slugOrId: string, updates: Partial<PropertyItem>): PropertyItem | null {
    const properties = loadProperties();
    const index = properties.findIndex((p) => p.slug === slugOrId || p.id === slugOrId);

    if (index === -1) {
      return null;
    }

    const existing = properties[index];
    const updated: PropertyItem = {
      ...existing,
      ...updates,
      id: existing.id,
      slug: updates.slug || existing.slug
    };

    properties[index] = updated;
    saveProperties(properties);
    return updated;
  },

  delete(slugOrId: string): boolean {
    const properties = loadProperties();
    const initialLength = properties.length;
    const filtered = properties.filter((p) => p.slug !== slugOrId && p.id !== slugOrId);

    if (filtered.length !== initialLength) {
      saveProperties(filtered);
      return true;
    }
    return false;
  }
};
