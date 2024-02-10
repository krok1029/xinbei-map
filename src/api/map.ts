import ApiClient, { Method } from "@/api/api";
import { MapFactory } from "@/api/factory/mapFactory";
import { Geolocation } from "@/api/model/Geolocation";

const api = new ApiClient(
  "https://enterprise.oakmega.ai/api/v1/server/xinbei/"
);

const calcDistance = async (coords: { lat: number; lng: number }) => {
  const response = await api.request(Method.POST, "/calc-distance", coords);
  return response;
};

const geolocationJson = async (data: string) => {
  const response = await api.request<Geolocation>(
    Method.GET,
    "/geolocation-json",
    {
      directory: data,
    }
  );
  const cood = MapFactory.toCood(response.data);
  return cood;
};

export { calcDistance, geolocationJson };
