import {useState} from "react";


export function InvitationActions({chat, index}) {

    const [status, setStatus] = useState('invited')

    return <div className="flex flex-row">

        {
            status === 'invited' ? <>
                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Accept
                </button>
                <button type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Reject
                </button>
            </> : (  status === 'reject_invitation' ?  <>
                <h4 className="text-2xl font-bold text-red "> Rejected </h4>
            </> : <>


            </> )
        }

    </div>;


}