"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useDashboard from "@/app/_components/dashboard/useDashboard";
import { useCategoryStore } from "@/app/_store/zustand";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import { HttpDataCategoryResponse, HttpErrorResponse } from "@/app/_types";
import CategoryTable from "@/app/_components/dashboard/category/categoryTable";

export default function CategoryPage() {
  const { token } = useDashboard();
  const { setCategories } = useCategoryStore();
  const router = useRouter();

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const response = await axioxFrontClient(
          token
        ).get<HttpDataCategoryResponse>("/category");
        const { data } = response;

        setCategories(data.data);
      } catch (error) {
        if (
          (error as HttpErrorResponse).response?.status === 401 ||
          ["Unauthenticated", "Unauthorized"].includes(
            (error as HttpErrorResponse).response?.data.data.errors[0].message
          )
        ) {
          const message = (error as HttpErrorResponse).response?.data.data
            .errors[0].message;

          Cookies.remove("access_token");
          router.push("/login");
          return;
        }

        console.log(error);
      }
    };

    getCategoriesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CategoryTable />;
}
