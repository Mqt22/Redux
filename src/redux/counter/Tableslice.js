import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    rows: [],
    searchStd: "",
    insertbydate: {},
};
const Tableslice = createSlice({
    name: 'Table',
    initialState,
    reducers:{
        removerow: (state,action) => {
            state.rows = state.rows.filter(row => row.Id !== action.payload);
        },
        createrow: (state,action) => {
            state.rows.push({Id: Date.now(), ...action.payload});
            const today = new Date().toLocaleDateString();
            if(state.insertbydate[today]){
                state.insertbydate[today] += 1;
            }
            else{
                state.insertbydate[today] = 1;
            }
        },
        Search: (state,action) => {
            state.searchStd = action.payload;
        }
    }
});
export const {Search,removerow, createrow} = Tableslice.actions;
export default Tableslice.reducer;