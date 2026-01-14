import { useQuery } from "@tanstack/react-query";
import { fetchAirports, fetchNearbyAirports } from "../api/getAirports";

export const useAirports = () => {
  return useQuery({
    queryKey: ["getAirports"],
    queryFn: fetchAirports,
  });
};
export const useNearbyAirports = (userCountry: string) => {
  return useQuery({
    queryKey: ["getNearbyAirports", userCountry],
    queryFn: () => fetchNearbyAirports(userCountry),
    enabled: !!userCountry,
  });
};
