import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <DashboardSidebar />
            <div className="flex-1 min-h-[calc(100vh-80px)] bg-surface pb-20 lg:pb-0">
                {children}
            </div>
        </div>
    );
}
