import {AuthLayout} from "../../layout/auth_layout";
import {Table} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {get} from "../../../core/http_client";
import {endpoints} from "../../../core/endpoint";
import {setUsers} from "../../../core/state/slices/homeSlice";
import {ChatTable} from "../../components/chat_table";
import {InvitationTable} from "../../components/invitation_table";


export function Home() {

    const dispatch = useDispatch();
    const init = useSelector((state) => state.home.usersInit)
    const users = useSelector((state) => state.home.users)
    const role = useSelector((state) => state.auth.userData.role)
    const [isLoading, setIsLoading] = useState(true);

    const getUsers = () => {

        setIsLoading(true)
        get(`${endpoints.users.r}?page=1`).then((data) => {
            dispatch(setUsers(data.rows))
        }).catch(() => {
        }).finally(() => {
            setIsLoading(false)
        })
    }
    useEffect(() => {

        if (!init) {
            getUsers();
        }


    }, [
        init
    ])


    return <AuthLayout>
        <div className="flex flex-wrap justify-evenly ">
            {
                role !== 'admin' ? <div className="my-4 mx-2">
                    <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white text-center">
                        Lasted Invitations
                    </h2>
                    <InvitationTable withPagination={false} slice={'home'}
                                     beforeLoad={() => {
                                         setIsLoading(true)
                                     }} afterLoad={() => {
                        setIsLoading(false)
                    }}
                    />
                </div> : <></>
            }


            <div className="my-4 mx-2">
                <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white text-center">
                    Latest Chats
                </h2>
                <ChatTable withPagination={false} slice={'home'}
                           beforeLoad={() => {
                               setIsLoading(true)
                           }} afterLoad={() => {
                    setIsLoading(false)
                }}
                />
            </div>
            <div className="my-4 mx-2">
                <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl overflow-x-auto dark:text-white text-center ">Latest
                    joined users </h2>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            email
                        </Table.HeadCell>
                        <Table.HeadCell>
                          <span className="sr-only">
                            Actions
                          </span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <>
                            {users.map((user) => {
                                return (
                                    <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell
                                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {user.firstName + ' ' + user.lastName}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user.email}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <a
                                                href="/tables"
                                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                            >
                                                Start Chat
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>)
                            })}
                        </>


                    </Table.Body>
                </Table>
            </div>
        </div>
    </AuthLayout>

}