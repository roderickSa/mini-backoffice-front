import axios from "axios";

const BASE_URL_BACK = "http://localhost/api";

export default axios.create({
  baseURL: BASE_URL_BACK,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
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