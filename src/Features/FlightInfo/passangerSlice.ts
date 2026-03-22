// src/Features/Passenger/passengerSlice.ts
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {PassengerState, PassengerType} from "../../Types/Redux/type";
import {MAX_PASSENGERS} from "../../Types/Redux/type";

const initialState: PassengerState = {
    adult: 1,
    child: 0,
    infant: 0,
    total: 1,
};

const passengerSlice = createSlice({
    name: 'passenger',
    initialState,
    reducers: {
        increment(state, action: PayloadAction<PassengerType>) {
            if (state.total >= MAX_PASSENGERS) return; // ✅ max 9 guard
            state[action.payload] += 1;
            state.total += 1;
        },

        decrement(state, action: PayloadAction<PassengerType>) {
            const type = action.payload;
            if (state[type] <= 0) return; // ✅ can't go below 0
            if (type === 'adult' && state.adult <= 1) return; // ✅ min 1 adult
            state[type] -= 1;
            state.total -= 1;
        },

        reset(state) {
            state.adult = 1;
            state.child = 0;
            state.infant = 0;
            state.total = 1;
        },
    },
});

export const {increment, decrement, reset} = passengerSlice.actions;
export default passengerSlice.reducer;