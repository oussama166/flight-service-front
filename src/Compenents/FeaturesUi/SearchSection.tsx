import { FlightLand, FlightTakeoff } from "@mui/icons-material";
import Icon from "@mui/material/Icon";
import { type ChangeEvent, type FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { toggleSwap } from "../../Features/Swap/swap-slice";
import SearchDateTimeRange from "../Inputs/SearchDateTimeRange";
import SearchInput from "../Inputs/SearchInput";


type TripType = "ROUND_TRIP" | "ONE_WAY";

const SearchSection: FC = () => {
  const [tripType, setTripType] = useState<TripType>("ROUND_TRIP");

  const handleTripTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTripType(e.target.value as TripType);
  };

  const swaped = useAppSelector((state) => state.swap.isSwapped);
  const dispatch = useAppDispatch();


  return (
    <>
      {/*// <!-- Central Search Module -->*/}
      <div className="w-full bg-white rounded-2xl search-shadow p-6 md:p-8 mt-4 transition-all hover:shadow-2xl ring-1 ring-black/5">
        {/*// <!-- Search Options / Tabs -->*/}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex p-1 bg-slate-100 rounded-lg">
            <label className="cursor-pointer">
              <input
                value="ROUND_TRIP"
                checked={tripType === "ROUND_TRIP"}
                className="peer sr-only"
                name="tripType"
                type="radio"
                onChange={handleTripTypeChange}
              />

              <span className="block px-4 py-2 text-sm font-medium text-slate-500 rounded-md peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">
                Round trip
              </span>
            </label>
            <label className="cursor-pointer">
              <input
                value="ONE_WAY"
                checked={tripType === "ONE_WAY"}
                className="peer sr-only"
                name="tripType"
                type="radio"
                onChange={handleTripTypeChange}
              />
              <span className="block px-4 py-2 text-sm font-medium text-slate-500 rounded-md peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">
                One way
              </span>
            </label>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              <Icon baseClassName="material-symbols-outlined text-lg">
                group
              </Icon>
              1 Passenger
              <Icon baseClassName="material-symbols-outlined text-lg">
                expand_more
              </Icon>
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              <Icon baseClassName="material-symbols-outlined text-lg">
                chair
              </Icon>
              Economy
              <Icon baseClassName="material-symbols-outlined text-lg">
                expand_more
              </Icon>
            </button>
          </div>
        </div>
        {/*// <!-- Input Grid -->*/}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/*// <!-- Locations -->*/}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
            {/*// <!-- From -->*/}
            <div className="relative group">
              <label className="block text-xs text-left font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                From
              </label>
              <SearchInput
                icon={<FlightTakeoff fontSize="small" />}
                isFrom={true}
              />
            </div>
            {/*// <!-- Swap Button (Absolute centered on desktop) -->*/}
            <button
              aria-label="Swap locations"
              className="hidden sm:flex absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 size-8 bg-white border border-slate-200 rounded-full items-center justify-center text-primary shadow-sm hover:bg-slate-50 hover:scale-110 transition-all z-10 aria-checked:transition-transform aria-checked:rotate-180 aria-checked:delay-100 aria-checked:ease-in-out cursor-pointer"
              aria-checked={swaped}
              onClick={(e) => {
                let ariastate = e.currentTarget.getAttribute("aria-checked");
                ariastate = ariastate === "true" ? "false" : "true";
                e.currentTarget.setAttribute("aria-checked", ariastate);
                dispatch(toggleSwap());
              }}
            >
              <Icon baseClassName="material-symbols-outlined text-lg">
                swap_horiz
              </Icon>
            </button>
            {/*// <!-- To -->*/}
            <div className="relative group">
              <label className="block text-xs text-left font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                To
              </label>
              <SearchInput icon={<FlightLand fontSize="small" />} isTo={true} />
            </div>
          </div>
          {/*// <!-- Dates -->*/}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 relative min-h-f">
              <SearchDateTimeRange />
          </div>
          {/*// <!-- Search Button -->*/}
          <div className="md:col-span-2">
            <button className="w-full h-[52px] bg-accent-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              <span className="material-symbols-outlined">search</span>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSection;
