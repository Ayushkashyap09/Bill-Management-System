import { createSlice } from '@reduxjs/toolkit'

const billSlice = createSlice({
    name: 'billSlice',
    initialState: {
        data: []
    },
    reducers: {
        create: (state, action) => {
            console.log(action.payload)
            state.data.unshift(action.payload)
        },
        update: (state, action) => {
            const id = Number(action.payload.id)
            state.data.splice(id,1,action.payload)
         },
        deleteClient: (state, action) => {
            const itemId = action.payload;
            console.log(itemId)
            state.data = state.data.filter((item, index) => index !== itemId);
        }
    }
})
export const {update, create, deleteClient } = billSlice.actions
export default billSlice.reducer