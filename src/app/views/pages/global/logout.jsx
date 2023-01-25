import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {invokeToken} from "../../../core/state/slices/authSlice";
import React from "react";

export function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(invokeToken())
        navigate('/');
    })

    return <></>

}