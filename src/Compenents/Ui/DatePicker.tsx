import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DayPicker, type DateRange } from "react-day-picker";
import { CustomDayButtonContext } from "./CutomDayButton";

type DatePicker = {
  typeDateTime: "DateRange" | "DateSolo";
  range?: DateRange | undefined;
  time?: Date | undefined;
  handleRangeSelect: (range: DateRange | undefined) => void;
  handelSelect: (date: Date | undefined) => void;
  data: infoType | undefined;
  isLoadingData: boolean;
};
type infoType = {
  low: Date[];
  mid: Date[];
  high: Date[];
};

export default function DatePicker({
  typeDateTime,
  range,
  time,
  handleRangeSelect,
  handelSelect,
  data,
}: DatePicker) {
  return (
    <div className="p-4">
      <DayPicker
        mode={typeDateTime === "DateRange" ? "range" : "single"}
        selected={typeDateTime === "DateRange" ? range : time}
        numberOfMonths={2}
        onSelect={(data) => {
          if (typeDateTime === "DateRange") {
            handleRangeSelect(data);
          } else {
            handelSelect(data);
          }
        }}
        locale={enGB} // Using enGB to match the visual "M T W T F S S"
        disabled={{ before: new Date() }}
        formatters={{
          formatCaption: (date, options) => format(date, "LLLL", options),
          formatWeekdayName: (date, options) => format(date, "eeeee", options),
        }}
        min={1}
        animate
        defaultMonth={range?.from || new Date()}
        // Custom Categories
        modifiers={{
          lowPrice: data?.low || [],
          midPrice: data?.mid || [],
          highPrice: data?.high || [],
        }}
        components={{
          DayButton: (props) => <CustomDayButtonContext {...props} />,
        }}
        // Tailwind Styles
        modifiersClassNames={{
          // Only handle the "Bar" background here
          range_middle: "!bg-blue-50 !text-blue-900 !rounded-none",
          today: "text-blue-600 font-bold",
        }}
        classNames={{
          months: "w-full flex flex-row justify-between gap-10",
          month: "w-full space-y-4",
          day: "flex-row items-center justify-center",
          caption:
            "flex justify-center pt-1 relative items-center text-slate-900 font-bold text-xl",
          head_cell: "text-slate-400 font-medium text-xs w-10 pb-2",
          week: "w-full !my-4",
          month_caption: "w-full text-center font-bold text-lg",
          button_previous:
            "!absolute !left-[-850px] !left-1/2 !transform !-translate-y-1/3 cursor-pointer",
          button_next:
            "!absolute !right-0 !right-1/2 !transform !-translate-y-1/3 cursor-pointer",
        }}
        styles={{
          caption: { color: "#0f172a" },
          month_grid: { width: "100%" },
        }}
      />
    </div>
  );
}
