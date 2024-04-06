import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL_BACK = "http://localhost/api";

const access_token = Cookies.get("access_token");

export default axios.create({
  baseURL: BASE_URL_BACK,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});

export const axioxFrontClient = axios.create({
  baseURL: BASE_URL_BACK,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + access_token,
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});
