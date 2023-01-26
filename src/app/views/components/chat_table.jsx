import {Pagination, Table} from "flowbite-react";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {get} from "../../core/http_client";
import {endpoints} from "../../core/endpoint";
import {updateChats} from "../../core/state/slices/chatsSlice";
import {setChats} from "../../core/state/slices/homeSlice";

export function ChatTable({
                              slice = 'chats',
                              withPagination = true, beforeLoad = () => {
    }, afterLoad = () => {
    }
                          }) {


    const chatsPagination = useSelector((state) => {
        return slice === 'chats' ? state.chats.chatsPagination : state.home.chats
    })
    const isChatsInit = useSelector((state) => {
        return slice === 'chats' ? state.chats.chatsInit : state.home.chatsInit
    })

    const dispatch = useDispatch();

    const [chatsPage, setChatsPage] = useState(1)

    const getChats = () => {

        beforeLoad()

        get(`${endpoints.chats.base}?page=${chatsPage}`).then((data) => {
            if (slice === 'chats')
                dispatch(updateChats(data))
            else
                dispatch(setChats(data.rows))
        }).finally(() => {
            afterLoad()
        })


    }

    useEffect(() => {
        if (!isChatsInit) {
            getChats();
        }

    })

    return <>
        <Table>
            <Table.Head>
                <Table.HeadCell>
                    Subject
                </Table.HeadCell>
                <Table.HeadCell>
                    By
                </Table.HeadCell>
                <Table.HeadCell>
                          <span className="sr-only">
                            Actions
                          </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                <>
                    {(slice === 'chats' ? chatsPagination.rows : chatsPagination).map((chat) => {
                        return (

                            <Table.Row key={chat.id}
                                       className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell
                                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {chat.subject}
                                </Table.Cell>
                                <Table.Cell
                                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {chat.owner.firstName + ' ' + chat.owner.lastName}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link
                                        to={`/chats/${chat.id}`}
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500 text-center"
                                    >
                                        Join
                                    </Link>
                                </Table.Cell>
                            </Table.Row>)
                    })}
                </>
            </Table.Body>
        </Table>
        {withPagination ? <div className="flex items-center justify-center text-center mt-2">
                <Pagination
                    currentPage={chatsPage}
                    layout="pagination"
                    onPageChange={(p) => {
                        setChatsPage(p)
                        getChats();
                    }}
                    showIcons={true}
                    totalPages={Math.ceil(chatsPagination.count / 10)}
                    previousLabel="Go back"
                    nextLabel="Go forward"
                />
            </div>
            : <></>}
    </>

}