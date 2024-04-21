import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useDashboard() {
  const access_token = Cookies.get("access_token");
  const [token, setToken] = useState<string>(access_token || "");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleStartCreateModel = () => {
    const params = new URLSearchParams(searchParams);
    params.set("action", "create");

    replace(`${pathname}?${params.toString()}`);
  };

  const handleCloseCreateModel = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("action");

    replace(`${pathname}?${params.toString()}`);
  };

  const handleStartEditModel = (model_id: number, type: string) => {
    const params = new URLSearchParams(searchParams);

    if (["category", "product"].includes(type)) {
      params.set("action", "edit");
      params.set(type + "_id", model_id.toString());

      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleCloseEditModel = (type: string) => {
    const params = new URLSearchParams(searchParams);

    if (["category", "product"].includes(type)) {
      params.delete("action");
      params.delete(type + "_id");

      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleSetUrlPagePagination = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  const getUrlParam = (key: string) => {
    const params = new URLSearchParams(searchParams);

    return params.get(key);
  };

  useEffect(() => {
    if (access_token) {
      setToken(access_token);
    }
  }, [access_token]);

  return {
    token,
    handleStartCreateModel,
    handleCloseCreateModel,
    handleStartEditModel,
    handleCloseEditModel,
    handleSetUrlPagePagination,
    getUrlParam,
  };
}
