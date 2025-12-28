import { configureStore } from "@reduxjs/toolkit";
import swapReducer from "../Features/Swap/swap-slice"

export const store = configureStore({
  reducer: {
    swap: swapReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;