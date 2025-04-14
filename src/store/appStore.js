import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        config: configReducer,
    }
})

export default appStore;