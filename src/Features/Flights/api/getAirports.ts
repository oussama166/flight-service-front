import type { Airport } from "../Types/types";
import axiosInstance from "../../../api/AxiosInstance";


  export const fetchAirports = async (): Promise<Airport[]> => {
    const { data } = await axiosInstance.get("getAirports");
    return data;
  };
