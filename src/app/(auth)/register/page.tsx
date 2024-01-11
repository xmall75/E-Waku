'use client'

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {

	const router = useRouter()
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		setError('')
		setIsLoading(true)

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				fullname: e.target.fullname.value,
				email: e.target.email.value,
				password: e.target.password.value,
			})
		})

		if(res.status === 200) {
			e.target.reset()
			console.log(res.status)
			setIsLoading(false)
			router.push('/login')
		}
		else {
			setError('Email already exists')
			setIsLoading(false)
			console.log()
		}
	}

    return (
        <div className="h-screen flex-col max-w-2xl mx-auto flex items-center justify-center">
		{/* {error !== '' && <p className="font-medium text-md mb-3 text-red-600">{error}</p>} */}
			
			<div
			className="bg-white w-full h-full p-4 sm:p-6 lg:p-8 outline flex flex-col items-center justify-center">
				<img src="/pictures/auth-logo.png" className="w-16 h-12 object-cover mb-5" alt="" />
				<form className="w-4/5 h-full flex flex-col justify-start" action="#" onSubmit={(e) => handleSubmit(e) }>
					<h3 className="text-xl font-semibold text-black text-center font-[Poppins]">Get Started for Free</h3>
					<h4 className="text-sm font-light text-black text-center font-[Poppins] mb-5">Begin your business by creating e-Waku account</h4>
					<div className="w-full h-10 mt-10">
						{error !== '' && <h4 className="text-red-600 font-medium text-md text-center">{error}</h4>}
					</div>
					<div className="mb-5 mt-5">
						<label htmlFor="fullname" className="text-sm text-gray-900 block mb-1 font-[Poppins]">Fullname</label>
						<input type="text" name="fullname" id="fullname" className="border-b border-gray-800 text-slate-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1" placeholder="Rep Randolvski" required />
					</div>
					<div className="mb-5">
						<label htmlFor="email" className="text-sm text-gray-900 block mb-1 font-[Poppins]">Email</label>
						<input type="email" name="email" id="email" className="border-b border-gray-800 text-slate-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1" placeholder="name@company.com" required />
                    </div>
					<div className="mb-5">
						<label htmlFor="password" className="text-sm text-gray-900 block mb-1 font-[Poppins]">Password</label>
						<input type="password" name="password" id="password" placeholder="••••••••" className="border-b border-gray-800 text-slate-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1" required />
                    </div>
					<button disabled={isLoading} type="submit" className="w-full text-black bg-[#D9D9D9] hover:bg-[#CACACA] focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
						{isLoading ? '•••••' : 'Create account'}
					</button>
				</form>
				<div className="text-sm font-medium mb-5">
					Alredy have an account? <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">
						Sign In</Link>
				</div>
			</div>
        </div>
    )
}