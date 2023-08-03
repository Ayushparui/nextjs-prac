"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";



export default function Signup() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(response);
            router.push("/login")
        } catch (error : any) {
            console.log(error);
            // toast.error(error.message)
        }finally {
            setLoading(false);
        }

    }

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }else {
            setButtonDisabled(true);
        }
    }, [user])

    return(
        <div>
            <h1>{loading ? "Processing": "Signup"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input 
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username"
            />
            <hr />
            <label htmlFor="email">Email</label>
            <input 
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />
            <hr />
            <label htmlFor="password">Password</label>
            <input 
                type="paasword"
                id="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <hr />
            <button onClick={onSignUp}>{buttonDisabled ? "No Signup": "Signup"}</button>
            <hr />
            <Link href="/login">Login page</Link>
        </div>
    )
}