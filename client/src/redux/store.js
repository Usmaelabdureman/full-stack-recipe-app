// Store
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
    reducer: {
        reducer: rootReducer,
    },
});

export default store;