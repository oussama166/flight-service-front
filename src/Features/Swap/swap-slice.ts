// DUCKS pattern
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {SwapState} from '../../Types/Redux/type';


const initialState: SwapState = {
    isSwapped: false,
    from: null,
    to: null,
    middleSwaper: "",
};

const swapSlice = createSlice({
    name: "swapLogic",
    initialState,
    reducers: {
        // We will need the action for the amount data comming from the ui
        toggleSwap: (state) => {
            state.isSwapped = !state.isSwapped;
            state.middleSwaper = state.from;
            state.from = state.to;
            state.to = state.middleSwaper;
        },
        fromTakeoff: (state, action: PayloadAction<string>) => {
            state.from = action.payload;
        },
        toLandOff: (state, action: PayloadAction<string>) => {
            state.to = action.payload;
        },
    },
});

export const {toggleSwap, fromTakeoff, toLandOff} = swapSlice.actions;
export default swapSlice.reducer;
