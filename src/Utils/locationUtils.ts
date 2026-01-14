import whichPolygon from "which-polygon";
import countriesData from "../assets/Data/countries.json"; // Ton GeoJSON
import type { Airport } from "../Features/Flights/Types/types";

// Change your export to accept a callback
export const getLocation = (onSuccess: CallableFunction) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        onSuccess(
          getCountryFromCoords(pos.coords.latitude, pos.coords.longitude)
        ),
      (err) => console.log(err),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }
};

export const getCountryFromCoords = (lat: number, lng: number) => {
  const featureCollection = {
    ...countriesData,
    features: countriesData.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        code: feature.id,
      },
    })),
  };
  const query = whichPolygon(featureCollection);
  const result = query([lng, lat]);

  if (result) {
    return { code: result.name, long: lng, lat: lat };
  }

  return null;
};

// geoUtils.js

const airportsMar = [
  {
    id: 1092,
    code: "OZG",
    latitude: 30.3202991486,
    location: "Zagora",
    longitude: -5.8666701317,
    name: "Zagora Airport",
    country: "Morocco",
  },
  {
    id: 1093,
    code: "GMD",
    latitude: 33.655399,
    location: "Ben Slimane",
    longitude: -7.22145,
    name: "Ben Slimane Airport",
    country: "Morocco",
  },
  {
    id: 1094,
    code: "BEM",
    latitude: 32.401895,
    location: "Beni Mellal",
    longitude: -6.315905,
    name: "Beni Mellal Airport",
    country: "Morocco",
  },
  {
    id: 1095,
    code: "SII",
    latitude: 29.3666992188,
    location: "Sidi Ifni",
    longitude: -10.1878004074,
    name: "Sidi Ifni Xx Airport",
    country: "Morocco",
  },
  {
    id: 1096,
    code: "ESU",
    latitude: 31.3974990845,
    location: "Essaouira",
    longitude: -9.6816701889,
    name: "Mogador Airport",
    country: "Morocco",
  },
  {
    id: 1097,
    code: "CMN",
    latitude: 33.3675003052,
    location: "Casablanca",
    longitude: -7.5899701118,
    name: "Mohammed V International Airport",
    country: "Morocco",
  },
  {
    id: 1098,
    code: "SFI",
    latitude: 32.2832984924,
    location: "Safi",
    longitude: -9.2333297729,
    name: "Safi Airport",
    country: "Morocco",
  },
  {
    id: 2581,
    code: "GLN",
    latitude: 29.0266990662,
    location: "Goulimime",
    longitude: -10.0502996445,
    name: "Goulimime Airport",
    country: "Morocco",
  },
  {
    id: 3802,
    code: "TFY",
    latitude: 27.9487,
    location: "Tarfaya",
    longitude: -12.9166,
    name: "Tarfaya Airport",
    country: "Morocco",
  },
];

// Calculates distance in Kilometers
export const getDistance = ({
  lat1,
  lon1,
  lat2,
  lon2,
}: {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  console.log(`📏 Distance: ${R * c} km`);
  
  return R * c;
};

export const findNearestAirport = ({
  userLat,
  userLon,
  airports,
}: {
  userLat: number;
  userLon: number;
  airports: Airport[];
}) => {
  if (!airports || airports.length === 0) return null;

  // 1. Find the nearest airport object
  const nearest = airports.reduce((prev, curr) => {
    const distToPrev = getDistance({
      lat1: userLat,
      lon1: userLon,
      lat2: prev.latitude,
      lon2: prev.longitude,
    });
    const distToCurr = getDistance({
      lat1: userLat,
      lon1: userLon,
      lat2: curr.latitude,
      lon2: curr.longitude,
    });
    return distToCurr < distToPrev ? curr : prev;
  });

  // 2. Calculate the final distance for the log
  const finalDistance = getDistance({
    lat1: userLat,
    lon1: userLon,
    lat2: nearest.latitude,
    lon2: nearest.longitude,
  });

  // 3. Log the result
  console.log(
    `📍 Nearest Airport: ${nearest.name} (${nearest.id})\n` +
      `📏 Distance: ${finalDistance.toFixed(2)} km`
  );

  return nearest;
};

console.log(
  findNearestAirport({
    userLat: 33.615712460143094,
    userLon: -7.484204613124662,
    airports: airportsMar,
  })
);
