import fs from "fs";
import path from "path";

export interface ApplicationNote {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export interface PropertyApplication {
  id: string;
  referenceId: string;
  propertySlug: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyRef: string;
  applicationType: string;
  offerPrice: string;
  targetCompletionDate?: string;
  solicitorInfo?: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  currentAddress?: string;
  nationality?: string;
  applicantType: string;
  sourceOfFunds: string;
  equityDeposit?: string;
  bankName?: string;
  documents: { id: string; name: string; size: string; category?: string }[];
  status: "Pending" | "Under Review" | "Approved" | "Declined";
  internalNotes?: ApplicationNote[];
  submittedAt: string;
  isRead: boolean;
  // ERD Compliant Schema Fields
  property_id?: string;
  message_from_applicant?: string;
  submitted_at?: string;
  confirmation_email_id?: string;
  guest_first_name?: string;
  guest_last_name?: string;
  guest_email?: string;
  guest_phone_number?: string;
  guest_current_address?: string;
  guest_document_upload_urls?: string[];
}

export interface AdminNotification {
  id: string;
  type: "application" | "inquiry" | "valuation";
  title: string;
  message: string;
  referenceId?: string;
  link?: string;
  timestamp: string;
  isRead: boolean;
}

const APPS_FILE = path.join(process.cwd(), "src", "data", "applications-data.json");
const NOTIFS_FILE = path.join(process.cwd(), "src", "data", "notifications-data.json");

// Seed initial sample application for demonstration
const initialApplications: PropertyApplication[] = [
  {
    id: "app-1",
    referenceId: "BSQ-APP-2026-8821",
    propertySlug: "grosvenor-penthouse-sky-garden",
    propertyTitle: "The Grosvenor Penthouse & Sky Garden",
    propertyLocation: "Grosvenor Square, Mayfair",
    propertyRef: "BSQ-MAY-0101",
    applicationType: "Purchase Acquisition",
    offerPrice: "18500000",
    targetCompletionDate: "2026-11-15",
    solicitorInfo: "Forsters LLP (Partner: Robert Vance)",
    applicantName: "Lord Alexander Kensington",
    applicantEmail: "alexander@kensington-estates.co.uk",
    applicantPhone: "+44 7930 472993",
    currentAddress: "14 Chesterfield Hill, Mayfair, London W1J 5BN",
    nationality: "United Kingdom",
    applicantType: "Private Individual",
    sourceOfFunds: "Cash Reserves",
    equityDeposit: "18500000",
    bankName: "Coutts & Co Mayfair",
    documents: [
      { id: "d1", name: "passport_scan_kensington.pdf", size: "2.4 MB", category: "id" },
      { id: "d2", name: "coutts_proof_of_funds_statement.pdf", size: "3.1 MB", category: "funds" },
      { id: "d3", name: "council_tax_mayfair.pdf", size: "1.2 MB", category: "address" }
    ],
    status: "Pending",
    internalNotes: [
      {
        id: "n1",
        text: "Spoke with partner at Forsters LLP; verified liquidity in Coutts custody account.",
        author: "Mayfair Senior Underwriter",
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ],
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: false
  },
  {
    id: "app-2",
    referenceId: "BSQ-APP-2026-5190",
    propertySlug: "knightsbridge-private-villa-mews",
    propertyTitle: "Knightsbridge Private Villa & Mews",
    propertyLocation: "Ennismore Gardens, Knightsbridge",
    propertyRef: "BSQ-KBG-0204",
    applicationType: "Prime Tenancy",
    offerPrice: "12000000",
    targetCompletionDate: "2026-10-01",
    applicantName: "Elena Rostova",
    applicantEmail: "elena.rostova@geneva-wealth.ch",
    applicantPhone: "+41 22 730 4000",
    currentAddress: "Geneva, Switzerland",
    nationality: "Switzerland",
    applicantType: "Private Individual",
    sourceOfFunds: "Liquid Securities",
    documents: [
      { id: "d4", name: "swiss_passport_scan.pdf", size: "1.8 MB", category: "id" },
      { id: "d5", name: "ubs_wealth_verification_letter.pdf", size: "2.2 MB", category: "funds" }
    ],
    status: "Under Review",
    internalNotes: [
      {
        id: "n2",
        text: "Tenant referencing submitted for Swiss resident; UBS wealth confirmation attached.",
        author: "Acquisitions Desk",
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString()
      }
    ],
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    isRead: true
  }
];

const initialNotifications: AdminNotification[] = [
  {
    id: "notif-1",
    type: "application",
    title: "New Property Application: The Grosvenor Penthouse",
    message: "Lord Alexander Kensington submitted an acquisition offer of £18,500,000 (Ref: BSQ-APP-2026-8821).",
    referenceId: "BSQ-APP-2026-8821",
    link: "/admin/applications",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: false
  },
  {
    id: "notif-2",
    type: "application",
    title: "New Tenancy Application: Knightsbridge Private Villa",
    message: "Elena Rostova submitted a prime tenancy application (Ref: BSQ-APP-2026-5190).",
    referenceId: "BSQ-APP-2026-5190",
    link: "/admin/applications",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    isRead: true
  }
];

let cachedApplications: PropertyApplication[] | null = null;
let cachedNotifications: AdminNotification[] | null = null;

function loadApps(): PropertyApplication[] {
  if (cachedApplications) return cachedApplications;
  try {
    if (fs.existsSync(APPS_FILE)) {
      cachedApplications = JSON.parse(fs.readFileSync(APPS_FILE, "utf-8"));
      return cachedApplications || initialApplications;
    }
  } catch (err) {
    console.error("Error reading applications-data.json:", err);
  }
  cachedApplications = [...initialApplications];
  saveApps(cachedApplications);
  return cachedApplications;
}

function saveApps(apps: PropertyApplication[]) {
  cachedApplications = apps;
  try {
    const dir = path.dirname(APPS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(APPS_FILE, JSON.stringify(apps, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing applications-data.json:", err);
  }
}

function loadNotifs(): AdminNotification[] {
  if (cachedNotifications) return cachedNotifications;
  try {
    if (fs.existsSync(NOTIFS_FILE)) {
      cachedNotifications = JSON.parse(fs.readFileSync(NOTIFS_FILE, "utf-8"));
      return cachedNotifications || initialNotifications;
    }
  } catch (err) {
    console.error("Error reading notifications-data.json:", err);
  }
  cachedNotifications = [...initialNotifications];
  saveNotifs(cachedNotifications);
  return cachedNotifications;
}

function saveNotifs(notifs: AdminNotification[]) {
  cachedNotifications = notifs;
  try {
    const dir = path.dirname(NOTIFS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(NOTIFS_FILE, JSON.stringify(notifs, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing notifications-data.json:", err);
  }
}

export const applicationsStore = {
  getAll(): PropertyApplication[] {
    return loadApps();
  },

  getById(idOrRef: string): PropertyApplication | undefined {
    const apps = loadApps();
    return apps.find((a) => a.id === idOrRef || a.referenceId === idOrRef);
  },

  create(appData: Omit<PropertyApplication, "id" | "isRead" | "status"> & { status?: PropertyApplication["status"] }): PropertyApplication {
    const apps = loadApps();
    const nameParts = (appData.applicantName || "").trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const newApp: PropertyApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      status: appData.status || "Pending",
      internalNotes: [],
      isRead: false,
      // ERD Schema populated fields
      property_id: appData.property_id || appData.propertySlug || appData.propertyRef,
      guest_first_name: appData.guest_first_name || firstName,
      guest_last_name: appData.guest_last_name || lastName,
      guest_email: appData.guest_email || appData.applicantEmail,
      guest_phone_number: appData.guest_phone_number || appData.applicantPhone,
      guest_current_address: appData.guest_current_address || appData.currentAddress || "",
      guest_document_upload_urls: appData.guest_document_upload_urls || appData.documents?.map(d => d.name) || [],
      message_from_applicant: appData.message_from_applicant || `${appData.applicationType} offer of £${Number(appData.offerPrice || 0).toLocaleString()} for ${appData.propertyTitle}`,
      submitted_at: appData.submitted_at || appData.submittedAt || new Date().toISOString(),
      confirmation_email_id: appData.confirmation_email_id || `EML-CONF-${Date.now()}-${appData.referenceId}`
    };

    apps.unshift(newApp);
    saveApps(apps);

    // Create automatic admin notification
    this.createNotification({
      type: "application",
      title: `New Property Application: ${newApp.propertyTitle}`,
      message: `${newApp.applicantName} submitted ${newApp.applicationType} for £${Number(newApp.offerPrice || 0).toLocaleString()} (Ref: ${newApp.referenceId}).`,
      referenceId: newApp.referenceId,
      link: "/admin/applications"
    });

    return newApp;
  },

  updateStatus(idOrRef: string, status: PropertyApplication["status"]): PropertyApplication | null {
    const apps = loadApps();
    const index = apps.findIndex((a) => a.id === idOrRef || a.referenceId === idOrRef);
    if (index === -1) return null;

    apps[index].status = status;
    apps[index].isRead = true;
    saveApps(apps);
    return apps[index];
  },

  addNote(idOrRef: string, noteText: string, author = "Mayfair Admin"): ApplicationNote | null {
    const apps = loadApps();
    const index = apps.findIndex((a) => a.id === idOrRef || a.referenceId === idOrRef);
    if (index === -1) return null;

    if (!apps[index].internalNotes) {
      apps[index].internalNotes = [];
    }

    const note: ApplicationNote = {
      id: `note-${Date.now()}`,
      text: noteText,
      author,
      timestamp: new Date().toISOString()
    };

    apps[index].internalNotes.push(note);
    saveApps(apps);
    return note;
  },

  getNotifications(): AdminNotification[] {
    return loadNotifs();
  },

  createNotification(notif: Omit<AdminNotification, "id" | "timestamp" | "isRead">): AdminNotification {
    const notifs = loadNotifs();
    const newNotif: AdminNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    notifs.unshift(newNotif);
    saveNotifs(notifs);
    return newNotif;
  },

  markNotificationsAsRead(): void {
    const notifs = loadNotifs().map((n) => ({ ...n, isRead: true }));
    saveNotifs(notifs);
  }
};
