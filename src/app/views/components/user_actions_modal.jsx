import {Checkbox, Label, Modal, Spinner} from "flowbite-react";
import React, {useState} from "react";

export function UserActionsModal({
                                     socket,
                                     show = false,
                                     onClose = () => {
                                     },
                                     user,
                                     chatId
                                 }) {


    const [isBlocked, setIsBlocked] = useState(user.status === 'blocked')
    const [isSuspend, setIsSuspend] = useState(user.status === 'suspend')
    const [isLoading, setIsLoading] = useState(false);


    const changeState = (data, onRes = () => {
    }) => {
        setIsLoading(true);
        socket.emit('action', data, (res) => {
            onRes(res);
            setIsLoading(false)
        })
    }


    return (
        <Modal
            show={show}
            size="2xl"
            onClose={onClose}
        >
            <Modal.Header>
                {user.firstName + ' ' + user.lastName}
            </Modal.Header>
            <Modal.Body>
                {isLoading ? <div className="flex justify-center h-[10rem] items-center">
                        <Spinner aria-label="Center-aligned Loading spinner" size="xl"/>
                    </div> :
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="block-status"
                                defaultChecked={isBlocked}
                                onClick={(e) => {
                                    changeState({
                                        name: isBlocked ? 'unblocked' : 'blocked',
                                        userId: user.id,
                                        chatId
                                    }, () => {
                                        setIsBlocked(!isBlocked)
                                    })
                                }}
                            />
                            <Label htmlFor="block-status">
                                {isBlocked ? 'unblock' : 'block'}
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="suspend-status"
                                defaultChecked={isSuspend}
                                onClick={(e) => {
                                    changeState({
                                        name: isSuspend ? 'unsuspend' : 'suspend',
                                        userId: user.id,
                                        chatId
                                    }, () => {
                                        setIsSuspend(!isSuspend)
                                    })

                                }}
                            />
                            <Label htmlFor="suspend-status">
                                {isSuspend ? 'remove suspense' : "suspense"}
                            </Label>
                        </div>
                    </div>
                }
            </Modal.Body>
        </Modal>
    );

}