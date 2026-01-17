// legacy importation
import whichPolygon from 'which-polygon';
// @ts-ignore
import {findNearestAirport} from 'airport-data-js';

// import
import countriesData from "../assets/Data/countries.json"; // Ton GeoJSON
import type {Airport} from "../Features/Flights/Types/types";


// Change your export to accept a callback
export const getLocation = (onSuccess: (data: { code: string; lat: number; long: number } | null) => void) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const userCord = getCountryFromCoords(pos.coords.latitude, pos.coords.longitude);
                onSuccess(userCord);
            },
            (err) => {
                console.error("Geolocation error:", err);
                onSuccess(null);
            },
            {enableHighAccuracy: true, timeout: 10000}
        );
    } else {
        console.error("Geolocation not supported");
        onSuccess(null);
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
        return {code: result.name, long: lng, lat: lat};
    }

    return null;
};


// Calculates distance in Kilometers
export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export const nearestAirport = async (
    {
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
        const distToPrev = getDistance(
            userLat,
            userLon,
            prev.latitude,
            prev.longitude,
        );
        const distToCurr = getDistance(
            userLat,
            userLon,
            curr.latitude,
            curr.longitude,
        );
        return distToCurr < distToPrev ? curr : prev;
    });

    // 2. Calculate the final distance for the log
    const finalDistance = getDistance(
        userLat,
        userLon,
        nearest.latitude,
        nearest.longitude,
    );

    // 3. Log the result
    console.log(
        `📍 Nearest Airport: ${nearest.name} (${nearest.id})\n` +
        `📏 Distance: ${finalDistance} km`
    );

    return nearest;
};



