import { format } from "date-fns";
import { enGB } from "date-fns/locale"; // Imported enGB to match the "M T W T F S S" look
import React, { useState } from "react";
import { type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Icons
import { ArrowRightAlt, InfoOutline, Sync } from "@mui/icons-material";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import EventIcon from "@mui/icons-material/Event";
import StarIcon from "@mui/icons-material/Star";

// MUI Components
import Button from "@mui/material/Button"; // Added for Footer
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

// Custom Components
import { useAppSelector } from "../../App/hooks";
import { useFlightHeatmap } from "../../Features/Flights/hooks/useFlightHeatMap";
import DatePicker from "../Ui/DatePicker";
import GenericToggle from "../Ui/GenericToggle";
import GenericSelect from "./GenericSelect";
import FlexibleDate from "../Ui/FlexibleDate";

export default function SearchDateTimeRange({
  typeDateTime,
}: {
  typeDateTime: "DateRange" | "DateSolo";
}) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [time, setTime] = useState<Date | undefined>();

  // 1. Properly select values from Redux (avoid JSON.stringify)
  const fromAirport = useAppSelector((state) => state.swap.from);
  const toAirport = useAppSelector((state) => state.swap.to);

  // 2. Extract codes safely
  const departureCode = fromAirport?.code;
  const arrivalCode = toAirport?.code;

  // 3. The hook now waits until both codes are present via 'enabled'
  const { data, isLoading } = useFlightHeatmap(departureCode, arrivalCode);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);

  const [tripType, setTripType] = useState<string | number>("round_trip");
  const [dateType, setDateType] = useState("specific");

  const tripOptions = [
    {
      value: "round_trip",
      label: "Round Trip",
      icon: <Sync fontSize="small" />,
    },
    {
      value: "one_way",
      label: "One Way",
      icon: <ArrowRightAlt fontSize="small" />,
    },
    {
      value: "multi_city",
      label: "Multi-City",
      icon: <StarIcon fontSize="small" />,
    },
  ];

  const dateOptions = [
    { value: "specific", label: "Specific Dates" },
    { value: "flexible", label: "Flexible Dates" },
  ];

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    field: "from" | "to",
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveField(field);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveField(null);
  };
  const handleCancel = () => {
    setRange(undefined); // Revert to the backup
    handleClose(); // Close the popover
  };

  const handleRangeSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    console.log("Selected range:", newRange);
  };
  const handelSelect = (newSelectDate: Date | undefined) => {
    setTime(newSelectDate);
  };

  const open = Boolean(anchorEl);

  const getTextFieldProps = (fieldType: "from" | "to") => {
    const isActive = open && activeField === fieldType;
    return {
      InputProps: {
        readOnly: true,
        className: `
          !bg-slate-50 !border !border-slate-200 !rounded-xl !transition-all !cursor-pointer 
          flex items-center text-sm !h-[71px]
          ${isActive ? "!ring-2 !ring-blue-500/20 !border-blue-500" : ""}
          hover:!bg-slate-100
        `,
        endAdornment: (
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <EventIcon fontSize="small" />
          </div>
        ),
      },
      sx: { "& .MuiOutlinedInput-notchedOutline": { border: "none" } },
      inputProps: {
        className: `!pl-11 !py-3.5 !truncate !text-slate-900 !font-medium placeholder:!text-slate-400 w-full outline-none !cursor-pointer`,
      },
    };
  };

  return (
    <>
      {/* --- INPUTS --- */}
      <div className="relative group w-full flex-1 transition-all duration-500 ease-in-out">
        <label className="block text-xs text-left font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
          Departure
        </label>
        <TextField
          aria-label="from"
          onClick={(e) => handleClick(e, "from")}
          value={
            range?.from
              ? format(range.from, "dd/MM/yyyy", { locale: enGB })
              : ""
          }
          placeholder="Add Date"
          fullWidth
          {...getTextFieldProps("from")}
        />
      </div>

      <div
        className={`
        relative group transition-all duration-500 ease-in-out overflow-hidden
        ${
          typeDateTime === "DateSolo"
            ? "w-0 opacity-0 pl-0"
            : "w-full sm:w-1/2 opacity-100 pl-4"
        }
    `}
      >
        {/* Inner container with min-width ensures text doesn't squish while animating */}
        <div className="min-w-[150px]">
          <label className="block text-xs text-left font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 whitespace-nowrap">
            Return
          </label>
          <TextField
            onClick={(e) => handleClick(e, "to")}
            disabled={activeField === "from"}
            value={
              range?.to ? format(range.to, "dd/MM/yyyy", { locale: enGB }) : ""
            }
            placeholder="Add Date"
            fullWidth
            {...getTextFieldProps("to")}
          />
        </div>
      </div>

      {/* --- POPOVER --- */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        marginThreshold={null}
        PaperProps={{
          className:
            "!h-auto !rounded-xl !mt-2 !shadow-2xl !border !border-slate-100 overflow-y-auto transition-all ease-in-out",
          style: {
            width: "890px",
            maxWidth: "890px",
            maxHeight: "600px",
            minHeight: "500px",
          }, // Adjusted width strategy
        }}
      >
        <div className="flex flex-col bg-white">
          {/* 1. HEADER */}
          <div
            aria-label="Header Data Ranger"
            className="w-full flex justify-between items-center p-4 gap-x-6 border-b border-slate-100"
          >
            {/* Trip Type Select */}
            <div className="w-40">
              <GenericSelect
                value={tripType}
                onChange={setTripType}
                options={tripOptions}
                startIcon={<AirlineSeatReclineNormalIcon fontSize="small" />}
              />
            </div>

            {/* Toggle (Centered) */}
            <div className="flex-1 flex justify-center">
              <div className="bg-slate-100 p-1 rounded-lg">
                <GenericToggle
                  value={dateType}
                  onChange={setDateType}
                  options={dateOptions}
                  headerOff={true}
                />
              </div>
            </div>

            {/* Price Legend */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {/* Custom Squares imitating chips but matching the image style */}
                <div className="w-8 h-8 rounded bg-teal-500 text-white flex items-center justify-center text-xs font-bold">
                  £
                </div>
                <div className="w-8 h-8 rounded bg-orange-400 text-white flex items-center justify-center text-xs font-bold">
                  ££
                </div>
                <div className="w-8 h-8 rounded bg-rose-500 text-white flex items-center justify-center text-xs font-bold">
                  £££
                </div>
              </div>
              <Tooltip title="Price estimates">
                <IconButton size="small">
                  <InfoOutline fontSize="small" className="text-slate-400" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* In cas where the flexDate is false  */}
          {dateType == "specific" ? (
            <DatePicker
              typeDateTime="DateRange"
              range={range}
              time={time}
              handleRangeSelect={handleRangeSelect}
              handelSelect={handelSelect}
              data={data}
            />
          ) : (
            <FlexibleDate />
          )}
          {/* 2. CALENDAR BODY */}

          {/* 3. FOOTER */}
          <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-white">
            {/* Left Text */}
            <span className="text-slate-500 text-sm font-medium">
              {range?.from && !range?.to
                ? "Select a return date"
                : "Prices include taxes and fees"}
            </span>

            <div className="inline-flex gap-x-5">
              <Button
                variant="outlined"
                className=" !font-bold !text-sm !py-2 !px-6 !rounded-lg !capitalize"
                disableElevation
                onClick={handleCancel}
              >
                Cancel
              </Button>
              {/* Apply Button */}
              <Button
                variant="contained"
                onClick={handleClose}
                disableElevation
                className="!bg-blue-600 !text-white !font-bold !text-sm !py-2 !px-6 !rounded-lg> hover:!bg-blue-700 !capitalize"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
}
