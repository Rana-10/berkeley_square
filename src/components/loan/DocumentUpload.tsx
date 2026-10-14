"use client";

import { UploadCloud, X } from "lucide-react";
import { useState } from "react";

const maxSize = 5 * 1024 * 1024;
const allowed = ["application/pdf", "image/jpeg", "image/png"];

export function DocumentUpload({ label, accept }: { label: string; accept: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  return (
    <div className="border border-legacy-border bg-black/28 p-4">
      <label className="grid cursor-pointer gap-3 text-sm text-white/78">
        <span>{label}</span>
        <span className="flex min-h-24 items-center justify-center gap-3 border border-dashed border-white/22 bg-white/[0.03] px-4 text-center">
          <UploadCloud className="text-legacy-red" />
          PDF, JPG, or PNG up to 5MB
        </span>
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(event) => {
            const selected = event.target.files?.[0] ?? null;
            setError("");
            if (!selected) return;
            if (!allowed.includes(selected.type)) {
              setError("Use a PDF, JPG, or PNG file.");
              return;
            }
            if (selected.size > maxSize) {
              setError("File must be 5MB or smaller.");
              return;
            }
            setFile(selected);
          }}
        />
      </label>
      {file ? (
        <div className="mt-3 flex items-center justify-between gap-3 border border-legacy-border bg-white/5 px-3 py-2 text-sm">
          <span className="truncate">{file.name}</span>
          <button type="button" onClick={() => setFile(null)} aria-label={`Remove ${file.name}`} className="focus-ring text-white/70 hover:text-white">
            <X size={16} />
          </button>
        </div>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
