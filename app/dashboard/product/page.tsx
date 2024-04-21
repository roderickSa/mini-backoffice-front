"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useDashboard from "@/app/_components/dashboard/useDashboard";
import useProduct from "@/app/_components/dashboard/product/useProduct";
import { useProductStore } from "@/app/_store/zustand";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import Product from "@/app/_components/dashboard/product/product";
import { HttpDataCategoryResponse, HttpErrorResponse } from "@/app/_types";

export default function ProductPage() {
  const { token, getUrlParam } = useDashboard();
  const { getProductsData } = useProduct();
  const { setCategories } = useProductStore();
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
    handleFirstChargeOfProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFirstChargeOfProducts = () => {
    const current_page = getUrlParam("page");

    if (current_page && !isNaN(parseInt(current_page))) {
      getProductsData("/product?page=" + current_page);
      return;
    }

    getProductsData();
  };

  return <Product />;
}
