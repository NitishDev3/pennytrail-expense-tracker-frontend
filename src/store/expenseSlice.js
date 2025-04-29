import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenseData: null,
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        setExpenseData: (state, action) => {
            state.expenseData = action.payload;
        }
    }
})


export const {setExpenseData} = expenseSlice.actions;
export default expenseSlice.reducer;