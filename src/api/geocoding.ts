import ApiClient, { Method } from "@/api/api";
import { GeoCodingFactory } from "@/api/factory/geocodingFactory";
import { GeoCodingResponse } from "@/api/model/GeoCodingRes";

const apiKey: string = "AIzaSyAhI86MqliGUggc7m4ZtLWjGMvjGBeyN0w";

const api = new ApiClient("https://maps.googleapis.com/maps/api/geocode/json");

const geocoding = async (address: string) => {
  const { data } = await api.request<GeoCodingResponse>(Method.GET, "", {
    key: apiKey,
    address,
  });
  const result = GeoCodingFactory.toCoord(data);
  return result;
};

export { geocoding };
