import { Globe2, Layers, ShieldCheck, Zap } from "lucide-react";

const assurances = [
  { label: "Senior-Led Governance", icon: ShieldCheck },
  { label: "Tailored Capital Structuring", icon: Layers },
  { label: "Rapid Execution", icon: Zap },
  { label: "Global Reach & Network", icon: Globe2 }
];

export function TrustChips() {
  return (
    <div className="flex flex-wrap gap-2.5 select-none">
      {assurances.map((item) => {
        const Icon = item.icon;
        return (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-colors hover:border-slate-300/40 hover:text-white [html.light_&]:border-black/10 [html.light_&]:bg-black/[0.03] [html.light_&]:text-[#181818] [html.light_&]:shadow-none [html.light_&]:hover:border-black/25"
          >
            <Icon size={13} className="text-legacy-red" />
            <span>{item.label}</span>
          </span>
        );
      })}
    </div>
  );
}
