"use client";

import { useState } from "react";

/** Click-to-load map: avoids ~600 KB of third-party script until the visitor actually asks for it. */
export function MapFacade({ embedUrl, title, address }: { embedUrl: string; title: string; address: string }) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-[#ECE9E1] md:aspect-[4/5]">
      {active ? (
        <iframe id="map" title={title} src={embedUrl} className="absolute inset-0 h-full w-full border-0 grayscale contrast-110" loading="lazy" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 bg-[linear-gradient(0deg,rgba(24,24,24,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,24,0.06)_1px,transparent_1px)] bg-[length:40px_40px] p-6">
          <p className="display max-w-xs text-2xl font-semibold leading-snug text-theme-primary">{address}</p>
          <button
            type="button"
            onClick={() => setActive(true)}
            className="focus-ring border border-[#112A22] bg-[#112A22] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-legacy-red hover:bg-legacy-red"
          >
            Load interactive map
          </button>
        </div>
      )}
    </div>
  );
}
