import {flexibleDateType} from "src/Types/FlexibaleDate/type";
import {add} from "date-fns";

export function completeMonthFlexibleDate(flexibleDate: flexibleDateType[]): flexibleDateType[] {
    if (!flexibleDate || flexibleDate.length === 0) return [];

    // ✅ Normalize endpoint data: missing hasValue → true (real data)
    const normalized = flexibleDate.map(dt => ({
        ...dt,
        hasValue: dt.hasValue ?? true,
    }));

    if (normalized.length > 11) return normalized;

    const restMonth = normalized.length;
    const lastItem = normalized[restMonth - 1];
    const lastMonth = parseInt(lastItem.month);
    const lastYear = parseInt(lastItem.year);

    const result: flexibleDateType[] = [...normalized];

    for (let i = 1; i <= (12 - restMonth); i++) {
        const date12 = add(new Date(lastYear, lastMonth - 1, 1), { months: i });

        result.push({
            rn: 0,
            price: 0,
            departureTime: "",
            airportDep: "",
            airDepName: "",
            airArrName: "",
            year: String(date12.getFullYear()),
            month: String(date12.getMonth() + 1).padStart(2, '0'),
            hasValue: false, // ✅ placeholder months → false
        });
    }

    return result;
}