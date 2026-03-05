import { useQuery } from "@tanstack/react-query";
import { fetchFlexibleDate } from "../api/getFlexibleDate";

export const useFlexibleDate = (departureCode: string, arrivalCode: string) => {
  return useQuery({
    queryKey: ["flexibleDate", departureCode, arrivalCode],
    queryFn: () => fetchFlexibleDate(departureCode, arrivalCode),
    enabled: Boolean(departureCode),
    staleTime: 1000 * 60 * 10
  });
};
