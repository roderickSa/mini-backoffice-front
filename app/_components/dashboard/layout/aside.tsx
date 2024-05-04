"use client";

import { FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import useDashboard from "../useDashboard";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import layoutStyle from "@/app/_components/dashboard/styles/layout.module.css";

type Prop = {
  name: string;
  pathname: string;
};

export default function DashboardLayoutAside({
  dashboardPages,
}: {
  dashboardPages: Prop[];
}) {
  const { token } = useDashboard();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      axioxFrontClient(token).post("/auth/logout");
    } catch (error) {
      console.log("some error when logging out");
    }

    Cookies.remove("access_token");
    router.push("/login");
  };

  return (
    <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-10 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
      <div className="relative border-b border-white/20">
        <a className="flex items-center gap-4 py-6 px-8" href="#/">
          <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-white">
            Material Tailwind Dashboard
          </h6>
        </a>
        <button
          className="middle none font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          type="button"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {dashboardPages.map((dashboardPage) => (
            <li key={dashboardPage.name}>
              <Link href={dashboardPage.pathname}>
                <button
                  className={`middle none font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize ${
                    pathname === dashboardPage.pathname
                      ? layoutStyle.sectionActive
                      : layoutStyle.sectionRegular
                  }`}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                  </svg>
                  <p className="block antialiased text-base leading-relaxed text-inherit font-medium capitalize">
                    {dashboardPage.name}
                  </p>
                </button>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mb-4 flex flex-col gap-1">
          <li className="mx-3.5 mt-4 mb-2">
            <p className="block antialiased text-sm leading-normal text-white font-black uppercase opacity-75">
              auth
            </p>
          </li>
          <li>
            <form onSubmit={handleLogout}>
              <a className="" href="#">
                <button
                  className="middle none font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5 text-inherit"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="block antialiased text-base leading-relaxed text-inherit font-medium capitalize">
                    sign out
                  </p>
                </button>
              </a>
            </form>
          </li>
        </ul>
      </div>
    </aside>
  );
}
