import axiosInstance from "../../../api/AxiosInstance";
import type { flightHeatMap } from "../Types/types";

export const fetchFlightHeatmap = async (
  departure: string,
  arrival: string
): Promise<flightHeatMap[]> => {
  const { data } = await axiosInstance.get("getHeatmap", {
    params: {
      departure, // results in ?departure=XYZ
      arrival, // results in &arrival=ABC
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};
