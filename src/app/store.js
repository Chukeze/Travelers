import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import countriesReducer from '../features/countries/countriesSlice' 
export default configureStore({
    reducer:{
        country: countriesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})