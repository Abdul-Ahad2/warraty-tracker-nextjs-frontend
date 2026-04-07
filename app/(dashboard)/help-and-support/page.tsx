"use client";

import { useState } from "react";
import { SupportHeader } from "@/components/features/help/SupportHeader";
import { QuickLinkCard } from "@/components/features/help/QuickLinkCard";
import { FAQSection } from "@/components/features/help/FAQSection";
import { SupportCTA } from "@/components/features/help/SupportCTA";
import { faqs, contactOptions } from "@/components/features/help/constants";

export default function HelpSupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <SupportHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main content */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Quick Links */}
          <div
            className="mb-24 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-3xl font-black text-neutral-900 mb-8 tracking-tight">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactOptions.map((option, idx) => (
                <QuickLinkCard key={idx} option={option} />
              ))}
            </div>
          </div>

          <FAQSection
            faqs={filteredFAQs}
            openFAQ={openFAQ}
            setOpenFAQ={setOpenFAQ}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <SupportCTA />
        </div>
      </div>

      <style jsx global>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
              filter: blur(4px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }
          .animate-fade-in-up {
            opacity: 0;
            animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          @keyframes fade-in-down {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
        `}
      </style>
    </div>
  );
}
