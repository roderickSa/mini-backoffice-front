import { Metadata } from "next";

export const metadata: Metadata = { title: "Category - Dashboard" };

export default function CategoryDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
