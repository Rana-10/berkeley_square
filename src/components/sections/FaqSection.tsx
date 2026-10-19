"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/animations/Reveal";

const items = [
  {
    question: "What makes Berkeley Square Capital different from traditional lenders and brokers?",
    answer:
      "Unlike traditional brokers or rigid institutional lenders, we operate as financial engineers for real estate transactions. Each deal is structured as a bespoke, custom-made solution designed around the specific requirements of the client, the asset, and the investment strategy—combining funding, acquisition, and ongoing management into a single, coordinated process."
  },
  {
    question: "Which geographical markets and locations do you serve?",
    answer:
      "We provide nationwide property finance and real estate advisory across the United Kingdom. Internationally, our network supports clients across Europe, the Middle East (Dubai, Riyadh, Muscat), the United States, and Asia (including Pakistan and Greece) with cross-border structuring capability."
  },
  {
    question: "Who are your primary target clients?",
    answer:
      "We serve individual investors building residential/commercial portfolios, property developers requiring bridging or development finance, business owners seeking commercial mortgages or growth capital, High-Net-Worth Individuals (HNWIs) requiring bespoke wealth structuring, and international investors acquiring UK/global property."
  },
  {
    question: "How fast are indicative terms issued, and how quickly can a loan complete?",
    answer:
      "Indicative terms (a non-binding proposal) are issued within 24 to 48 hours. Completion is separate: bridging can complete in 14 days from instruction, subject to valuation, legal work and credit approval. Refinance typically completes in 2 to 3 weeks."
  },
  {
    question: "Does an initial finance enquiry affect my credit profile?",
    answer:
      "No. Initial consultations and indicative term sheet preparations are non-binding and carry zero impact on your credit file. Formal searches only occur after terms are mutually agreed."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Reveal>
      <div className="surface divide-y divide-white/10 overflow-hidden">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="transition-colors hover:bg-white/[0.02]">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="focus-ring flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
              >
                <span className="text-base font-semibold text-white/95 md:text-lg">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${
                    isOpen
                      ? "border-legacy-red bg-legacy-red text-white shadow-[0_0_12px_rgba(196,58,49,0.5)]"
                      : "border-white/20 bg-white/5 text-white/70"
                  }`}
                >
                  <Plus size={16} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm leading-7 text-slate-300 md:px-8 md:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
