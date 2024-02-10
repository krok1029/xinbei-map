import { Geolocation } from "@/api/model/Geolocation";

export class MapFactory {
  static toCood(data: Geolocation) {
    const coordinates = data.result.features.map(
      (feature) => feature.geometry.coordinates[0]
    );
    const aaaa = coordinates.map((cood) =>
      cood.map((latLng) => ({ lng: latLng[0], lat: latLng[1] }))
    );
    return aaaa;
  }
}
