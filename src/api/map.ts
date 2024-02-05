import api, { Method } from "./api";

const calcDistance = async (coords: { lat: number; lng: number }) => {
  const response = await api(Method.POST, "/calc-distance", coords);
  return response;
};

const geolocationJson = async (data: string) => {
  console.log(data);
  const response = await api(Method.GET, "/geolocation-json", {
    directory: data,
  });
  console.log("response", response);
  return response;
};

export { calcDistance, geolocationJson };
