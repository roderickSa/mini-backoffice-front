"use server";

import { redirect } from "next/navigation";
import { HttpErrorResponse, HttpLoginResponse } from "../_types";
import axiosClient from "../_utils/axiosClient";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function loginAction(prevState: any, formData: FormData) {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await axiosClient.post<HttpLoginResponse>(
      "/auth/login",
      payload
    );
    const { data } = response;

    cookies().set("access_token", data.token.access_token);
  } catch (error) {
    return (error as HttpErrorResponse)?.response.data;
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard`);
}
