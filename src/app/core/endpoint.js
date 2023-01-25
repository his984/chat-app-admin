const base = `/api`
const endpoints = {
    auth: {
        login: `${base}/auth/login`,
        register: `${base}/auth/register`,
        profile: `${base}/auth/profile`,
    },
    users: {
        r: `${base}/users/`,
        chats: `${base}/users/chats`
    },
    chats: {
        base: `${base}/chats/`,
        users: `${base}/chats/users`
    }
}

export {endpoints} ;