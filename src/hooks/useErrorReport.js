import axios from "axios";

export const useErrorReport = () => {
  const errorReport = (error, url, request, method) => {
    const err = `url: ${url}, request from: ${request}, method: [${method.toUpperCase()}], error: ${error}`;
    axios.post("/api/system/error", { err });
  };

  return errorReport;
};
