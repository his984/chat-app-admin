import {AuthLayout} from "../../layout/auth_layout";
import {Table} from "flowbite-react";

export function UserIndex() {

    return <AuthLayout>
        <div className="flex flex-wrap justify-evenly ">
            <div className="my-4 mx-2">
                <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white text-center">
                    Lasted Invitations
                </h2>
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
                            {Array.from({length: 10}).map((i,v) => {
                                return (<Table.Row key={v} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Test
                                    </Table.Cell>
                                    <Table.Cell>
                                        Sliver
                                    </Table.Cell>
                                    <Table.Cell>
                                        <a
                                            href="/tables"
                                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            Edit
                                        </a>
                                    </Table.Cell>
                                </Table.Row>)
                            })}
                        </>
                    </Table.Body>
                </Table>
            </div>
            <div className="my-4 mx-2">
                <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white text-center">
                    Latest Chats
                </h2>
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
                            {Array.from({length: 10}).map((i,v) => {
                                return (<Table.Row key={v} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Test
                                    </Table.Cell>
                                    <Table.Cell>
                                        <a
                                            href="/tables"
                                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
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
            <div className="my-4 mx-2">
                <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white text-center ">Latest joined users </h2>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>
                            name
                        </Table.HeadCell>
                        <Table.HeadCell>
                            email
                        </Table.HeadCell>
                        <Table.HeadCell>
                            phone
                        </Table.HeadCell>
                        <Table.HeadCell>
                          <span className="sr-only">
                            Actions
                          </span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <>
                            {Array.from({length: 10}).map((i,v) => {
                                return (<Table.Row key={v} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Test
                                    </Table.Cell>
                                    <Table.Cell>
                                        Sliver
                                    </Table.Cell>
                                    <Table.Cell>
                                        Sliver
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