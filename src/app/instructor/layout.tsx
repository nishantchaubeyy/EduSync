import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <DashboardSidebar />
            <main className="lg:ml-64 flex-1 min-h-[calc(100vh-4rem)] bg-surface pb-20 lg:pb-0">
                {children}
            </main>
        </div>
    );
}
