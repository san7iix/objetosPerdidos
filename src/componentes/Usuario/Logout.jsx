import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { signOut, getAuth } from 'firebase/auth'
import db from '../../base';
import { USER_KEY } from '../../var.config';



export default function Logout() {

    let history = useHistory();
    const auth = getAuth()

    useEffect(() => {
        signOut(auth)
        localStorage.removeItem(USER_KEY);
        history.push("/")
    })


    return (
        <div>
            Saliendo...
        </div>
    )
}
