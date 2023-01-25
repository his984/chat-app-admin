import {Login} from "../views/pages/guest/login.jsx";
import {Register} from "../views/pages/guest/register.jsx";
import {Profile} from "../views/pages/global/profile";
import {Users} from "../views/pages/global/users";
import {UserIndex} from "../views/pages/user/user_index";
import {Logout} from "../views/pages/global/logout";
import {UserChat} from "../views/pages/user/user_chat";
import {AdminChat} from "../views/pages/admin/admin_chat";
import {UserChats} from "../views/pages/user/user_chats";
import {AdminChats} from "../views/pages/admin/admin_chats";
// add every role's pages as an array then export it to use it in main file
const guestPages = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path : '/logout',
        element: <Logout/>
    }
];

const userPages = [
    {
        path: '/normal/',
        element: <UserIndex/>
    },
    {
        path: '/normal/profile',
        element: <Profile/>
    },
    {
        path: '/normal/users',
        element: <Users/>
    },
    {
        path: '/normal/chats',
        element: <UserChats/>
    },
    {
        path: '/normal/chats/:chatId',
        element: <UserChat />,

    }

];
const adminPages = [
    {
        path: '/admin/profile',
        element: <Profile/>
    },
    {
        path: '/admin/users',
        element: <Users/>
    },
    {
        path: '/admin/chats',
        element: <AdminChats/>
    },
    {
        path: '/admin/chats/:chatId',
        element: <AdminChat/>
    }
];


export {guestPages , adminPages , userPages}