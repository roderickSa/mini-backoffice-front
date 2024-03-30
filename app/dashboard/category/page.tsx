"use client";

import getCategoriesAction from "@/app/_api/getCategoriesAction";
import CategoryTable from "@/app/_components/dashboard/category/categoryTable";
import { CategoryType } from "@/app/_types";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCategoriesData = async () => {
      const categoriesAction = await getCategoriesAction();
      const { error, data } = categoriesAction;

      if (error?.status === 401) {
        Cookies.remove("access_token");
        router.push("/login");
        return;
      }

      setCategories(data);
    };

    getCategoriesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CategoryTable categories={categories} />;
}
