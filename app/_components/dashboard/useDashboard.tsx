import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useDashboard() {
  const access_token = Cookies.get("access_token");
  const [token, setToken] = useState<string>(access_token || "");

  useEffect(() => {
    if (access_token) {
      setToken(access_token);
    }
  }, [access_token]);

  return { token };
}
