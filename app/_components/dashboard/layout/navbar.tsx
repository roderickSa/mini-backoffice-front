"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type Prop = {
  name: string;
  pathname: string;
};

export default function DashboardLayoutNavbar({
  dashboardPages,
}: {
  dashboardPages: Prop[];
}) {
  const pathname = usePathname();

  const nameOfSection = () => {
    const section = dashboardPages.filter((page) => page.pathname === pathname);

    if (section) {
      return section[0].name;
    }

    return "Home";
  };

  return (
    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <nav aria-label="breadcrumb" className="w-max">
            <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
              <li className="flex items-center text-blue-gray-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                <Link href="/dashboard">
                  <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                    dashboard
                  </p>
                </Link>
                <span className="text-gray-500 text-sm antialiased font-normal leading-normal mx-2 pointer-events-none select-none">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-900 antialiased text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-normal">
                  {nameOfSection()}
                </p>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </nav>
  );
}
