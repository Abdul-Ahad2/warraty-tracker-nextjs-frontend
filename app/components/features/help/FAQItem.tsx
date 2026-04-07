import { FiChevronDown } from "react-icons/fi";

interface FAQItemProps {
    item: {
        id: number;
        question: string;
        answer: string;
    };
    isOpen: boolean;
    onToggle: () => void;
}

export function FAQItem({
    item,
    isOpen,
    onToggle,
}: FAQItemProps) {
    return (
        <div
            className="border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300"
            onClick={onToggle}
        >
            <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-neutral-50 transition-colors group">
                <h3 className="font-semibold text-neutral-900 text-left text-lg group-hover:text-black transition-colors">
                    {item.question}
                </h3>
                <FiChevronDown
                    size={20}
                    className={`text-neutral-500 flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            {isOpen && (
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 animate-fade-in-down">
                    <p className="text-neutral-600 text-base leading-relaxed">
                        {" "}
                        {item.answer}{" "}
                    </p>
                </div>
            )}
        </div>
    );
}
