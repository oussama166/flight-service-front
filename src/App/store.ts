import {configureStore} from "@reduxjs/toolkit";


import swapReducer from "@/Features/Swap/swap-slice";

import flightReducer from "@/Features/FlightInfo/flightSlice";

import passengerReducer from "@/Features/FlightInfo/passangerSlice";

export const store = configureStore({
    reducer: {
        swap: swapReducer,
        flight: flightReducer,
        passenger: passengerReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;