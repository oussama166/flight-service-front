import type { Airport } from "../Types/types";
// import axiosInstance from "../../../api/AxiosInstance";
import axiosInstance from "@/api/AxiosInstance";

export const fetchAirports = async (): Promise<Airport[]> => {
  const { data } = await axiosInstance.get("getAirports");
  return data;
};

export const fetchNearbyAirports = async (countryCode: string): Promise<Airport[]> => {
  const { data } = await axiosInstance.get(
    `getAirportsByCountry/${countryCode}`
  );
  return data;
};
