export interface SwapState {
    isSwapped: boolean;
    from: string | null;
    to: string | null;
    middleSwaper: string | null;
}

export interface flightInfo {
    from: string | null;
    to: string | null;
    flightType: 'ROUND_TRIP' | 'ONE_WAY';
    flightClass: 'Economy' | 'FirstClass' | 'SecondClass';
}

export interface PassengerState {
    adult: number;
    child: number;
    infant: number;
    total: number;
}

export const MAX_PASSENGERS = 9;

export type PassengerType = 'adult' | 'child' | 'infant';