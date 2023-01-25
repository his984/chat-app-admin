import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import usersReducer from "./slices/usersSlice";
import chatsReducer from "./slices/chatsSlice";


export default configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        chats: chatsReducer,
    },
})