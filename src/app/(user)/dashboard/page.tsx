'use client'

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminDashboard() {
    const { data: session, status }: { data: any, status: string, } = useSession()
    console.log(session)
    console.log(status)

    const router = useRouter()

    useEffect(() => {
        if(status === 'unauthenticated') {
            router.push('/login')
        }
        else {
            if(session !== undefined && session?.user.role) {
                router.push('/')
            }
        }
    }, [router, session?.user.role, status, session])

    console.log(session)

    return (
        <>
            <div className="p-5 bg-slate-900 text-white rounded-md h-96 w-full text-center flex flex-col justify-center">
                <h1>Welcome, {session?.user.fullname}</h1>
                {status === 'authenticated' ? (
                <div className="flex gap-3 h-3 mx-auto items-center my-5">
                    <button 
                    onClick={() => signOut()}
                    className="bg-white text-gray-600 text-center px-3 rounded-md h-8 flex items-center">Logout</button>
                </div>
                ):
                (
                    <button 
                    onClick={() => signIn()}
                    className="bg-white text-gray-600 px-3 rounded-md mx-auto">Login</button>
                )
                }
            </div>
        </>
    )
}