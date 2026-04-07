import Link from 'next/link';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';

export function SuccessView() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCF9]">
            <div className="text-center max-w-md px-6 animate-fade-in-up">
                <div className="w-24 h-24 bg-[#D4E3D7] rounded-[2rem] flex items-center justify-center mx-auto mb-12">
                    <FiCheckCircle size={44} className="text-[#2D5A43]" strokeWidth={1.5} />
                </div>
                <h1 className="font-black text-[#1A1C19] text-6xl mb-4 tracking-tighter leading-[0.85]">
                    Welcome.
                </h1>
                <p className="text-[#444941] text-xl mb-16 leading-relaxed font-medium">
                    Your account is ready. Start protecting your purchases today.
                </p>
                <Link href="/dashboard">
                    <Button variant="primary" size="lg" className="h-16 px-10 text-base font-black rounded-2xl group"
                        iconRight={<FiArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />}>
                        Go to Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
}
