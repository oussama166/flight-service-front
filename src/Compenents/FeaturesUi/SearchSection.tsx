import {FlightLand, FlightTakeoff} from "@mui/icons-material";
import Icon from "@mui/material/Icon";
import {type ChangeEvent, type FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../App/hooks";
import {fromTakeoff, toggleSwap} from "../../Features/Swap/swap-slice";
import SearchDateTimeRange from "../Inputs/SearchDateTimeRange";
import SearchInput from "../Inputs/SearchInput";
import {Checkbox, FormControlLabel} from "@mui/material";
import {getLocation} from "../../Utils/locationUtils.ts";
import {useNearbyAirports} from "../../Features/Flights/hooks/useAirpots.ts";
import {useNearestHub} from "../../Hooks/useNearHub.ts";
import {setFlightType} from "@/Features/FlightInfo/flightSlice";
import PassengerDropdown from "@/Compenents/FeaturesUi/PassengerDropdown";


type TripType = "ROUND_TRIP" | "ONE_WAY";

const SearchSection: FC = () => {
    const swaped = useAppSelector((state) => state.swap.isSwapped);
    const dispatch = useAppDispatch();
    const tripType = useAppSelector((state) => state.flight.flightType);

    const [userLoc, setUserLoc] = useState<{ code: string; lat: number; long: number } | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const {data: airports} = useNearbyAirports(userLoc?.code as string);

    const handleTripTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFlightType(e.target.value as TripType));
    };

    const handleGetNearest = () => {
        setIsSearching(true);
        getLocation((data) => {
            if (data) setUserLoc(data);
            else setIsSearching(false);
        });
    };

    const bestHub = useNearestHub(airports, userLoc, isSearching, setIsSearching);

    useEffect(() => {
        if (bestHub) dispatch(fromTakeoff(bestHub));
    }, [bestHub]);

    return (
        <>
            <div
                className="w-full bg-white rounded-2xl search-shadow p-6 md:p-8 mt-4 transition-all hover:shadow-2xl ring-1 ring-black/5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    {/* Trip type tabs */}
                    <div className="flex p-1 bg-slate-100 rounded-lg">
                        <label className="cursor-pointer">
                            <input value="ROUND_TRIP" checked={tripType === "ROUND_TRIP"} className="peer sr-only"
                                   name="tripType" type="radio" onChange={handleTripTypeChange}/>
                            <span
                                className="block px-4 py-2 text-sm font-medium text-slate-500 rounded-md peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                Round trip
                            </span>
                        </label>
                        <label className="cursor-pointer">
                            <input value="ONE_WAY" checked={tripType === "ONE_WAY"} className="peer sr-only"
                                   name="tripType" type="radio" onChange={handleTripTypeChange}/>
                            <span
                                className="block px-4 py-2 text-sm font-medium text-slate-500 rounded-md peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                One way
                            </span>
                        </label>
                    </div>
                    <div className={"flex gap-x-4"}>
                    <PassengerDropdown/>
                    <button
                        className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
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

                {/* Input Grid — unchanged */}
                <div className="flex flex-col md:flex-row gap-4 items-end w-full">
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 gap-4 relative w-full transition-all duration-500 ease-in-out ${tripType === "ONE_WAY" ? "md:w-7/12" : "md:w-5/12"}`}>
                        <div className="relative group">
                            <label
                                className="block text-xs text-left font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">From</label>
                            <SearchInput icon={<FlightTakeoff fontSize="small"/>} isFrom={true}/>
                        </div>
                        <button
                            aria-label="Swap locations"
                            className="hidden sm:flex absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 size-8 bg-white border border-slate-200 rounded-full items-center justify-center text-primary shadow-sm hover:bg-slate-50 hover:scale-110 transition-all z-10 aria-checked:transition-transform aria-checked:rotate-180 cursor-pointer"
                            aria-checked={swaped}
                            onClick={(e) => {
                                let s = e.currentTarget.getAttribute("aria-checked");
                                e.currentTarget.setAttribute("aria-checked", s === "true" ? "false" : "true");
                                dispatch(toggleSwap());
                            }}
                        >
                            <Icon baseClassName="material-symbols-outlined text-lg">swap_horiz</Icon>
                        </button>
                        <div className="relative group">
                            <label
                                className="block text-xs text-left font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">To</label>
                            <SearchInput icon={<FlightLand fontSize="small"/>} isTo={true}/>
                        </div>
                    </div>

                    <div
                        className={`flex flex-col sm:flex-row relative w-full transition-all duration-500 ease-in-out ${tripType === "ONE_WAY" ? "md:w-3/12" : "md:w-5/12"}`}>
                        <SearchDateTimeRange typeDateTime={tripType === "ROUND_TRIP" ? "DateRange" : "DateSolo"}/>
                    </div>

                    <div className="w-full md:w-2/12">
                        <button
                            className="w-full h-[52px] bg-accent-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                            <span className="material-symbols-outlined">search</span>
                            <span>Search</span>
                        </button>
                    </div>
                </div>

                <div className="inline-flex w-full p-2">
                    <FormControlLabel
                        label={isSearching ? "Searching..." : "Nearest Airports"}
                        slotProps={{typography: {className: "!text-xs !text-left !font-semibold !text-slate-500 !uppercase"}}}
                        control={
                            <Checkbox
                                checked={isSearching || !!userLoc}
                                size="small"
                                onClick={handleGetNearest}
                                indeterminate={isSearching}
                                className={isSearching ? "animate-pulse" : ""}
                            />
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default SearchSection;