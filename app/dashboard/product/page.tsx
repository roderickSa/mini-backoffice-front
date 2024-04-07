"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useDashboard from "@/app/_components/dashboard/useDashboard";
import { useProductStore } from "@/app/_store/zustand";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import Product from "@/app/_components/dashboard/product/product";
import {
  HttpDataCategoryResponse,
  HttpDataProductResponse,
  HttpErrorResponse,
} from "@/app/_types";

export default function ProductPage() {
  const { token } = useDashboard();
  const { setProducts, setCategories } = useProductStore();
  const router = useRouter();

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const response = await axioxFrontClient(
          token
        ).get<HttpDataProductResponse>("/product");
        const { data } = response;

        setProducts(data.data);
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

    getProductsData();
    getCategoriesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Product />;
}
