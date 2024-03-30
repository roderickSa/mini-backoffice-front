import { Metadata } from "next";
import DashboardLayoutAside from "../_components/dashboard/layout/aside";
import DashboardLayoutNavbar from "../_components/dashboard/layout/navbar";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Mini Backoffice",
    template: "%s | Mini Backoffice",
  },
  description: "Mini backoffice project app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardLayoutAside />
      <div className="p-4 xl:ml-80">
        <DashboardLayoutNavbar />
        {children}
        <div className="text-blue-gray-600">
          <footer className="py-2"></footer>
        </div>
      </div>
    </div>
  );
}
