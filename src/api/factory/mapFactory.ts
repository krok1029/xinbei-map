import { Geolocation, LocationList } from "@/api/model/Map";

export class MapFactory {
  static toCoord(data: Geolocation) {
    const coordinates = data.result.features.map(
      (feature) => feature.geometry.coordinates[0]
    );
    const coordinatesArray = coordinates.map((cood) =>
      cood.map((latLng) => ({ lng: latLng[0], lat: latLng[1] }))
    );
    return coordinatesArray;
  }

  static toLocationList(data: LocationList) {
    return data.result.map((item) => ({
      id: item.id,
      name: item.name,
      stopName: item.stop_name,
      distance: item.distance,
      lat: item.latitude,
      lng: item.longitude,
    }));
  }
}
