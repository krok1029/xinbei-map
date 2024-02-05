import axios, { AxiosRequestConfig } from "axios";

export enum Method {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

const instance = axios.create({
  baseURL: "https://enterprise.oakmega.ai/api/v1/server/xinbei/",
  headers: { "Content-Type": "application/json" },
  timeout: 3000,
});

const api = (
  method: Method,
  url: string,
  data: any = null,
  config?: AxiosRequestConfig<null>
) => {
  switch (method) {
    case Method.POST:
      return instance.post(url, data, config);
    case Method.GET:
      return instance.get(url, { params: data });
    case Method.DELETE:
      return instance.delete(url, { params: data });
    case Method.PUT:
      return instance.put(url, data);
    case Method.PATCH:
      return instance.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
};
export default api;
