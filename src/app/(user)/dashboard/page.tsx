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

    // const budget = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'IDR',
    // }).format(data?.data.budget)

    // const estimationBudget = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'IDR',
    // }).format(data?.data.estimationBudget)

    let bgColor, resultTitle, resultText

    if(data?.data.estimationBudget > data?.data?.budget) {
        bgColor = 'bg-[#F69999]'
        resultTitle = 'Unfortunately, your success rate is low'
        resultText = 'To succeed your fish farming production, you need to change your strategy.'
    }
    else {
        if (data?.data.result === 'high') {
            bgColor = 'bg-[#99F69D]'
            resultTitle = 'Congratulations! your success rate is high'
            resultText = 'Great! Your strategy is already enough to make your fish farming success.'
        }
        else if (data?.data.result === 'normal') {
            bgColor = 'bg-[#F6D199]'
            resultTitle = 'Based on your strategy, your success rate is normal'
            resultText = 'It is okay to implement your strategy, but another improvement will be needed.'
        }
    }

    // console.log(result)

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
                <div className="h-[121px] flex p-10 gap-5 rounded-lg bg-white items-center">
                        {data?.data.budget ? (
                            <>
                            <div className="rounded-lg min-w-[57px] min-h-[57px] bg-[#DAD3FE] flex items-center justify-center">
                                <Image src="/pictures/budget.png" alt="budget" width={30} height={30} />
                                </div>
                            <div className="w-1/3">
                                <h3 className="font-[Poppins] font-semibold text-md mb-2">Budget</h3>
                                <h4 className="font-[Poppins] text-sm">
                                Rp. {data.data.budget}</h4>
                            </div>
                            <div className="w-1/2">
                                <h3 className="font-[Poppins] font-semibold text-md mb-2">Estimation Budget You Needed</h3>
                                <h4 className="font-[Poppins] text-sm">
                                {data.data.estimationBudget}</h4>
                            </div>
                            <div>
                                <Link href="/dashboard/prediction">
                                    <div className="text-white flex items-center justify-center font-[Poppins] font-medium rounded-lg h-[40px] w-[120px] bg-[#245A78]">
                                        Predict
                                    </div>
                                </Link>
                            </div>
                            </>) 
                            : 
                            (<>
                            <h4 className="font-[Poppins] text-sm">You haven&apos;t submit the prediction yet.</h4>
                            </>)}
                </div>
                <div className="h-full bg-white rounded-lg p-10">
                    {
                        data?.data?.budget ? (
                            <>
                                <div className="flex gap-5 items-center mb-8">
                                    <div className="rounded-lg min-w-[57px] min-h-[57px] bg-[#DAD3FE] flex items-center justify-center">
                                        <Image src="/pictures/fish_type.png" alt="budget" width={30} height={30} />
                                    </div>
                                    <div className="border-b border-black w-full pb-2">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Fish Type</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {data.data.fish_type.charAt(0).toUpperCase() + data.data.fish_type.slice(1)}
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center mb-8">
                                    <div className="rounded-lg min-w-[57px] min-h-[57px] bg-[#DAD3FE] flex items-center justify-center">
                                        <Image src="/pictures/land_type.png" alt="budget" width={30} height={30} />
                                    </div>
                                    <div className="border-b border-black w-full pb-2">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Pond Type</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {data.data.land_type.charAt(0).toUpperCase() + data.data.land_type.slice(1)}
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center mb-8">
                                    <div className="rounded-lg min-w-[57px] min-h-[57px] bg-[#DAD3FE] flex items-center justify-center">
                                        <Image src="/pictures/land_area.png" alt="budget" width={30} height={30} />
                                    </div>
                                    <div className="border-b border-black w-1/3 pb-2">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Pond Size</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {data.data.land_area} m2
                                        </h4>
                                    </div>
                                    <div className="border-b border-black w-1/3 pb-2">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Total Ponds</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {data.data.total_ponds === 2 && '> 1'}
                                        {data.data.total_ponds === 0 && 'None'}
                                        {data.data.total_ponds === 1 && '1'}
                                        </h4>
                                    </div>
                                    <div className="border-b border-black w-1/3 pb-2">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Lack of Water</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {data.data.poor_water === 0 && 'No'}
                                        {data.data.poor_water === 1 && 'Yes'}
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center mb-8">
                                    <div className="rounded-lg min-w-[57px] min-h-[57px] bg-[#DAD3FE] flex items-center justify-center">
                                        <Image src="/pictures/food_type.png" alt="budget" width={30} height={30} />
                                    </div>
                                    <div className="border-b border-black pb-2 w-1/3">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Feed Type</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {data.data.food_type.charAt(0).toUpperCase() + data.data.food_type.slice(1)}
                                        </h4>
                                    </div>
                                    <div className="border-b border-black pb-2 w-2/3">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Feeding Frequency</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {data.data.feeding_cycle} times each day
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center mb-8">
                                    <div className="rounded-lg min-w-[57px] min-h-[57px] bg-[#DAD3FE] flex items-center justify-center">
                                        <Image src="/pictures/food_ratio.png" alt="budget" width={30} height={30} />
                                    </div>
                                    <div className="border-b border-black pb-2 w-1/3">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Main Feed Ratio</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {data.data.food_ratio} %
                                        </h4>
                                    </div>
                                    <div className="border-b border-black pb-2 w-2/3">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Alternative Feed Ratio</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {100 - data.data.food_ratio} %
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center mb-8">
                                    <div className="rounded-lg min-w-[57px] min-h-[57px] bg-[#DAD3FE] flex items-center justify-center">
                                        <Image src="/pictures/food_ratio.png" alt="budget" width={30} height={30} />
                                    </div>
                                    <div className="border-b border-black w-full pb-2">
                                        <h3 className="font-[Poppins] font-semibold text-md mb-1">Seeds</h3>
                                        <h4 className="font-[Poppins] text-sm">
                                        {data.data.total_seeds} kg
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <div className={`rounded-lg w-full min-h-[57px] ${bgColor} flex items-center gap-10 justify-left p-7`}>
                                        <Image src="/pictures/result.png" alt="budget" width={90} height={90} />
                                    
                                        <div className="w-3/4">
                                            <h3 className="font-[Poppins] text-2xl font-bold text-md mb-1">
                                                {resultTitle}
                                            </h3>
                                            <h4 className="font-[Poppins] text-md">
                                                {resultText}
                                            </h4>
                                        </div>

                                    </div>
                                </div>
                            </>
                        ):(
                            <>
                                <div>
                                    Let&apos;s jump into the prediction page.
                                    <div onClick={() => (router.push('/dashboard/prediction'))} className="cursor-pointer text-white flex items-center justify-center font-[Poppins] font-medium mt-3 rounded-lg h-[40px] w-[120px] bg-[#245A78]">
                                        Get Started
                                    </div>
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