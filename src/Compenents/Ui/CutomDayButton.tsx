import { DayButton, type DayButtonProps } from "react-day-picker";

export const CustomDayButtonContext = (props: DayButtonProps) => {
  const { day, modifiers, ...buttonProps } = props;
  const dayNumber = day.date.getDate();

  // Mapping modifiers to booleans
  const isSelected = !!modifiers.selected;
  const isStart = !!modifiers.range_start;
  const isEnd = !!modifiers.range_end;
  const isMiddle = !!modifiers.range_middle;

  // Logic for the inner circle
  let innerClass =
    "w-9 h-9 flex items-center justify-center rounded-full transition-all mx-auto my-1";

  // These tell the span to turn blue if the Parent has the matching data-attribute
  const selectionOverrides =
    " group-data-[selected]/day:!bg-blue-800 group-data-[start]/day:!bg-blue-800 group-data-[end]/day:!bg-blue-600 group-data-[middle]/day:!bg-blue-50";

  if (modifiers.lowPrice) {
    innerClass += ` bg-teal-500 text-white font-medium${selectionOverrides}`;
  } else if (modifiers.midPrice) {
    innerClass += ` bg-orange-400 text-white font-medium${selectionOverrides}`;
  } else if (modifiers.highPrice) {
    innerClass += ` bg-rose-500 text-white font-medium${selectionOverrides}`;
  } else if (isSelected && !isMiddle) {
    innerClass += ` bg-blue-600 text-white rounded-none${selectionOverrides}`;
  }

  return (
    <DayButton
      {...buttonProps}
      day={day}
      modifiers={modifiers}
      // Pass the group name and the data-attributes Tailwind is looking for
      className={`
        p-0 border-none flex items-center justify-center w-full h-full relative
        group/day
        ${isStart ? "bg-blue-800 !rounded-l-full" : ""}
        ${isEnd ? "bg-blue-800 !rounded-r-full" : ""}
        ${isMiddle ? "bg-blue-50" : ""}
      `}
      // These are REQUIRED for group-data-[xxx] to work
      data-selected={isSelected || undefined}
      data-start={isStart || undefined}
      data-end={isEnd || undefined}
      data-middle={isMiddle || undefined}
    >
      <span className={innerClass}>{dayNumber}</span>
    </DayButton>
  );
};
