import { configureStore } from "@reduxjs/toolkit";
import connectModelReducer from "./reducers/reducer"; // Import the reducer

// Create the store and apply the reducer
export const store = configureStore({
  reducer: {
    connectModel: connectModelReducer, // Add your reducer here
  },
});

// Define RootState type for use in the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
