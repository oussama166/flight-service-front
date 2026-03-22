// src/Features/Flight/flightSlice.ts
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { flightInfo } from "../../Types/Redux/type";

interface FlightState {
    flightType: flightInfo['flightType'];
    flightClass: flightInfo['flightClass'];
}

const initialState: FlightState = {
    flightType: 'ONE_WAY',
    flightClass: 'Economy',
};

const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        setFlightType(state, action: PayloadAction<flightInfo['flightType']>) {
            state.flightType = action.payload;
        },
        setFlightClass(state, action: PayloadAction<flightInfo['flightClass']>) {
            state.flightClass = action.payload;
        },
    },
});

export const { setFlightType, setFlightClass } = flightSlice.actions;
export default flightSlice.reducer;