import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store.config";

export const reduxStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  // See: https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
  // Infer the `RootState` and `AppDispatch` types from the store itself.
  export type RootState = ReturnType<typeof reduxStore.getState>;
  export type AppDispatch = typeof reduxStore.dispatch;
  