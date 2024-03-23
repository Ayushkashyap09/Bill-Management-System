import {configureStore} from '@reduxjs/toolkit'
import billSlice from './billSlice.js'
import adminSlice from './adminSlice.js'

const store = configureStore({
    reducer : {
      billslice : billSlice,
      adminSlice : adminSlice
    }
})

export default store