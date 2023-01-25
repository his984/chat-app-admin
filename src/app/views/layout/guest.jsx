import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {invokeToken} from "../../core/state/slices/authSlice";

export default function GuestLayout({props, children}) {
    const is_authenticated = useSelector((state) => state.auth.is_authenticated)
    const role = useSelector((state) => state.auth.userData.role)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    React.useEffect(() => {
        if (is_authenticated && role) {
            navigate(`/${role}/`)
        } else {
            dispatch(invokeToken())
        }
    }, [is_authenticated]);


    return <div className="min-h-screen min-w-screen   overflow-x-hidden flex">
        {children}
    </div>;
}