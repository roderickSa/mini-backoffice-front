"use client";

import { usePathname } from "next/navigation";
import useDashboard from "../useDashboard";
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
  const { token } = useDashboard();
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
                <a href="#">
                  <p className="block antialiased text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                    dashboard
                  </p>
                </a>
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
        <div className="flex items-center">
          {!token && (
            <Link href="/login">
              <button
                className="middle none font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5 text-blue-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Sign In{" "}
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
