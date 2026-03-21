import axiosInstance from "../../../api/AxiosInstance";

export const fetchFlexibleDate = async (
  departureCode: string,
  arrivalCode: string,
) => {
  const { data  } = await axiosInstance.get("getFlightsByMonthPrice", {
    params: {
      fromCode: departureCode,
      toCode: !arrivalCode ? "" : arrivalCode,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};
