// DUCKS pattern
import { createSlice } from "@reduxjs/toolkit";

interface SwapState {
  isSwapped: boolean;
  from: string;
  to: string;
  middleSwaper:string;
}

const initialState: SwapState = {
  isSwapped: false,
  from: "",
  to: "",
  middleSwaper: "",
};

const swapSlice = createSlice({
  name: "swapLogic",
  initialState,
  reducers: {
    // We will need the action for the amount data comming from the ui
    toggleSwap: (state , action) => {
      state.isSwapped = !state.isSwapped;
      state.middleSwaper = state.from;
      state.from = state.to;
      state.to = state.middleSwaper;
    },
  },
});

export const { toggleSwap } = swapSlice.actions;
export default swapSlice.reducer;
