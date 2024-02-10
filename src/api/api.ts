import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export enum Method {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

class ApiClient {
  private instance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
      timeout: 3000,
    });
  }

  public async request<T>(
    method: Method,
    url: string,
    data: any = null,
    config?: AxiosRequestConfig<null>
  ): Promise<AxiosResponse<T>> {
    let response: AxiosResponse<T>;

    switch (method) {
      case Method.POST:
        response = await this.instance.post<T>(url, data, config);
        break;
      case Method.GET:
        response = await this.instance.get<T>(url, { params: data });
        break;
      case Method.DELETE:
        response = await this.instance.delete<T>(url, { params: data });
        break;
      case Method.PUT:
        response = await this.instance.put<T>(url, data);
        break;
      case Method.PATCH:
        response = await this.instance.patch<T>(url, data);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return response;
  }
}

export default ApiClient;
