import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useDashboard from "../useDashboard";
import { useProductStore } from "@/app/_store/zustand";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import { HttpDataProductResponse, HttpErrorResponse } from "@/app/_types";

export default function useProduct() {
  const { token } = useDashboard();
  const { setProducts, setMetaProducts } = useProductStore();
  const router = useRouter();

  const getProductsData = async (url_page?: string) => {
    const url = url_page || "/product";
    try {
      const response = await axioxFrontClient(
        token
      ).get<HttpDataProductResponse>(url);
      const { data } = response;

      setProducts(data.data);
      setMetaProducts(data.meta);
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
  return { getProductsData };
}
