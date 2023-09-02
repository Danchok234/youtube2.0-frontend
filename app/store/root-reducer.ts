import { reducer as toastrReducer } from 'react-redux-toastr'

import { api } from './api/api'
import { authSlice } from './auth/auth.slice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authSlice.reducer,
	toastr: toastrReducer,
})
