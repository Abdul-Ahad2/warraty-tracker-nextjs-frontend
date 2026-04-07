import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface QuickLinkCardProps {
    option: {
        icon: React.ReactNode;
        title: string;
        description: string;
        action: string;
        href: string;
    };
}

export function QuickLinkCard({ option }: QuickLinkCardProps) {
    return (
        <Link
            href={option.href}
            className="group bg-white border border-neutral-200 rounded-[2rem] p-6 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-neutral-100 group-hover:bg-neutral-200 rounded-xl text-neutral-600 transition-colors">
                    {option.icon}
                </div>
                <FiArrowRight
                    size={18}
                    className="text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all"
                />
            </div>
            <h3 className="font-bold text-neutral-900 text-lg mb-2">
                {" "}
                {option.title}{" "}
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
                {" "}
                {option.description}{" "}
            </p>
            <span className="text-sm font-semibold text-black group-hover:underline underline-offset-2">
                {option.action} →
            </span>
        </Link>
    );
}
