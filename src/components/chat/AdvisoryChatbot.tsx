"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  RotateCcw,
  Send,
  Sparkles,
  X
} from "lucide-react";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { BSQLogo } from "@/components/ui/BSQLogo";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actions?: { label: string; href: string; external?: boolean; icon?: "whatsapp" | "email" | "phone" | "appointment" | "loan" }[];
  chips?: string[];
};

const predefinedFaqs = [
  {
    question: "What makes Berkeley Square Capital different?",
    answer:
      "Unlike traditional brokers or rigid institutional lenders, we operate as financial engineers for real estate transactions. Each deal is bespoke, custom-structured around the client, the asset, and the investment strategy—combining bridging finance, acquisitions, and asset management into a single seamless process.",
    keywords: ["different", "difference", "broker", "special", "unique", "why choose", "about", "who are you"]
  },
  {
    question: "Which geographical markets and locations do you serve?",
    answer:
      "We provide nationwide property finance across the UK (England, Scotland, Wales, Northern Ireland). Internationally, our network spans Dubai, Riyadh, Muscat, Athens, Pakistan, the United States, and wider Europe with full cross-border structuring capability.",
    keywords: ["market", "location", "locations", "country", "countries", "dubai", "uk", "international", "global", "area", "where"]
  },
  {
    question: "Who are your primary target clients?",
    answer:
      "We serve Individual Investors building residential/commercial portfolios, Property Developers requiring ground-up or conversion funding, Business Owners seeking commercial growth capital, High-Net-Worth Individuals (HNWIs) for prime wealth preservation, and Overseas/International Investors.",
    keywords: ["client", "clients", "target", "investor", "developer", "hnwi", "who do you work with", "eligibility"]
  },
  {
    question: "How fast can bridging finance or terms be issued?",
    answer:
      "We issue clear indicative funding proposals within 24 to 48 hours. For time-critical auction purchases, distressed sales, or broken chains, our streamlined process enables completions in as little as 7 to 10 business days.",
    keywords: ["fast", "speed", "timeline", "how fast", "turnaround", "completion", "hours", "days", "quick", "auction"]
  },
  {
    question: "Does an initial finance enquiry affect my credit profile?",
    answer:
      "No. Initial consultations, project appraisals, and indicative term sheet formulations are strictly confidential, non-binding, and carry zero impact on your credit profile. Formal searches only occur after terms are mutually agreed.",
    keywords: ["credit", "score", "profile", "impact", "search", "hard check", "soft check"]
  },
  {
    question: "What facility sizes and leverage (LTV) do you offer?",
    answer:
      "We structure facilities from £100k up to £100M+ (with larger institutional tranches by arrangement). We provide up to 80% LTV on standard bridging, up to 70% LTGDV / 88% LTC on development finance, and up to 100% purchase price with additional security.",
    keywords: ["size", "sizes", "amount", "loan size", "ltv", "leverage", "ltgdv", "maximum", "minimum", "how much", "rate", "rates", "interest"]
  }
];

export function AdvisoryChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initialMessage: Message = {
    id: "welcome",
    sender: "bot",
    text: "Welcome to Berkeley Square Capital. How can we assist with your property acquisition or funding requirements today?",
    timestamp: "Just now",
    chips: predefinedFaqs.map((f) => f.question)
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping]);

  function handleSelectQuestion(questionText: string) {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const matchedFaq = predefinedFaqs.find(
      (f) => f.question.toLowerCase() === questionText.toLowerCase()
    );

    setTimeout(() => {
      setIsTyping(false);
      if (matchedFaq) {
        const botReply: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: matchedFaq.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actions: [
            { label: "Book Consultation", href: "/appointment", icon: "appointment" },
            { label: "WhatsApp Desk", href: company.whatsapp, external: true, icon: "whatsapp" }
          ]
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        respondWithFallback();
      }
    }, 450);
  }

  function handleCustomQuery(text: string) {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const lower = text.toLowerCase();
    const matchedFaq = predefinedFaqs.find((f) =>
      f.keywords.some((k) => lower.includes(k))
    );

    setTimeout(() => {
      setIsTyping(false);
      if (matchedFaq) {
        const botReply: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: matchedFaq.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actions: [
            { label: "Book Consultation", href: "/appointment", icon: "appointment" },
            { label: "WhatsApp Desk", href: company.whatsapp, external: true, icon: "whatsapp" }
          ]
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        respondWithFallback();
      }
    }, 550);
  }

  function respondWithFallback() {
    const fallbackReply: Message = {
      id: `bot-fallback-${Date.now()}`,
      sender: "bot",
      text: `For custom transaction engineering, bespoke funding structures, or further queries, please connect directly with our senior Mayfair client desk:`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actions: [
        {
          label: `WhatsApp: ${company.phoneDisplay}`,
          href: company.whatsapp,
          external: true,
          icon: "whatsapp"
        },
        {
          label: `Email: ${company.email}`,
          href: `mailto:${company.email}`,
          external: true,
          icon: "email"
        },
        {
          label: `Call: ${company.phoneDisplay}`,
          href: `tel:${company.phone}`,
          icon: "phone"
        },
        {
          label: "Book Mayfair Appointment",
          href: "/appointment",
          icon: "appointment"
        }
      ]
    };
    setMessages((prev) => [...prev, fallbackReply]);
  }

  function resetChat() {
    setMessages([initialMessage]);
  }

  return (
    <div className="fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-50 font-sans select-none" suppressHydrationWarning>
      {/* Floating Trigger: a flat letterhead tab, not a glowing pill */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          suppressHydrationWarning
          className="focus-ring group relative flex h-11 w-11 items-center justify-center gap-3 border border-[#1F4030] bg-[#1F4030] sm:h-auto sm:w-auto sm:justify-start sm:px-4 sm:py-3 text-white transition-colors hover:border-legacy-red hover:bg-legacy-red"
          aria-label="Open Client Assistant Chatbot"
        >
          <MessageSquare size={15} />
          <span className="sr-only sm:not-sr-only text-[11px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap">Ask a question</span>
          {hasUnread && <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-legacy-red border-2 border-[#EEF2EA]" />}
        </button>
      )}

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            suppressHydrationWarning
            className="fixed inset-x-3 bottom-3 sm:static sm:inset-auto flex flex-col w-auto sm:w-[410px] h-[520px] max-h-[85vh] border border-[#181818]/25 bg-[#EEF2EA] shadow-[0_18px_50px_rgba(24,24,24,0.18)] overflow-hidden z-50"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 [html.light_&]:border-[#C6D3C0] bg-white/[0.03] [html.light_&]:bg-white/80 px-4 sm:px-5 py-3.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="relative shrink-0">
                  <BSQLogo variant="mark" size="sm" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500 border-2 border-black [html.light_&]:border-white shadow-[0_0_6px_#10b981]" />
                </div>
                <div>
                  <h3 className="font-sans text-xs sm:text-sm font-bold text-white [html.light_&]:text-[#181818] flex items-center gap-1.5">
                    <span>Berkeley Square Capital</span>
                    <Sparkles size={12} className="text-legacy-red" />
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 [html.light_&]:text-emerald-700 block font-semibold">
                    Mayfair Client Desk • Online
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset conversation"
                  className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 [html.light_&]:text-[#666460] hover:bg-white/10 [html.light_&]:hover:bg-black/5 hover:text-white [html.light_&]:hover:text-black transition-colors"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="grid h-8 w-8 place-items-center rounded-xl text-slate-400 [html.light_&]:text-[#666460] hover:bg-white/10 [html.light_&]:hover:bg-black/5 hover:text-white [html.light_&]:hover:text-black transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Chat Body (Message Stream) */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 text-xs [html.light_&]:bg-[#F4F7F0]">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={cn("flex flex-col", isBot ? "items-start" : "items-end")}
                  >
                    <div
                      className={cn(
                        "max-w-[88%] sm:max-w-[85%] rounded-2xl p-3 sm:p-3.5 leading-relaxed",
                        isBot
                          ? "border border-white/10 [html.light_&]:border-[#C6D3C0] bg-white/[0.05] [html.light_&]:bg-white text-slate-200 [html.light_&]:text-[#222222] rounded-tl-sm shadow-md"
                          : "bg-gradient-to-r from-legacy-deepRed to-legacy-red text-white font-medium rounded-tr-sm shadow-[0_0_15px_rgba(225,18,45,0.3)]"
                      )}
                    >
                      <p>{msg.text}</p>
                    </div>

                    <span className="mt-1 text-[9px] font-mono text-slate-500 [html.light_&]:text-[#888580] px-1">
                      {msg.timestamp}
                    </span>

                    {/* Predefined FAQ Chips */}
                    {msg.chips && msg.chips.length > 0 && (
                      <div className="mt-2.5 w-full space-y-1.5">
                        <span className="text-[9.5px] uppercase font-mono font-bold text-slate-400 [html.light_&]:text-[#666460] block px-1">
                          Frequently Asked Questions:
                        </span>
                        <div className="flex flex-col gap-1.5">
                          {msg.chips.map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => handleSelectQuestion(q)}
                              className="focus-ring flex items-center justify-between rounded-xl border border-white/10 [html.light_&]:border-[#C6D3C0] bg-white/[0.03] [html.light_&]:bg-white p-2.5 text-left text-[11px] font-semibold text-slate-300 [html.light_&]:text-[#222222] transition-all hover:border-legacy-red/50 hover:bg-legacy-red/10 [html.light_&]:hover:bg-legacy-red/5 hover:text-white [html.light_&]:hover:text-legacy-red shadow-sm"
                            >
                              <span>{q}</span>
                              <ArrowRight size={12} className="text-legacy-red shrink-0 ml-2" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Link Buttons for Direct Follow-up */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 sm:gap-2 w-full">
                        {msg.actions.map((act) => (
                          <a
                            key={act.label}
                            href={act.href}
                            target={act.external ? "_blank" : undefined}
                            rel={act.external ? "noopener noreferrer" : undefined}
                            className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-white/15 [html.light_&]:border-[#D8D3C8] bg-black/60 [html.light_&]:bg-white px-3 py-2 text-[10.5px] sm:text-[11px] font-bold text-white [html.light_&]:text-[#181818] shadow-md transition-all hover:border-legacy-red hover:bg-legacy-red/20 [html.light_&]:hover:bg-legacy-red/10 [html.light_&]:hover:text-legacy-red"
                          >
                            {act.icon === "whatsapp" && <MessageCircle size={13} className="text-emerald-400 [html.light_&]:text-emerald-600" />}
                            {act.icon === "email" && <Mail size={13} className="text-legacy-red" />}
                            {act.icon === "phone" && <Phone size={13} className="text-legacy-red" />}
                            {act.icon === "appointment" && <CalendarCheck size={13} className="text-white [html.light_&]:text-legacy-red" />}
                            <span>{act.label}</span>
                            <ArrowUpRight size={11} className="text-slate-400 [html.light_&]:text-[#888580]" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing Animation Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 [html.light_&]:border-[#C6D3C0] bg-white/5 [html.light_&]:bg-white px-4 py-3 w-max">
                  <span className="h-1.5 w-1.5 rounded-full bg-legacy-red animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-legacy-red animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-legacy-red animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t border-white/10 [html.light_&]:border-[#C6D3C0] bg-black/50 [html.light_&]:bg-white p-2.5 sm:p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCustomQuery(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a question..."
                  className="focus-ring flex-1 rounded-xl border border-white/15 [html.light_&]:border-[#D8D3C8] bg-white/5 [html.light_&]:bg-[#EEF2EA] px-3 py-2 text-xs text-white [html.light_&]:text-[#181818] placeholder:text-slate-500 [html.light_&]:placeholder:text-[#888580] focus:border-legacy-red focus:bg-white/10 [html.light_&]:focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-legacy-red text-white transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(225,18,45,0.4)] shrink-0"
                >
                  <Send size={13} />
                </button>
              </form>

              <div className="mt-1.5 flex items-center justify-between text-[9.5px] text-slate-500 [html.light_&]:text-[#666460] px-1 font-mono">
                <span>Berkeley Square Capital</span>
                <span className="text-slate-400 [html.light_&]:text-[#666460]">Mayfair W1J 6BD</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
