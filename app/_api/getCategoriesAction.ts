"use server";

import { HttpDataCategoryResponse, HttpErrorResponse } from "../_types";
import axiosClient from "../_utils/axiosClient";
import { cookies } from "next/headers";

export default async function getCategoriesAction() {
  const access_token = cookies().get("access_token");

  try {
    const response = await axiosClient.get<HttpDataCategoryResponse>(
      "/category",
      {
        headers: {
          Authorization: "Bearer " + access_token?.value,
        },
      }
    );
    const { data } = response;

    return { error: null, data: data.data };
  } catch (error) {
    if (
      (error as HttpErrorResponse).response?.status === 401 ||
      ["Unauthenticated", "Unauthorized"].includes(
        (error as HttpErrorResponse).response?.data.data.errors[0].message
      )
    ) {
      const message = (error as HttpErrorResponse).response?.data.data.errors[0]
        .message;

      return {
        error: { status: 401, message },
        data: [],
      };
    }

    return { error: { status: 400, message: "error" }, data: [] };
  }

  /* try {
    const response = await axiosClient.get<HttpDataCategoryResponse>("/category", {
      headers: {
        Authorization: "Bearers " + access_token?.value,
      },
    });
    const { data } = response;

    if (response.status !== 200) {
      return [];
    }

    return data.data;
  } catch (error) {
    if (
      (error as HttpErrorResponse).response?.status === 401 ||
      ["Unauthenticated", "Unauthorized"].includes(
        (error as HttpErrorResponse).response?.data.data.errors[0].message
      )
    ) {
      cookies().delete("access_token");
      redirect(`/login`);
    }

    return [];
  } */
}
