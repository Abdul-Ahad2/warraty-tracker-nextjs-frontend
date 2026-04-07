import Link from "next/link";
import { FiMail, FiMessageSquare, FiArrowRight, FiZap } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export function SupportCTA() {
    return (
        <div
            className="mt-24 bg-gradient-to-br from-neutral-900 to-black rounded-[2rem] p-12 text-white text-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
        >
            <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                    <FiZap size={28} />
                </div>
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight">
                Still need help ?
            </h2>
            <p className="text-lg text-neutral-300 font-medium mb-10 max-w-2xl mx-auto">
                Our support team is here to help. Reach out and we&apos;ll get back to
                you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="mailto:support@notez.com">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="rounded-[1.5rem] font-semibold"
                        icon={<FiMail size={18} strokeWidth={2.5} />}
                    >
                        Email us
                    </Button>
                </Link>
                <button className="flex items-center gap-2 px-8 py-4 text-white font-semibold hover:text-neutral-200 transition-colors">
                    <FiMessageSquare size={18} strokeWidth={2.5} />
                    Start a chat
                    <FiArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
