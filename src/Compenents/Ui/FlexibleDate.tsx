import { useEffect } from "react";
import { useAppSelector } from "../../App/hooks";
import { useFlexibleDate } from "../../Features/Flights/hooks/useFlexibaleDate";

export default function FlexibleDate() {
  // 1. Properly select values from Redux (avoid JSON.stringify)
  const fromAirport = useAppSelector((state) => state.swap.from);
  const toAirport = useAppSelector((state) => state.swap.to);

  // 2. Extract codes safely
  const departureCode = fromAirport?.code;
  const arrivalCode = toAirport?.code;
  const { data, isLoading } = useFlexibleDate(departureCode, arrivalCode);
  useEffect(() => {
    if (data) {
      console.log("Flexible date data:", data);
    }
  }, [data]);
  return (
    <div className="px-4">
      {isLoading ? <p>Loading flexible date data...</p> : <h1>hello world</h1>}
      <h1>Flexible dates are disabled</h1>
    </div>
  );
}
