import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { useAirports } from "../../Features/Flights/hooks/useAirpots";
import { fromTakeoff, toLandOff } from "../../Features/Swap/swap-slice";

const filterOptions = createFilterOptions({
  matchFrom: "any",
  limit: 10,
  stringify: (option: any) => {
    // console.log("🚀 ~ $:", option.location, "");
    return `${option.location} ${option.name} ${option.code} ${option.country}`;
  },
});

// const airports: Airport[] = [
//   {
//     code: "UTK",
//     location: "Utirik Island",
//     country: "Marshall Islands",
//     name: "Utirik Airport",
//     longitude: 169.852005,
//     latitude: 11.222,
//   },
//   {
//     code: "OCA",
//     location: "Key Largo",
//     country: "United States",
//     name: "Ocean Reef Club Airport",
//     longitude: -80.2748031616,
//     latitude: 25.3253993988,
//   },
//   {
//     code: "PQS",
//     location: "Pilot Station",
//     country: "United States",
//     name: "Pilot Station Airport",
//     longitude: -162.899994,
//     latitude: 61.934601,
//   },
//   {
//     code: "CSE",
//     location: "Crested Butte",
//     country: "United States",
//     name: "Crested Butte Airpark",
//     longitude: -106.928341,
//     latitude: 38.851918,
//   },
// ];
export default function SearchInput({ icon, isFrom, isTo }: any) {
  const fromCt = useAppSelector((state) => state.swap.from);
  const toCt = useAppSelector((state) => state.swap.to);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useAirports();

  return (
    <Autocomplete
      popupIcon={null}
      clearIcon={null}
      filterOptions={filterOptions}
      componentsProps={{
        popper: {
          placement: "bottom-start", // Tell it to prefer bottom
          modifiers: [
            {
              name: "flip",
              enabled: false, // Disable the automatic flip to top
            },
          ],
        },
      }}
      options={data || []}
      loading={isLoading}
      getOptionLabel={(option) => `${option.location} (${option.code})`}
      value={isFrom ? fromCt : toCt}
      onChange={(event, newValue: any) => {
        if (isFrom) {
          dispatch(fromTakeoff(newValue));
        } else {
          dispatch(toLandOff(newValue));
        }
      }}
      renderOption={(props, option, { inputValue }) => {
        const { key, ...optionProps } = props;

        // 1. Calculate matches based on Airport Name
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <li
            key={key}
            {...optionProps}
            className="flex justify-between items-center p-3 hover:bg-slate-50 border-b border-slate-100 cursor-pointer"
          >
            <div className="flex flex-col">
              {/* City stays static (no highlight loop here) */}
              <span className="font-semibold text-slate-800">
                {option.location}
              </span>

              {/* Country • Airport Name (Highlight loop goes HERE) */}
              <span className="text-xs text-slate-500">
                {option.country} •{" "}
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                      color: part.highlight ? "#fde047" : "inherit",
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </span>
            </div>

            {/* Code stays static */}
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
              {option.code}
            </span>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="City or Airport"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
          InputProps={{
            ...params.InputProps,
            className: `
              !bg-slate-50 
              !border !border-slate-200 
              !rounded-xl 
              !transition-all 
              focus-within:!ring-2 focus-within:!ring-blue-500/20 focus-within:!border-blue-500
              flex items-center text-sm
            `,
            endAdornment: (
              <div className="absolute left-4 text-slate-400">{icon}</div>
            ),
          }}
          inputProps={{
            ...params.inputProps,
            className: `
              !py-3.5 
              !pl-11 
              !truncate              
              !text-slate-900 
              !font-medium 
              placeholder:!text-slate-400
              w-full
              outline-none
            `,
          }}
        />
      )}
    />
  );
}
