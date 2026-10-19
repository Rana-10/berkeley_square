"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Building,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  Gavel,
  Hammer,
  HelpCircle,
  Landmark,
  Layers,
  Percent,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { TiltCard } from "@/components/animations/TiltCard";

interface Option {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

interface Question {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: "purpose",
    eyebrow: "Step 01 / 05 · Transaction Objective",
    title: "What is the primary objective of your transaction?",
    description: "Select the commercial driver behind your capital requirement.",
    options: [
      {
        id: "auction",
        label: "Auction Purchase",
        sublabel: "Strict 28-day legal completion window requiring fast, reliable funding",
        icon: Gavel
      },
      {
        id: "chain-break",
        label: "Chain Break / Fast Acquisition",
        sublabel: "Preventing transaction collapse or securing a discounted off-market asset",
        icon: Zap
      },
      {
        id: "refurbishment",
        label: "Heavy Refurbishment / Conversion",
        sublabel: "Structural remodelling, Permitted Development, or change-of-use schemes",
        icon: Hammer
      },
      {
        id: "dev-exit",
        label: "Development Exit & Sales Bridge",
        sublabel: "Refinancing high-cost construction debt while marketing finished units",
        icon: Building2
      },
      {
        id: "commercial-bridge",
        label: "Commercial / Mixed-Use Bridge",
        sublabel: "Acquisition or equity release on offices, retail, or industrial assets",
        icon: Building
      },
      {
        id: "equity-release",
        label: "Capital Raising & Portfolio Refinance",
        sublabel: "Unlocking liquidity from unencumbered or low-geared property assets",
        icon: Landmark
      }
    ]
  },
  {
    id: "security",
    eyebrow: "Step 02 / 05 · Collateral Profile",
    title: "What is the underlying security asset type?",
    description: "Identify the primary real estate backing the proposed facility.",
    options: [
      {
        id: "prime-resi",
        label: "Prime Residential (London / South East)",
        sublabel: "Luxury houses, apartments, or high-value residential investments",
        icon: Building2
      },
      {
        id: "commercial",
        label: "Commercial / Semi-Commercial",
        sublabel: "Boutique offices, mixed-use retail parades, warehousing, or hotels",
        icon: Building
      },
      {
        id: "development",
        label: "Ground-Up Site / Unfinished Scheme",
        sublabel: "Consented land, mid-construction scheme, or heavy conversion asset",
        icon: Hammer
      },
      {
        id: "portfolio",
        label: "Multi-Unit Property Portfolio",
        sublabel: "Cross-collateralized portfolio of residential or commercial properties",
        icon: Layers
      }
    ]
  },
  {
    id: "loanSize",
    eyebrow: "Step 03 / 05 · Capital Requirement",
    title: "What is your target funding requirement?",
    description: "Choose the estimated facility size needed for completion.",
    options: [
      {
        id: "tier-1",
        label: "£100,000 to £1,000,000",
        sublabel: "Fast-track bridging & streamlined desktop security verification",
        icon: Landmark
      },
      {
        id: "tier-2",
        label: "£1,000,000 to £5,000,000",
        sublabel: "Core advisory facility across residential, commercial, or heavy refurbishment",
        icon: Landmark
      },
      {
        id: "tier-3",
        label: "£5,000,000 to £15,000,000",
        sublabel: "Large-scale acquisition, development stretch senior, or portfolio refinance",
        icon: Landmark
      },
      {
        id: "tier-4",
        label: "£15,000,000+ (Institutional)",
        sublabel: "Bespoke structured debt, co-funding lines, or syndicated capital stacks",
        icon: Sparkles
      }
    ]
  },
  {
    id: "timeline",
    eyebrow: "Step 04 / 05 · Execution Window",
    title: "What is your required drawdown timeline?",
    description: "Our underwriting speed adapts directly to transaction urgency.",
    options: [
      {
        id: "urgent",
        label: "Fast-Track (< 10 Working Days)",
        sublabel: "Time-critical execution using dual-rep legal panel and search indemnity",
        icon: Zap
      },
      {
        id: "standard",
        label: "Standard (2 to 4 Weeks)",
        sublabel: "Full RICS valuation and structured legal due diligence timeline",
        icon: Clock
      },
      {
        id: "pipeline",
        label: "Flexible Pipeline (1 to 3 Months)",
        sublabel: "Forward funding, planning gain structuring, or auction catalog preparation",
        icon: Compass
      }
    ]
  },
  {
    id: "exit",
    eyebrow: "Step 05 / 05 · Repayment & Exit",
    title: "What is the planned exit strategy?",
    description: "A clearly defined exit route unlocks optimal loan terms and higher LTV.",
    options: [
      {
        id: "sale",
        label: "Asset Disposal / Open Market Sale",
        sublabel: "Sale of the finished property or individual residential units upon completion",
        icon: TrendingUp
      },
      {
        id: "refinance-btl",
        label: "Long-Term Term Loan / Buy-to-Let Mortgage",
        sublabel: "Refinancing onto institutional long-term commercial or buy-to-let debt",
        icon: Landmark
      },
      {
        id: "planning-gain",
        label: "Planning Determination / Institutional Sale",
        sublabel: "Value creation through planning grant followed by land disposal",
        icon: Scale
      },
      {
        id: "liquidity",
        label: "Business Cashflow / Retained Capital",
        sublabel: "Repayment through corporate trading earnings, dividends, or wider liquidity",
        icon: ShieldCheck
      }
    ]
  }
];

interface MatchedFacility {
  title: string;
  categoryBadge: string;
  tagline: string;
  maxLTV: string;
  fundingRange?: string;
  indicativeRate: string;
  speed: string;
  structure: string;
  whyMatched: string;
  highlights: string[];
}

function computeMatchedFacility(answers: Record<string, string>): MatchedFacility {
  const purpose = answers.purpose || "auction";
  const timeline = answers.timeline || "urgent";
  const loanSize = answers.loanSize || "tier-2";

  if (purpose === "auction") {
    return {
      title: "Fast-Track Auction Finance Facility",
      categoryBadge: "Auction Protocol",
      tagline: "Tailored for 28-day auction windows with expedited legal packs.",
      maxLTV: "Up to 75% LTV (100% with additional security)",
      fundingRange: "£100k – £100M",
      indicativeRate: "From 0.65% per month",
      speed: "Indicative terms in 24–48 hrs · completion in 14 days",
      structure: "First legal charge, 100% rolled-up interest (zero monthly servicing), search indemnity enabled.",
      whyMatched: "Configured for your tight auction deadline, utilizing pre-instructed RICS surveyors and dual-representation legal counsel.",
      highlights: [
        "Indicative terms issued within 24–48 hours",
        "No early repayment penalties on selected lines",
        "Cross-collateralisation accepted to achieve 100% purchase funding"
      ]
    };
  }

  if (purpose === "refurbishment") {
    return {
      title: "Heavy Refurbishment & Conversion Bridge",
      categoryBadge: "Value-Add Structuring",
      tagline: "Funding acquisition cost plus 100% of the build programme in stage drawdowns.",
      maxLTV: "Up to 75% Day 1 / 70% LTGDV / 88% LTC",
      fundingRange: "£250k – £100M",
      indicativeRate: "From 0.72% per month",
      speed: "Indicative terms in 24–48 hrs · completion in 14 days",
      structure: "Blended senior tranche with staged drawdown facility tied to QS sign-off.",
      whyMatched: "Engineered specifically for structural remodelling and commercial-to-residential conversions.",
      highlights: [
        "100% of construction cost funded in arrears",
        "Permitted Development (Class MA) schemes welcomed",
        "Seamless conversion into term finance upon completion"
      ]
    };
  }

  if (purpose === "dev-exit") {
    return {
      title: "Development Exit & Sales Period Bridge",
      categoryBadge: "Cost Reduction",
      tagline: "Release developer equity and slash monthly interest rates during the unit sales period.",
      maxLTV: "Up to 75% of Current Market Value",
      indicativeRate: "From 0.58% per month",
      speed: "Indicative terms in 24–48 hrs · completion in 14 days",
      structure: "Capital redemption upon each unit sale with flexible partial release deeds.",
      whyMatched: "Replaces high-cost construction debt with cheaper bridging capital while marketing completed units.",
      highlights: [
        "Unlocks developer profit and equity before all units are sold",
        "No pressure from construction finance expiration deadlines",
        "Partial discharge on individual unit completions"
      ]
    };
  }

  if (purpose === "chain-break") {
    return {
      title: "Chain-Break & Time-Critical Acquisition Bridge",
      categoryBadge: "Rapid Liquidity",
      tagline: "Secure off-market acquisitions and bridge the funding gap between purchase and sale.",
      maxLTV: "Up to 75% LTV",
      fundingRange: "£100k – £100M",
      indicativeRate: "From 0.65% per month",
      speed: "Indicative terms in 24–48 hrs · completion in 14 days",
      structure: "Short-term bridging facility with 12-month term and rolled interest options.",
      whyMatched: "Eliminates chain vulnerabilities, enabling you to transact with cash-buyer confidence.",
      highlights: [
        "Transact as an immediate cash buyer",
        "Desktop appraisals accepted for low-LTV prime assets",
        "Repay effortlessly when your outgoing property sale completes"
      ]
    };
  }

  if (purpose === "commercial-bridge") {
    return {
      title: "Commercial & Semi-Commercial Acquisition Bridge",
      categoryBadge: "Asset Repositioning",
      tagline: "Flexible debt for secondary offices, mixed-use retail, industrial, and unencumbered portfolios.",
      maxLTV: "Up to 70% LTV",
      fundingRange: "£100k – £100M",
      indicativeRate: "From 0.75% per month / Base + 4.5% p.a.",
      speed: "Indicative terms in 24–48 hrs · completion in 2–3 weeks",
      structure: "Interest-only term or rolled interest with flexible ICR covenants.",
      whyMatched: "Tailored around your commercial asset profile, accommodating vacant spaces or lease repositioning.",
      highlights: [
        "Vacant and short-lease commercial assets considered",
        "Foreign national & offshore SPV ownership accepted",
        "Bridge-to-term pathways available"
      ]
    };
  }

  return {
    title: "Capital Release & Portfolio Equity Refinance",
    categoryBadge: "Equity Extraction",
    tagline: "Release substantial capital from existing property holdings for reinvestment.",
    maxLTV: "Up to 70% LTV",
    fundingRange: "£100k – £100M",
    indicativeRate: "From 0.60% per month",
    speed: "Indicative terms in 24–48 hrs · completion in 2–3 weeks",
    structure: "1st or 2nd charge debt facility with tailored interest roll-up.",
    whyMatched: "Unlocks maximum liquidity from unencumbered or low-geared assets to support strategic growth.",
    highlights: [
      "No restriction on use of released capital",
      "2nd charge options leaving low-rate 1st mortgages intact",
      "Multi-asset cross-charge structures"
    ]
  };
}

export function FindMyFundingJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const activeQuestion = questions[currentStep];

  function handleSelectOption(optionId: string) {
    const updatedAnswers = { ...answers, [activeQuestion.id]: optionId };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function handleReset() {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  }

  const matchedFacility = computeMatchedFacility(answers);

  return (
    <section className="relative py-24 select-none overflow-hidden" id="find-my-funding">
      {/* Ambient Red Glow Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-radial-red opacity-40" />

      <div className="container relative z-10 max-w-4xl">
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/85 shadow-lg backdrop-blur-xl mb-4">
            <Sparkles size={14} className="text-legacy-red" />
            <span>Interactive Capital Navigator</span>
          </div>
          <h2 className="display text-2xl sm:text-3xl md:text-4xl text-white font-bold leading-tight">
            Find My Funding Journey.
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-300">
            Answer 5 quick strategic questions to identify the optimal lending pathway, indicative leverage, and bespoke capital structure for your transaction.
          </p>
        </div>

        {/* Dynamic Multi-Step Question Flow or Matched Result Card */}
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#14141a]/95 via-[#0e0e13]/95 to-[#08080b]/95 p-6 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl"
            >
              {/* Progress Track */}
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div>
                  <span className="eyebrow">{activeQuestion.eyebrow}</span>
                  <h3 className="display mt-1 text-2xl md:text-3xl text-white">
                    {activeQuestion.title}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-slate-400">
                    {activeQuestion.description}
                  </p>
                </div>

                <span className="font-mono text-xs font-bold text-white/40 hidden sm:block">
                  0{currentStep + 1} / 05
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-white/10 mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-legacy-deepRed via-legacy-red to-white shadow-[0_0_10px_#C43A31]"
                  initial={{ width: `${(currentStep / questions.length) * 100}%` }}
                  animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                />
              </div>

              {/* Interactive Option Cards */}
              <div className="grid gap-3.5 sm:grid-cols-2">
                {activeQuestion.options.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = answers[activeQuestion.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`group relative flex items-start gap-4 rounded-2xl p-5 text-left border transition-all duration-300 ${
                        isSelected
                          ? "border-legacy-red bg-legacy-red/20 shadow-[0_0_20px_rgba(196,58,49,0.3)]"
                          : "border-white/10 bg-white/[0.03] hover:border-slate-300/40 hover:bg-white/[0.06] hover:scale-[1.01]"
                      }`}
                    >
                      <div
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-colors ${
                          isSelected
                            ? "border-legacy-red bg-legacy-red text-white"
                            : "border-white/15 bg-white/5 text-legacy-red group-hover:bg-legacy-red group-hover:text-white"
                        }`}
                      >
                        <Icon size={20} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-white group-hover:text-white">
                            {opt.label}
                          </h4>
                          <ArrowRight
                            size={14}
                            className="text-legacy-red opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                          />
                        </div>
                        <p className="mt-1.5 text-xs leading-5 text-slate-400">
                          {opt.sublabel}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Back Button */}
              {currentStep > 0 && (
                <div className="mt-8 flex justify-start border-t border-white/10 [html.light_&]:border-[#DDD7CA] pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-black bg-black px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-md transition-all duration-200 hover:bg-neutral-900 active:scale-[0.98] [html.light_&]:bg-[#121316] [html.light_&]:text-white [html.light_&]:border-[#121316] [html.light_&]:hover:bg-neutral-800"
                  >
                    <ArrowLeft size={14} /> Back to Previous Step
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="matched-result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <TiltCard className="p-8 md:p-12 border-legacy-red/50 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(196,58,49,0.25)]">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {matchedFacility.categoryBadge} Matched
                      </span>
                      <h3 className="display mt-1 text-2xl md:text-3xl text-white">
                        {matchedFacility.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    <RefreshCw size={12} /> Recalculate
                  </button>
                </div>

                <p className="mt-5 text-sm md:text-base leading-relaxed text-slate-200">
                  {matchedFacility.tagline}
                </p>

                {/* Key Term Matrix Strip */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">LTV</p>
                    <p className="font-mono text-base font-bold text-legacy-red mt-0.5">{matchedFacility.maxLTV}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Indicative rate</p>
                    <p className="font-mono text-base font-bold text-white mt-0.5">{matchedFacility.indicativeRate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Terms &amp; completion</p>
                    <p className="font-mono text-base font-bold text-emerald-400 mt-0.5">{matchedFacility.speed}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{matchedFacility.fundingRange ? "Funding range" : "Governance"}</p>
                    <p className="font-mono text-base font-bold text-slate-200 mt-0.5">{matchedFacility.fundingRange ?? "Senior Underwriter"}</p>
                  </div>
                </div>

                {/* Why Matched + Highlights */}
                <div className="mt-8 grid gap-6 md:grid-cols-2 border-t border-white/10 pt-6">
                  <div>
                    <span className="eyebrow">Strategic Rationale</span>
                    <p className="mt-2 text-xs md:text-sm leading-6 text-slate-300">
                      {matchedFacility.whyMatched}
                    </p>
                    <div className="mt-4 text-xs text-slate-400">
                      <span className="text-white font-bold block mb-1">Structure Overview</span>
                      {matchedFacility.structure}
                    </div>
                  </div>

                  <div>
                    <span className="eyebrow">Facility Highlights</span>
                    <div className="mt-3 space-y-2">
                      {matchedFacility.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2.5 text-xs text-white/90">
                          <CheckCircle2 size={14} className="text-legacy-red shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div className="text-xs text-slate-400">
                    Indicative terms only: non-binding, and subject to RICS appraisal & credit sanction. Completion timings run from instruction.
                  </div>

                  <ButtonLink
                    href="/loan-application"
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider"
                  >
                    Apply For This Matched Facility <ArrowRight size={15} />
                  </ButtonLink>
                </div>
              </TiltCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
