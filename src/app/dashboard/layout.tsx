import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <DashboardSidebar />
            <main className="ml-64 flex-1 min-h-[calc(100vh-4rem)] bg-surface">
                {children}
            </main>
        </div>
    );
}
