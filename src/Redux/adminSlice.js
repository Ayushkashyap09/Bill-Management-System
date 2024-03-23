import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: {
        data: []
    },
    reducers: {
        createAdmin: (state, action) => {
            console.log(action.payload)
            state.data.unshift(action.payload)
        },
        updateAdmin: (state, action) => {
            const id = Number(action.payload.id)
            state.data.splice(id,1,action.payload)
         },
    }
})
export const {updateAdmin, createAdmin } = adminSlice.actions
export default adminSlice.reducer