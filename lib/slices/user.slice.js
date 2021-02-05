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
        setUserEmail: (state, action) => {
            state.user.email = action.payload;
        },
        setUserName: (state, action) => {
            state.user.name = action.payload;
        }
    }
});

const { setUser, setUserEmail, setUserName } = userSlice.actions;

const selectUser = (state) => state.userReducer.user;

export {
    userSlice,
    setUser,
    setUserEmail,
    setUserName,
    selectUser,
}