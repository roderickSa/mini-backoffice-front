"use server";

import { HttpItemCategoryResponse, HttpErrorResponse } from "../_types";
import axiosClient from "../_utils/axiosClient";
import { cookies } from "next/headers";

export default async function updateCategoryAction(
  prevState: any,
  formData: FormData
) {
  const access_token = cookies().get("access_token");
  const category_id = formData.get("id");
  const name = formData.get("name");
  const payload = { name };

  try {
    const response = await axiosClient.patch<HttpItemCategoryResponse>(
      "/category/" + category_id,
      payload,
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
        data: null,
      };
    }

    return { error: { status: 400, message: "error" }, data: null };
  }
}
