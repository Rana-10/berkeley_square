import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          page: "var(--bg-page)",
          "page-alt": "var(--bg-page-alt)",
          surface: "var(--bg-surface)",
          "surface-elevated": "var(--bg-surface-elevated)",
          subtle: "var(--bg-subtle)",
          glass: "var(--bg-glass)",
          border: "var(--border-default)",
          "border-subtle": "var(--border-subtle)",
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)",
          red: "var(--accent-red)",

          // Brand static primitives preserved for backward compatibility
          offwhite: "#F3EEE4",
          offwhiteSoft: "#F6F2EA",
          stone: "#ECE7DE",
          stoneDark: "#E4DFD4",
          charcoal: "#181818",
          charcoalMuted: "#4A4844",
          cardLight: "#FAF7F1",
          cardBorderLight: "#E4DFD4"
        },
        legacy: {
          black: "#070709",
          charcoal: "#0d0d11",
          // Dynamic dual-theme bridges for backward-compatible card/border styling
          panel: "var(--bg-surface)",
          panelElevated: "var(--bg-surface-elevated)",
          panelDark: "#131318",
          border: "var(--border-default)",
          borderDark: "rgba(255, 255, 255, 0.09)",
          borderSilver: "rgba(226, 232, 240, 0.18)",
          silver: "#e2e8f0",
          silverMuted: "#94a3b8",
          silverDark: "#64748b",
          red: "#C43A31",
          deepRed: "#70000d",
          brightRed: "#ff2b4e",
          text: "var(--text-primary)",
          textDark: "#f8fafc",
          muted: "var(--text-muted)",
          mutedDark: "#94a3b8"
        }
      },
      boxShadow: {
        glow: "0 0 50px rgba(196, 58, 49,0.22)",
        "glow-silver": "0 0 40px rgba(226,232,240,0.15)",
        "glass-elevated": "0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(196, 58, 49,0.12)",
        "light-card": "0 10px 30px rgba(0,0,0,0.03)",
        "light-card-hover": "0 20px 45px rgba(0,0,0,0.07), 0 0 20px rgba(196, 58, 49,0.06)",
        "theme-card": "var(--shadow-card)",
        "theme-card-hover": "var(--shadow-card-hover)",
        "theme-floating": "var(--shadow-floating)",
        "theme-glass": "var(--shadow-glass)"
      },
      backgroundImage: {
        "radial-red": "radial-gradient(circle at 50% 0%, rgba(196, 58, 49,0.18), transparent 45%)",
        "radial-silver": "radial-gradient(circle at 50% 0%, rgba(226,232,240,0.1), transparent 50%)",
        "metallic-silver": "linear-gradient(135deg, #ffffff 0%, #cbd5e1 45%, #94a3b8 100%)",
        "metallic-card": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 40%, rgba(196, 58, 49,0.03) 100%)",
        "edge-red": "linear-gradient(135deg, rgba(196, 58, 49,0.15) 0%, rgba(19,19,24,0.85) 60%, rgba(7,7,9,0.95) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
