import {useState} from "react";
import {AuthLayout} from "../../layout/auth_layout";
import {Pagination, Table} from "flowbite-react";
import {ChatModal} from "../../components/chat_modal";

export function UserChats() {

    const [isLoading, setIsLoading] = useState(false)
    const [active, setActive] = useState(0);
    return <AuthLayout>

        <ChatModal/>
        {
            isLoading ? <></>
                : <>
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
                    <div>
                        <div
                            className={`${active === 1 ? 'hidden' : ''}  p-4 rounded-lg bg-gray-50 dark:bg-gray-800 max-w-2xl mx-auto`}
                            role="tabpanel"
                        >
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
                                        {Array.from({length: 10}).map((i, v) => {
                                            return (
                                                <Table.Row key={v}
                                                           className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                    <Table.Cell
                                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        Test
                                                    </Table.Cell>
                                                    <Table.Cell
                                                        className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        Test
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <a
                                                            href="/tables"
                                                            className="font-medium text-blue-600 hover:underline dark:text-blue-500 text-center"
                                                        >
                                                            Join
                                                        </a>
                                                    </Table.Cell>
                                                </Table.Row>)
                                        })}
                                    </>
                                </Table.Body>
                            </Table>

                        </div>
                        <div
                            className={`${active === 0 ? 'hidden' : ''}  p-4 rounded-lg bg-gray-50 dark:bg-gray-800 max-w-2xl mx-auto`}
                            role="tabpanel"
                        >
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>
                                        Subject
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                          <span className="sr-only">
                            Actions
                          </span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    <>
                                        {Array.from({length: 20}).map((i, v) => {
                                            return (<Table.Row key={v}
                                                               className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell
                                                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    Test
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <a
                                                        href="/tables"
                                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500 text-center"
                                                    >
                                                        Join
                                                    </a>
                                                </Table.Cell>
                                            </Table.Row>)
                                        })}
                                    </>
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                    <div className="flex items-center justify-center text-center">
                        <Pagination
                            currentPage={1}
                            layout="pagination"
                            onPageChange={() => {
                            }}
                            showIcons={true}
                            totalPages={200}
                            previousLabel="Go back"
                            nextLabel="Go forward"
                        />
                    </div>
                </>
        }

    </AuthLayout>
}