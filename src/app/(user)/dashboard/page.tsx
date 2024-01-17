'use client'

import { signOut, useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { getUser } from "@/lib/users/service"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function AdminDashboard() {
    const { data: session, status }: { data: any, status: string, } = useSession()

    const [data, setData]:any = useState()
    const currentRoute = usePathname()

    const activeStyle = 'flex w-full h-[51px] items-center bg-[#245A78] rounded-lg text-white font-[Poppins]'
    const nonActiveStyle = 'w-full'

    const router = useRouter()

    if(status === 'unauthenticated') {
        router.push('/login')
    }
    useEffect(() => {
        const fetchData = () => {
            try {
                const dataPromise = getUser(`${process.env.NEXT_PUBLIC_API_URL}/api/users/?id=${session?.user.email}`)
            
                dataPromise.then((data:any) => {
                setData(data)
            });
    
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };
    
        fetchData();
    }, [session?.user])

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
    }).format(data?.data.budget)

    return (
        <>
        {/* {data && <div>{data.data.budget}</div>} */}
        <div className="bg-[#F3F5F9] px-10 gap-3 w-full h-16 flex items-center justify-between font-[Kadwa]">
            <div className="flex items-center gap-5">
                <Image className="pb-1" alt="banner" src="/pictures/auth-logo.png" width={30} height={30} />
                e-Waku
            </div>
            <div className="rounded-full w-[30px] h-[30px] relative overflow-hidden cursor-pointer" onClick={() => signOut()}>
                <Image className="absolute" src='/pictures/profile.png' width={30} height={30} alt="profile" />
            </div>
        </div>

        <div className="flex w-full min-h-screen bg-[#F3F5F9] p-5 gap-5">
            <div className="w-1/5 h-[359px] bg-white rounded-lg flex flex-col gap-5">
                <Link className={currentRoute === '/dashboard' 
                    ? activeStyle 
                    : nonActiveStyle}
                    href='/dashboard'>
                    <div className="w-full flex items-center h-[51px] px-5 rounded-lg">
                        Estimation
                    </div>
                </Link>
                <Link className={currentRoute === '/recommendation' 
                    ? activeStyle 
                    : nonActiveStyle}
                    href='/recommendations'>
                    <div className="w-full flex items-center h-[51px] px-5 rounded-lg">
                        Recommendation
                    </div>
                </Link>
                <Link className={currentRoute === '/stats' 
                    ? activeStyle 
                    : nonActiveStyle}
                    href='/stats'>
                    <div className="w-full flex items-center h-[51px] px-5 rounded-lg">
                        Statistics
                    </div>
                </Link>
            </div>
            <div className="flex flex-col gap-5 w-full rounded-lg">
                <div className="h-[121px] flex p-5 gap-5 rounded-lg bg-white items-center">
                        {data?.data?.budget ? (
                            <>
                            <div className="rounded-lg w-[57px] h-[57px] bg-[#DAD3FE] flex items-center justify-center">
                                <Image src="/pictures/budget.png" alt="budget" width={30} height={30} />
                                </div>
                                <div>
                            <h3 className="font-[Poppins] font-semibold text-md mb-2">Budget</h3>
                            <h4 className="font-[Poppins] text-sm">
                            Rp. {data.data.budget}</h4>
                            </div>
                            </>) 
                            : 
                            (<>
                            <h4 className="font-[Poppins] text-sm">You haven't submit the prediction yet.</h4>
                            </>)}
                </div>
                <div className="h-full bg-white rounded-lg p-5">
                    {
                        data?.data?.budget ? (
                            <>
                                <div>

                                </div>
                            </>
                        ):(
                            <>
                                <div>
                                    Let's jump into the prediction page.
                                    <Link href='/dashboard/prediction'>
                                        <div className="text-white flex items-center justify-center font-[Poppins] font-medium mt-3 rounded-lg h-[40px] w-[120px] bg-[#245A78]">
                                            Get Started
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>   
        </>
    )
}