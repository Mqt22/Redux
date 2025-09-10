import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    Imgdata: [
        "https://tse4.mm.bing.net/th/id/OIP.T65ahi0g7ziopmPb0BshfQHaEK?pid=Api&P=0&h=220",
        "https://tse4.mm.bing.net/th/id/OIP.ScAlvu_NcVBdNeUZ1DXQMwHaDD?pid=Api&P=0&h=220"
    ],
    current: 0
}

export const cardslicer = createSlice({
    name: 'imagedata',
    initialState,
    reducers: {
        Update: (state) => {
            state.current = (state.current+1) % state.Imgdata.length
        }
    },
})

// Action creators are generated for each case reducer function
export const { Update } = cardslicer.actions

export default cardslicer.reducer