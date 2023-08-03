"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const [data, setData] = useState('nothing')
    const Logout = async () => {

        try {
            await axios.get("/api/users/logout")
            router.push("/login")
        } catch (error) {
            console.log(error)
        }

    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id)
    }

    return(
        <div>
            <h1>Profile</h1>
            <hr />
            <h2>{data === "nothing" ? "Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button onClick={Logout}>Logout</button>
            <hr />
            <button onClick={getUserDetails}>GetuserDetails</button>
        </div>
    )
}