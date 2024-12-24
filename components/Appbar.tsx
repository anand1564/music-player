"use client"
import { signIn,signOut,useSession } from "next-auth/react"

export function Appbar(){
    const session = useSession();
    return <div>
        <div className="flex justify-between items-center flex-col p-4 border-gray-700">
            <h1>Music Player</h1>
            <div className="flex flex-col p-2 gap-5">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>signIn()}>Login</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Signup</button>
            </div>
        </div>
    </div>
}