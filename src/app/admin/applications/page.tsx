"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { ApplicationStatus } from "@/schema/property.enums";
import { cn } from "@/lib/utils";

type ApplicationView = "property" | "appointments" | "loans";

type AdminPropertyApplication = {
  id: number;
  status: ApplicationStatus;
  message_from_applicant: string | null;
  submitted_at: string;
  guest_first_name: string;
  guest_last_name: string;
  property?: { title?: string } | null;
};

type AdminAppointment = {
  id: number;
  reference: string;
  name: string;
  service: string;
  received_at: string;
};

type AdminLoanApplication = {
  id: number;
  reference: string;
  status: string;
  applicant_name: string | null;
  net_amount: string | null;
  security_country: string | null;
  received_at: string;
};

export default function AdminApplicationsPage() {
  const [propertyApplications, setPropertyApplications] = useState<AdminPropertyApplication[]>([]);
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [loanApplications, setLoanApplications] = useState<AdminLoanApplication[]>([]);
  const [activeView, setActiveView] = useState<ApplicationView>("property");
  const [loadingView, setLoadingView] = useState<ApplicationView | null>(null);
  const [message, setMessage] = useState("");

  async function loadPropertyApplications() {
    const response = await fetch("/api/admin/applications", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load property applications.");
    setPropertyApplications(await response.json());
  }

  async function loadAppointments() {
    const response = await fetch("/api/admin/appointments", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load appointments.");
    setAppointments(await response.json());
  }

  async function loadLoanApplications() {
    const response = await fetch("/api/admin/loan-applications", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load loan applications.");
    setLoanApplications(await response.json());
  }

  async function showView(view: ApplicationView) {
    setActiveView(view);
    setMessage("");
    setLoadingView(view);

    try {
      if (view === "property") await loadPropertyApplications();
      if (view === "appointments") await loadAppointments();
      if (view === "loans") await loadLoanApplications();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load applications.");
    } finally {
      setLoadingView(null);
    }
  }

  useEffect(() => {
    showView("property");
  }, []);

  async function updateStatus(id: number, status: ApplicationStatus) {
    const response = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setMessage("Unable to update application.");
      return;
    }

    await loadPropertyApplications();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-2 text-3xl font-bold">Applications</h1>
        </div>
      </div>
      {message && <p className="mt-4 text-sm text-red-700">{message}</p>}

      <div className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-theme-border bg-theme-surface p-2">
        <ViewButton active={activeView === "property"} onClick={() => showView("property")}>
          View property applications
        </ViewButton>
        <ViewButton active={activeView === "appointments"} onClick={() => showView("appointments")}>
          View appointments
        </ViewButton>
        <ViewButton active={activeView === "loans"} onClick={() => showView("loans")}>
          View loan applications
        </ViewButton>
      </div>

      {activeView === "property" && (
        <AdminSection title="Property Applications" emptyText="No property applications submitted yet.">
          {loadingView === "property" ? <LoadingCard /> : propertyApplications.map((application) => (
            <article key={application.id} className="rounded-2xl border border-theme-border bg-theme-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold">
                    {application.guest_first_name} {application.guest_last_name}
                  </h2>
                  <p className="mt-1 text-sm text-theme-muted">{application.property?.title ?? "Property"}</p>
                  <p className="mt-1 text-xs text-theme-muted">{formatDate(application.submitted_at)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={application.status}
                    onChange={(event) => updateStatus(application.id, event.target.value as ApplicationStatus)}
                    className="rounded-xl border border-theme-border bg-theme-surface px-3 py-2 text-sm text-theme-primary"
                  >
                    {Object.values(ApplicationStatus).map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <DownloadLink href={`/api/admin/applications/${application.id}/pdf`} label="Download PDF" />
                </div>
              </div>
              <p className="mt-4 text-sm text-theme-secondary">{application.message_from_applicant || "No applicant message."}</p>
            </article>
          ))}
        </AdminSection>
      )}

      {activeView === "appointments" && (
        <AdminSection title="Appointment Requests" emptyText="No appointment requests submitted yet.">
          {loadingView === "appointments" ? <LoadingCard /> : appointments.map((appointment) => (
            <article key={appointment.id} className="rounded-2xl border border-theme-border bg-theme-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold">{appointment.name}</h2>
                  <p className="mt-1 text-sm text-theme-muted">{appointment.service}</p>
                  <p className="mt-1 text-xs text-theme-muted">{appointment.reference} - {formatDate(appointment.received_at)}</p>
                </div>
                <DownloadLink href={`/api/admin/appointments/${appointment.id}/pdf`} label="Download PDF" />
              </div>
            </article>
          ))}
        </AdminSection>
      )}

      {activeView === "loans" && (
        <AdminSection title="Loan Applications" emptyText="No loan applications submitted yet.">
          {loadingView === "loans" ? <LoadingCard /> : loanApplications.map((application) => (
            <article key={application.id} className="rounded-2xl border border-theme-border bg-theme-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold">{application.applicant_name ?? "Loan applicant"}</h2>
                  <p className="mt-1 text-sm text-theme-muted">
                    {application.net_amount || "Amount not provided"} {application.security_country ? `- ${application.security_country}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-theme-muted">{application.reference} - {formatDate(application.received_at)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-xl border border-theme-border px-3 py-2 text-xs font-bold uppercase text-theme-secondary">
                    {application.status}
                  </span>
                  <DownloadLink href={`/api/admin/loan-applications/${application.id}/pdf`} label="Download PDF" />
                </div>
              </div>
            </article>
          ))}
        </AdminSection>
      )}
    </div>
  );
}

function ViewButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition",
        active ? "bg-legacy-red text-white" : "border border-theme-border bg-theme-subtle text-theme-secondary hover:text-theme-primary",
      )}
    >
      {children}
    </button>
  );
}

function AdminSection({
  children,
  emptyText,
  title,
}: {
  children: React.ReactNode;
  emptyText: string;
  title: string;
}) {
  const items = Array.isArray(children) ? children.filter(Boolean) : children;
  const isEmpty = Array.isArray(items) ? items.length === 0 : !items;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-theme-primary">{title}</h2>
      <div className="mt-4 grid gap-4">
        {isEmpty ? (
          <div className="rounded-2xl border border-theme-border bg-theme-surface p-8 text-theme-muted">
            {emptyText}
          </div>
        ) : (
          items
        )}
      </div>
    </section>
  );
}

function DownloadLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border border-legacy-red/40 bg-legacy-red/10 px-4 py-2 text-xs font-bold uppercase text-legacy-red transition hover:border-legacy-red hover:bg-legacy-red/20"
    >
      <Download size={14} />
      {label}
    </a>
  );
}

function LoadingCard() {
  return (
    <div className="rounded-2xl border border-theme-border bg-theme-surface p-8 text-theme-muted">
      Loading applications.
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}
