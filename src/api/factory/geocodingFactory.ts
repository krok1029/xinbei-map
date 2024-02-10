import { GeoCodingResponse } from "@/api/model/GeoCodingRes";

export class GeoCodingFactory {
  static toCoord(data: GeoCodingResponse) {
    return data.results[0].geometry.location;
  }
}
