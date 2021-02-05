import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chats: []
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        addChat: (state, action) => {
            state.chats = [...state.chats, action.payload];
        },
        removeChat: (state, action) => {
            state.chats = state.chats.filter((chat) => chat.id !== action.payload);
        },
    }
});

const { setChats, addChat, removeChat } = chatsSlice.actions;

const selectChats = (state) => state.chatsReducer.chats;

export {
    chatsSlice,
    setChats,
    addChat,
    removeChat,
    selectChats,
}