import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    products:[
        {id: 0, product_name: 't-shirt', product_price: 100.0, prodcut_rating: '⭐⭐⭐'},
        {id: 1, product_name: 'iphone' ,product_price: 200.0, prodcut_rating: '⭐⭐⭐⭐'},
        {id: 2, product_name: 'nokia' ,product_price: 300.0, prodcut_rating: '⭐⭐'}
    ],
    current: 0
}
export const Cartslicer = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        Additem:(state)=>{
            state.current = (state.current + 1) % state.products.length
        },
        Deleteitem:(state)=>{
            state.current = (state.current - 1 + state.products.length) % state.products.length
        }
    },
})
export const { Additem, Deleteitem } = Cartslicer.actions

export default Cartslicer.reducer