import { configureStore } from "@reduxjs/toolkit";

import websiteCreationReducer from "./slice/websiteCreationSlice";

export const store = configureStore({
    reducer: {
        websiteCreation: websiteCreationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;