"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {

	const router = useRouter()
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleLogin = async (e: any) => {
		console.log(e)
		e.preventDefault()

		setIsLoading(true)

		try {
			const res = await signIn('credentials', {
				redirect: false,
				email: e.target.email.value,
				password: e.target.password.value,
				callbackUrl: '/dashboard',
			})
			if(!res?.error) {
				setIsLoading(false)
				router.push('/dashboard')
			}
			else {
				setIsLoading(false)
				if(res.status === 401) {
					setError('Invalid credentials')
				}
				else {
					setError('Please register')
				}
			}
		}
		catch (err) {
			console.log(err)
		}
	}

    return (
        <div className="h-screen flex-col max-w-2xl mx-auto flex items-center justify-center">
			<div
			className="bg-white w-full h-full p-4 sm:p-6 lg:p-8 outline flex flex-col items-center justify-center">
				<img src="/pictures/auth-logo.png" className="w-16 h-12 object-cover mb-5" alt="" />
				<form className="w-4/5 h-full flex flex-col justify-start" onSubmit={(e) =>handleLogin(e)}>
					<h3 className="text-xl font-semibold text-black text-center font-[Poppins]">Welcome back!</h3>
					<h4 className="text-sm font-light text-black text-center font-[Poppins] mb-5">Please enter your details</h4>
					<div className="w-full h-10 mt-10">
						{error !== '' && <h4 className="text-red-600 font-medium text-md text-center">{error}</h4>}
					</div>
					<div className="mb-5 mt-10">
						<label htmlFor="email" className="text-sm text-gray-900 block mb-1 font-[Poppins]">Email</label>
						<input type="email" name="email" id="email" className="border-b border-gray-800 text-slate-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1" placeholder="name@company.com" required />
                    </div>
					<div className="mb-5">
						<label htmlFor="password" className="text-sm text-gray-900 block mb-1 font-[Poppins]">Password</label>
						<input type="password" name="password" id="password" placeholder="••••••••" className="border-b border-gray-800 text-slate-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1" required />
                    </div>
					<button disabled={isLoading} type="submit" className="w-full text-black bg-[#D9D9D9] hover:bg-[#CACACA] focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
						{isLoading ? '•••••' : 'Login'}
					</button>
				</form>
				<div className="text-sm font-medium mb-5">
					Don't have an account? <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Sign
						Up</Link>
				</div>
			</div>
        </div>
    )
}