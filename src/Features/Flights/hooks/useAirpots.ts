import { useQuery } from "@tanstack/react-query";
import { fetchAirports } from "../api/getAirports";

export const useAirports = () => {
  return useQuery({
    queryKey: ["getAirports"], 
    queryFn: fetchAirports,
  });
};
