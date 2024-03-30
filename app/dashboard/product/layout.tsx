import { Metadata } from "next";

export const metadata: Metadata = { title: "Product | Dashboard" };

export default function ProductDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
