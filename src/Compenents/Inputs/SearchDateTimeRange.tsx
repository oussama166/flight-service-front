import { format } from "date-fns";
import { enGB } from "date-fns/locale"; // Imported enGB to match the "M T W T F S S" look
import React, { useState } from "react";
import {
  type DateRange,
  DayButton,
  type DayButtonProps,
  DayPicker,
} from "react-day-picker";
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
import GenericToggle from "../Ui/GenericToggle";
import GenericSelect from "./GenericSelect";

// --- MOCK DATA FOR PRICE COLORS (To match the image) ---
// In a real app, fetch this from your API
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const lowPriceDays = [
  new Date(currentYear, currentMonth, 7),
  new Date(currentYear, currentMonth, 8),
  new Date(currentYear, currentMonth, 15),
  new Date(currentYear, currentMonth, 16),
  new Date(currentYear, currentMonth + 1, 6),
  new Date(currentYear, currentMonth + 1, 7),
];
const midPriceDays = [
  new Date(currentYear, currentMonth, 24),
  new Date(currentYear, currentMonth + 1, 1),
  new Date(currentYear, currentMonth + 1, 13),
];
const highPriceDays = [
  new Date(currentYear, currentMonth, 11),
  new Date(currentYear, currentMonth, 4),
  new Date(currentYear, currentMonth + 1, 11),
];

export default function SearchDateTimeRange() {
  const [range, setRange] = useState<DateRange | undefined>();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);

  const [tripType, setTripType] = useState<string | number>("round_trip");
  const [dateType, setDateType] = useState("specific");
  const CustomDayContent = (props: any) => {
    const { day, modifiers } = props;
    const dayDate = day.date; // This is the Date object
    const dayNumber = dayDate.getDate();

    // Determine the inner circle background based on modifiers
    let innerClass =
      "w-9 h-9 flex items-center justify-center rounded-full transition-all ";

    if (modifiers.lowPrice) {
      innerClass += " bg-teal-500 text-white font-medium";
    } else if (modifiers.midPrice) {
      innerClass += " bg-orange-400 text-white font-medium";
    } else if (modifiers.highPrice) {
      innerClass += " bg-rose-500 text-white font-medium";
    } else if (modifiers.selected) {
      innerClass += " bg-blue-600 text-white";
    }

    return (
      <button
        className={innerClass}
        onClick={() => console.log("Clicked day:", props)}
      >
        {dayNumber}
      </button>
    );
  };
  const CustomDayButtonContext = (props: DayButtonProps) => {
    const { day, modifiers, ...buttonProps } = props;

    // Accès au contexte si nécessaire (pour setRange par exemple)
    // const { onSelect } = useDayPicker();

    const dayNumber = day.date.getDate();

    // On utilise la MÊME logique de classes que votre première fonction
    let innerClass =
      "w-9 h-9 flex items-center justify-center rounded-full transition-all mx-auto my-1";

    if (modifiers.lowPrice) {
      innerClass += " bg-teal-500 text-white font-medium";
    } else if (modifiers.midPrice) {
      innerClass += " bg-orange-400 text-white font-medium";
    } else if (modifiers.highPrice) {
      innerClass += " bg-rose-500 text-white font-medium";
    } else if (modifiers.selected && !modifiers.range_middle) {
      innerClass += " bg-blue-600 text-white";
    }

    return (
      <DayButton
        {...buttonProps}
        day={day}
        modifiers={modifiers}
        className="p-0 border-none bg-transparent flex items-center justify-center w-full h-full group-data-selected/start:bg-blue-600 group-data-selected/end:bg-blue-600 group-data-selected/start:rounded-l-full group-data-selected/start:rounded-r-none group-data-selected/end:rounded-r-full group-data-selected:rounded-l-none "
      >
        <span className={innerClass}>{dayNumber}</span>
      </DayButton>
    );
  };

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
    field: "from" | "to"
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveField(field);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveField(null);
  };

  const handleRangeSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    // Removed auto-close timeout to allow user to click "Apply" in footer
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
      <div className="relative group w-full">
        {/* !TODO: Need to be refactor this  */}
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
        {/* !TODO: Need to be refactor this  */}
      </div>

      <div className="relative group w-full">
        <label className="block text-xs text-left font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
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
            "!rounded-xl !mt-2 !shadow-2xl !border !border-slate-100 overflow-hidden",
          style: {
            width: "890px",
            maxWidth: "890px",
            maxHeight: "500px",
            height: "500px",
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

          {/* 2. CALENDAR BODY */}
          <div className="p-4">
            <DayPicker
              mode="range"
              selected={range}
              numberOfMonths={2}
              onSelect={handleRangeSelect}
              locale={enGB} // Using enGB to match the visual "M T W T F S S"
              formatters={{
                formatCaption: (date, options) => format(date, "LLLL", options),
                formatWeekdayName: (date, options) =>
                  format(date, "eeeee", options),
              }}
              min={1}
              animate
              defaultMonth={range?.from || new Date()}
              // Custom Categories
              modifiers={{
                lowPrice: lowPriceDays,
                midPrice: midPriceDays,
                highPrice: highPriceDays,
              }}
              components={{
                DayButton: (props) => <CustomDayButtonContext {...props} />,
              }}
              // Tailwind Styles
              modifiersClassNames={{
                // selected:
                //   "bg-blue-600 text-white hover:bg-blue-600 rounded-full",
                range_start:
                  "bg-blue-800 text-white rounded-l-full rounded-r-none group/start", // Left rounded
                range_end:
                  "bg-blue-800 text-white rounded-r-full rounded-l-none group/end", // Right rounded
                range_middle: "!bg-blue-50 !text-blue-900 !rounded-none", // Middle square
                today: "text-blue-600 font-bold rounded-full",
              }}
              classNames={{
                months: "w-full flex flex-row justify-between gap-10",
                month: "w-full space-y-4",
                day: "flex-row items-center justify-center",
                caption:
                  "flex justify-center pt-1 relative items-center text-slate-900 font-bold text-lg",
                head_cell: "text-slate-400 font-medium text-xs w-10 pb-2",
                week: "w-full !my-4",
                month_caption: "w-full text-center",
              }}
              styles={{
                caption: { color: "#0f172a" },
                month_grid: { width: "100%" },
              }}
            />
          </div>

          {/* 3. FOOTER */}
          <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-white">
            {/* Left Text */}
            <span className="text-slate-500 text-sm font-medium">
              {range?.from && !range?.to
                ? "Select a return date"
                : "Prices include taxes and fees"}
            </span>

            {/* Apply Button */}
            <Button
              variant="contained"
              onClick={handleClose}
              disableElevation
              className="!bg-blue-600 !text-white !font-bold !text-sm !py-2 !px-6 !rounded-lg hover:!bg-blue-700 !capitalize"
            >
              Apply
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
}
