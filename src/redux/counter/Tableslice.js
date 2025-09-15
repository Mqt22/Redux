import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    rows: [],
    searchStd: "",
    insertbydate: {},
    setSorting: "asc"
};
const Tableslice = createSlice({
    name: 'Table',
    initialState,
    reducers: {
        removerow: (state, action) => {
            state.rows = state.rows.filter(row => row.Id !== action.payload);
        },
        createrow: (state, action) => {
            state.rows.push({ Id: Date.now(), ...action.payload });
            const today = new Date().toLocaleDateString();
            if (state.insertbydate[today]) {
                state.insertbydate[today] += 1;
            }
            else {
                state.insertbydate[today] = 1;
            }
        },
        Search: (state, action) => {
            state.searchStd = action.payload;
        },
        setSort: (state, action) => {
            const { key, order } = action.payload;
            state.rows.sort((a, b) => {
                const valA = a[key];
                const valB = b[key];
                if (typeof valA === "number") return order === "asc" ? valA - valB : valB - valA;
                return order === "asc" ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
            });
        }
    }
});
export const { Search, removerow, createrow, setSort } = Tableslice.actions;
export default Tableslice.reducer;
