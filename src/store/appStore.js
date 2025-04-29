import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import configReducer from "./configSlice";
import expenseReducer from "./expenseSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        config: configReducer,
        expense: expenseReducer,
    }
})

export default appStore;