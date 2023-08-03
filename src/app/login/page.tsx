"use client";
import React, {use, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function Login() {
    const router = useRouter()

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/login", user);
            console.log(response);
            router.push("/profile");

        } catch (error : any) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {

        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }   else {
            setButtonDisabled(true);
        }
    }, [user])

    return(
        <div>
            <h1>{loading ? "Processing" : "Login"}</h1>
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
            <button onClick={onLogin}>{buttonDisabled ? "No Login" : "Login"}</button>
            <hr />
            <Link href="/signup">Signup page</Link>
        </div>
    )
}