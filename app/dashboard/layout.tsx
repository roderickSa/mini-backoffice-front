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

const dashboardPages = [
  { name: "Dashboard", pathname: "/dashboard" },
  { name: "Products", pathname: "/dashboard/product" },
  { name: "Category", pathname: "/dashboard/category" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardLayoutAside dashboardPages={dashboardPages} />
      <div className="p-4 xl:ml-80">
        <DashboardLayoutNavbar dashboardPages={dashboardPages} />
        {children}
        <div className="text-blue-gray-600">
          <footer className="py-2"></footer>
        </div>
      </div>
    </div>
  );
}
