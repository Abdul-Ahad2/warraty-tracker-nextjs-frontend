import { FiSearch } from "react-icons/fi";
import { FAQItem } from "./FAQItem";

interface FAQSectionProps {
    faqs: { id: number; question: string; answer: string }[];
    openFAQ: number | null;
    setOpenFAQ: (id: number | null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function FAQSection({
    faqs,
    openFAQ,
    setOpenFAQ,
    searchQuery,
    setSearchQuery
}: FAQSectionProps) {
    return (
        <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
        >
            <div className="mb-12">
                <h2 className="text-3xl font-black text-neutral-900 mb-3 tracking-tight">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-neutral-600 font-medium">
                    {searchQuery
                        ? `Found ${faqs.length} results`
                        : "Find answers to common questions"}
                </p>
            </div>

            {faqs.length > 0 ? (
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            item={faq}
                            isOpen={openFAQ === faq.id}
                            onToggle={() =>
                                setOpenFAQ(openFAQ === faq.id ? null : faq.id)
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-neutral-200 p-12 text-center">
                    <FiSearch size={40} className="mx-auto mb-4 text-neutral-400" />
                    <h3 className="font-bold text-neutral-900 text-lg mb-2">
                        {" "}
                        No results found{" "}
                    </h3>
                    <p className="text-neutral-600 mb-6">
                        We couldn&apos;t find any articles matching your search. Try
                        different keywords.
                    </p>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="text-black font-semibold hover:underline underline-offset-2"
                    >
                        Clear search
                    </button>
                </div>
            )}
        </div>
    );
}
