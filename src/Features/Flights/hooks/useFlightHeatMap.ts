import { useQuery } from "@tanstack/react-query"
import { fetchFlightHeatmap } from "../api/getHeatMapFlights";
import { parseISO } from "date-fns";

// src/features/flights/hooks/useHeatmap.ts
export const useFlightHeatmap = (departure: string, destination: string) => {
  return useQuery({
    // Cache is unique to this specific pair of airports
    queryKey: ["flightHeatmap", departure, destination],
    queryFn: () => fetchFlightHeatmap(departure, destination ? destination : ""),
    // The query will NOT run unless BOTH variables are truthy (not empty/undefined)
    enabled: Boolean(departure),
    staleTime: 1000 * 60 * 10, // Cache for 10 mins
    select: (rawData: any[]) => {
      // Initialize the categories
      const low: Date[] = [];
      const mid: Date[] = [];
      const high: Date[] = [];

      rawData.forEach((item) => {
        // Convert the string "2026-01-16" into a real JS Date object
        const date = parseISO(item.flightDate);

        if (item.priceCategory === "LOW") low.push(date);
        else if (item.priceCategory === "AVG") mid.push(date);
        else if (item.priceCategory === "HIGH") high.push(date);
      });

      return { low, mid, high };
    },
  });
};