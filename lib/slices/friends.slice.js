import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: []
    },
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload
        },
        addFriend: (state, action) => {
            state.friends = [...state.friends, action.payload];
        },
        removeFriend: (state, action) => {
            state.friends = state.friends.filter((friend) => friend.id !== action.payload);
        },
    }
});

const { setFriends, addFriend, removeFriend } = friendsSlice.actions;

const selectFriends = (state) => state.friendsReducer.friends;

export {
    friendsSlice,
    setFriends,
    addFriend,
    removeFriend,
    selectFriends,
}