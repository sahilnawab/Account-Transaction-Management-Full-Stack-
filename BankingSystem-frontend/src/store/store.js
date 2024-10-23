import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import userSlice from './userSlice'
import accountSlice from './accountSlice'

const store = configureStore({
    reducer: {
        // Add reducers here
        auth:authSlice,
        user:userSlice,
        account:accountSlice
    }
})
export default store;