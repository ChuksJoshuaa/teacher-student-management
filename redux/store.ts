import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "./features/records/recordSlice";

export const store = configureStore({
  reducer: {
    record: recordReducer,
  },
});

interface CypressWithStore extends Cypress.Cypress {
  store?: typeof store;
}

declare global {
  interface Window {
    Cypress?: CypressWithStore;
  }
}

if (typeof window !== "undefined" && window.Cypress) {
  window.Cypress.store = store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
