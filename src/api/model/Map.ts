export type Geolocation = {
  result: {
    type: string;
    name: string;
    crs: {
      type: string;
      properties: {
        name: string;
      };
    };
    features: Array<Feature>;
  };
};

type Feature = {
  type: string;
  properties: {
    TxtMemo: string;
    SHAPE_Area: number;
    "\u5206\u5340": string;
  };
  geometry: {
    type: string;
    coordinates: Array<Array<[number, number, number]>>;
  };
};

export type LocationList = {
  result: Array<Location>;
  tod: boolean;
};

type Location = {
  id: number;
  stop_name: string;
  name: string;
  longitude: number;
  latitude: number;
  radius: number;
  is_tod: number;
  distance: number;
};
