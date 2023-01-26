import {AuthLayout} from "../../layout/auth_layout";
import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UsersLogo from '../../../assets/users.svg'

export function Chat() {
    const {chatId} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [chat, setChat] = useState({});
    const [me, setMe] = useState({});
    const [messages, setMessages] = useState([])
    const socket = io('http://localhost:3001', {
        auth: {
            token: localStorage.getItem('token'),
            chatId: chatId
        },
        extraHeaders: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    });

    socket.on('message', data => {
        console.log(data);
    });

    socket.on('init-info', (info) => {
        setChat(info.chat);
        setMe(info.user);
        setIsLoading(false);
    });
    socket.on('connect_error', (error) => {
        try {
            console.log(error)
            const res = JSON.parse(error.message)
            if (res.code === 402)
                navigate('/')
        } catch (e) {
            console.log(e)
        }
    });

    useEffect(() => {
        return () => {
            socket.disconnect()
        }
    }, [])


    return <AuthLayout>
        {
            isLoading ? <></> :
                <div className="flex flex-row justify-center items-center">
                    <div className="mx-auto">
                        <div className="max-w-2xl border rounded">
                            <div>
                                <div className="w-full">
                                    <div className="relative flex items-center p-3 border-b border-gray-300">
                                        <img className="object-cover w-10 h-10 rounded-full bg-blue-200 text-blue-600"
                                             src={UsersLogo}
                                             alt="users"/>
                                        <span className="block ml-2 font-bold text-gray-600">{chat.subject}</span>
                                    </div>
                                    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">

                                        <ul className="space-y-2">
                                            <li className="flex justify-start">
                                                <div
                                                    className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                                    <span className="block">Hi</span>
                                                </div>
                                            </li>
                                            <li className="flex justify-end">
                                                <div
                                                    className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                                    <span className="block">Hiiii</span>
                                                </div>
                                            </li>
                                            <li className="flex justify-end">
                                                <div
                                                    className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                                    <span className="block">how are you?</span>
                                                </div>
                                            </li>
                                            <li className="flex justify-start">
                                                <div
                                                    className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                                    <span className="block">Lorem ipsum dolor sit, amet consectetur adipisicing elit. </span>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>

                                    <div
                                        className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                                        <input type="text" placeholder="Message"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mx-3 rounded-lg "
                                               name="message" required/>
                                        <button type="submit">
                                            <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </AuthLayout>
}