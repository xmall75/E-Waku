'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {

  const { data: session, status }: { data: any, status: string, } = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-5 bg-slate-900 text-white rounded-md h-96 w-full text-center flex flex-col justify-center">
        <h1>Welcome {session?.user.fullname}</h1>
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
            className="bg-white text-gray-600 px-3 rounded-md mx-auto my-5 h-8 flex items-center">Login</button>
        )
        }
            </div>
    </main>
  )
}
