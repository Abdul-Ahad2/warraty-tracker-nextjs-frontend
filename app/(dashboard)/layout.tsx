import { Navbar } from '@/components/shared/Navbar';
import { Sidebar } from '@/components/shared/Sidebar';
import { NotificationProvider } from '@/components/providers/NotificationProvider';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NotificationProvider>
            <div className="flex min-h-screen bg-[#faf9f7]">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar />
                    <main className="flex-1 p-6 md:p-8">{children}</main>
                </div>
            </div>
        </NotificationProvider>
    );
}

