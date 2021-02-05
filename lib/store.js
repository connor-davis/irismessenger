import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { userSlice } from "./slices/user.slice.js";

let userReducer = userSlice.reducer;

function loggerMiddleware(store) {
    return function (next) {
        return function (action) {
            console.log(action);
            next(action);
            console.log(store.getState());
        }
    }
}

const rootReducer = combineReducers({
    userReducer,
});

let store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({
        serializableCheck: false,
    }), loggerMiddleware],
});

export { store };