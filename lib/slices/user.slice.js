import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUserID: (state, action) => {
            state.user.id = action.payload;
        },
        setUserEmail: (state, action) => {
            state.user.email = action.payload;
        },
        setUserName: (state, action) => {
            state.user.name = action.payload;
        },
        setUserKeys: (state, action) => {
            state.user.keys = action.payload;
        },
    }
});

const { setUser, setUserID, setUserEmail, setUserName, setUserKeys, } = userSlice.actions;

const selectUser = (state) => state.userReducer.user;

export {
    userSlice,
    setUser,
    setUserID,
    setUserEmail,
    setUserName,
    setUserKeys,
    selectUser,
}