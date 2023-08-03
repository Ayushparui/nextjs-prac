"use client"

import axios from "axios";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

export default function VerifyEmail() {

    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)


    const verifyUserEmail = async () => {
        try {
            
            await axios.post(`/api/users/verifyemail`, {token})
            setVerified(true)

        } catch ( error: any ) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.href.split('?token=')[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    },[token])

    return(
        <div>
            <h1>Verify Email</h1>
            <h2>{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h1>Verified</h1>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h1>Error</h1>
                </div>
            )}
        </div>
    )

}