export type flexibleDateType = {
    rn: number;
    price: number;
    departureTime: string;
    airportDep: string;
    airDepName: string;
    airArrName: string;
    year: string;
    month: string;
    hasValue?: boolean;
}

export const flexibleDateDefaults: Partial<flexibleDateType> = {
    hasValue: true,
};

export function createFlexibleDate(data: Omit<flexibleDateType, 'hasValue'> & Partial<Pick<flexibleDateType, 'hasValue'>>): flexibleDateType {
    return {
        ...flexibleDateDefaults,
        ...data,
        hasValue: data.hasValue ?? true,
    };
}