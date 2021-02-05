import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { userSlice } from "./slices/user.slice.js";
import persistStore from 'redux-persist/es/persistStore';

let userReducer = userSlice.reducer;

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

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

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware({
        serializableCheck: false,
    }), loggerMiddleware]
})

let persistor = persistStore(store)

export {store, persistor};