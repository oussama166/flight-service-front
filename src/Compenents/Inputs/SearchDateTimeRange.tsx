import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
// Icons
// Icônes
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import StarIcon from "@mui/icons-material/Star";

// MUI Components
import { ArrowRightAlt, InfoOutline, Sync } from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import GenericToggle from "../Ui/GenericToggle";
import GenericSelect from "./GenericSelect";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

export default function SearchDateTimeRange() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);

  const [tripType, setTripType] = useState<string | number>("round_trip");

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

  const [dateType, setDateType] = useState("specific");

  // Configuration des options
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
    if (newRange?.from && newRange?.to) {
      setTimeout(() => handleClose(), 200);
    }
  };

  const open = Boolean(anchorEl);

  // Fonction pour générer les props de style identiques à SearchInput
  const getTextFieldProps = (fieldType: "from" | "to") => {
    const isActive = open && activeField === fieldType;

    return {
      InputProps: {
        readOnly: true,
        // 1. Le conteneur (exactement comme SearchInput)
        className: `
          !bg-slate-50 
          !border !border-slate-200 
          !rounded-xl 
          !transition-all 
          !cursor-pointer
          flex items-center text-sm
          !h-[71px]
          ${isActive ? "!ring-2 !ring-blue-500/20 !border-blue-500" : ""}
          hover:!bg-slate-100
        `,
        // 2. L'icône positionnée en absolu (comme dans SearchInput)
        endAdornment: (
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <EventIcon fontSize="small" />
          </div>
        ),
      },
      // 3. Suppression des bordures MUI
      sx: { "& .MuiOutlinedInput-notchedOutline": { border: "none" } },
      // 4. L'input lui-même (Padding left pour laisser la place à l'icône)
      inputProps: {
        className: `
          !pl-11 
          !py-3.5
          !truncate              
          !text-slate-900 
          !font-medium 
          placeholder:!text-slate-400
          w-full
          outline-none
          !cursor-pointer
        `,
      },
    };
  };

  return (
    <>
      <div className="relative group w-full">
        <label className="block text-xs text-left font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
          Departure
        </label>
        <TextField
          aria-label="from"
          onClick={(e) => handleClick(e, "from")}
          value={
            range?.from ? format(range.from, "dd/MM/yyyy", { locale: fr }) : ""
          }
          placeholder="Add Date"
          fullWidth
          {...getTextFieldProps("from")}
        />
      </div>

      <div className="relative group w-full">
        <label className="block text-xs text-left font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
          Return
        </label>
        <TextField
          onClick={(e) => handleClick(e, "to")}
          disabled={activeField === "from"}
          value={
            range?.to ? format(range.to, "dd/MM/yyyy", { locale: fr }) : ""
          }
          placeholder="Add Date"
          fullWidth
          {...getTextFieldProps("to")}
        />
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          className:
            "!rounded-xl !mt-1 !shadow-xl !border !border-slate-100 p-5",
        }}
      >
        {/* Header Data Ranger */}
        <div
          aria-label="Header Data Ranger"
          className="w-full flex justify-between items-center p-3 gap-x-5"
        >
          <GenericSelect
            value={tripType}
            onChange={setTripType}
            options={tripOptions}
            startIcon={<AirlineSeatReclineNormalIcon fontSize="small" />}
          />
          <div className="ml-auto">
            <GenericToggle
              value={dateType}
              onChange={setDateType}
              options={dateOptions}
              headerOff={true}
            />
          </div>
          <div>
            <div className="gap-x-1">
              <Chip label="$" variant="filled" color="success" />
              <Chip label="$$" variant="filled" color="warning" />
              <Chip label="$$$" variant="filled" color="error" />
            </div>
            <Tooltip title="Delete">
              <IconButton>
                <InfoOutline />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {/* Header Data Ranger */}
        <div className="p-3">
          {/* Data ranger */}
          <DayPicker
            mode="range"
            selected={range}
            numberOfMonths={2}
            onSelect={handleRangeSelect}
            locale={fr}
            min={1}
            defaultMonth={range?.from || new Date()}
            animate={true}
            modifiersClassNames={{
              selected: "bg-blue-600 text-white",
              range_start: "bg-blue-800 rounded-l-lg",
              range_end: "bg-blue-800 rounded-r-lg",
              range_middle: "!bg-blue-100 !text-blue-900",
              today: "text-blue-600 font-bold",
            }}
            styles={{
              caption: { color: "#0f172a" },
              head_cell: { color: "#64748b" },
              month_caption: { justifyContent: "center" },
            }}
          />
          {/* Data ranger */}
          {/* Footer data Ranger */}
          <footer aria-label="Footer Data Ranger"></footer>
          {/* Footer data Ranger */}
        </div>
      </Popover>
    </>
  );
}
