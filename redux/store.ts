import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "./features/records/recordSlice";

export const store = configureStore({
  reducer: {
    record: recordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
