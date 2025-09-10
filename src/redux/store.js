import { configureStore } from '@reduxjs/toolkit'
import imageReducer  from './counter/cardslicer'
export const store = configureStore({
  reducer: {
    Imgdata: imageReducer ,
  },
})