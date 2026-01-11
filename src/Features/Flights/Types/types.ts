/**
 * 
 * 
 * {
    "code": "UTK",
    "location": "Utirik Island",
    "country": "Marshall Islands",
    "name": "Utirik Airport",
    "longitude": 169.852005,
    "latitude": 11.222
  }
 */
export type Airport = {
  code: string;
  location: string;
  country: string;
  name: string;
  longitude: number;
  latitude: number;
};

export type flightHeatMap = {
  getFlightDate: Date;
  getMinPriceL: number;
  getPriceCategory: "LOW" | "AVG" | "HIGH";
};
