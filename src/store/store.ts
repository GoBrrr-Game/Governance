import { configureStore } from "@reduxjs/toolkit";
import connectWalletReducer from "./reducers/reducer"; // Import the reducer

// Create the store and apply the reducer
export const store = configureStore({
  reducer: {
    connectWallet: connectWalletReducer, // Add your reducer here
  },
});

// Define RootState type for use in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
