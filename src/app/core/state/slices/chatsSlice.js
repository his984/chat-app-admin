import {createSlice} from '@reduxjs/toolkit'

export const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        chatsPagination: {
            count: 0,
            rows: [],
        },
        invitationsPagination: {
            count: 0,
            rows: [],
        },
        chatsInit: false,
        invitationInit: false,

    },
    reducers: {
        updateChats(state, action) {
            state.chatsPagination = action.payload
            state.init = true;
        },
    },
})


export const {updateChats} = chatsSlice.actions

export default chatsSlice.reducer