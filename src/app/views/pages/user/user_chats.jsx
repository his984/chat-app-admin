import React, {useState} from "react";
import {AuthLayout} from "../../layout/auth_layout";
import {Spinner} from "flowbite-react";
import {ChatModal} from "../../components/chat_modal";
import {ChatTable} from "../../components/chat_table";
import {InvitationTable} from "../../components/invitation_table";


export function UserChats() {

    const [isLoading, setIsLoading] = useState(false)
    const [active, setActive] = useState(0);

    return <AuthLayout>

        <ChatModal/>
        <div className="my-4 border-b border-gray-300 dark:border-gray-700">
            <ul className="flex  justify-between -mb-px text-sm font-medium text-center"
                role="tablist">
                <li className="mr-2 w-5/12" role="presentation">
                    <button
                        className={`inline-block p-4 border-b-2 text-lg sm:text-xl  rounded-t-lg ${active === 0 ? 'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500' : 'border-transparent hover:text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:text-gray-300'} `}
                        type="button" role="tab" aria-controls="chats"
                        aria-selected="false"
                        onClick={() => {
                            setActive(0)
                        }}
                    >Chats
                    </button>
                </li>
                <li className="mr-2 w-5/12" role="presentation">
                    <button
                        className={`inline-block p-4 border-b-2  text-lg sm:text-xl   rounded-t-lg ${active === 1 ? 'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500' : 'border-transparent hover:text-gray-600  dark:text-gray-300 hover:border-gray-400 dark:hover:text-gray-300'} `}
                        type="button" role="tab"
                        aria-controls="Invitations" aria-selected="false"
                        onClick={() => {
                            setActive(1)
                        }}
                    >Invitations
                    </button>
                </li>
            </ul>
        </div>
        {isLoading ? <div className='flex flex-row justify-center items-center h-[20rem]'>
                <Spinner aria-label="Center-aligned Loading spinner" size="xl"/>
            </div> :
            <div>
                <div
                    className={`${active === 1 ? 'hidden' : ''}  p-4 rounded-lg bg-gray-50 dark:bg-gray-800 max-w-2xl mx-auto`}
                    role="tabpanel"
                >
                    <ChatTable withPagination={true} beforeLoad={() => {
                        setIsLoading(true)
                    }} afterLoad={() => {
                        setIsLoading(false)
                    }}/>
                </div>
                <div
                    className={`${active === 0 ? 'hidden' : ''}  p-4 rounded-lg bg-gray-50 dark:bg-gray-800 max-w-2xl mx-auto`}
                    role="tabpanel"
                >
                    <InvitationTable withPagination={true} beforeLoad={() => {
                        setIsLoading(true)
                    }} afterLoad={() => {
                        setIsLoading(false)
                    }}/>
                </div>
            </div>
        }


    </AuthLayout>
}