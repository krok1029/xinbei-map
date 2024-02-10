import ApiClient, { Method } from "@/api/api";
import { MapFactory } from "@/api/factory/mapFactory";
import { Geolocation, LocationList } from "@/api/model/Map";

const api = new ApiClient(
  "https://enterprise.oakmega.ai/api/v1/server/xinbei/"
);

const calcDistance = async (coords: { lat: number; lng: number }) => {
  const response = await api.request<LocationList>(
    Method.POST,
    "/calc-distance",
    coords
  );
  const result = MapFactory.toLocationList(response.data);
  return result;
};

const geolocationJson = async (data: string) => {
  const response = await api.request<Geolocation>(
    Method.GET,
    "/geolocation-json",
    {
      directory: data,
    }
  );
  const cood = MapFactory.toCoord(response.data);
  return cood;
};

export { calcDistance, geolocationJson };
