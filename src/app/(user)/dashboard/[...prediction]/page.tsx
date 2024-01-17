'use client'

/*
    [1]: fish type
        lele : 25.469,55
        gurame : 48.481,54
        nila : 33.475,25
    [2]: pond type
    [3]: pond size
    [4]: how many ponds do you have?
    [5]: is your place lack of water?
    [6]: food type
    [7]: alternative food type (using constant variable)
    if [7] yes:
        [8]: percentage of food + percentage of alternative food
    if [7] no:
        [8]: 100% percentage of food
    [9]: how many feeding per day
    [10]: how much kg for seeds
    [11]: how much budget do you have
*/

type PredictionProps = {
    params: {
        prediction: string,
    }
}

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function PredictionPage(
    props: PredictionProps,
) {
    const { params } = props
    const router = useRouter()

    const { data: session, status }: { data: any, status: string, } = useSession()

    useEffect(() => {
        if(status === 'unauthenticated') {
            router.push('/login')
        }
        else {
            if(session !== undefined && session?.user.type === 'free') {
                router.push('/dashboard')
            }
        }
    }, [router, session?.user.type, status, session])

    const [ predictionScore, setPredictionScore ] = useState<any>()
    const [ isLoading, setIsLoading ] = useState(false)


    let fish_gurame: any, fish_lele: any, fish_nila: any,
        land_type_beton: any, land_type_ember: any,
        land_type_terpal: any, food_type_lp1: any = 0, 
        food_type_lp2: any = 0, food_type_lp3: any = 0,
        food_type_hiprovite_781: any = 0,
        food_type_hiprovite_781_1: any = 0,
        food_type_hiprovite_781_2: any = 0,
        food_type_hiprovite_782: any = 0,
        feeding_cycle: any,
        land_area: any, seeds: any, budget: any,
        total_ponds: any, poor_water: any, food_ratio: any

    const handleLandArea = (e: any) => {
        e.preventDefault()

        router.push(`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${e.target.land_area.value}`)
    }

    const handleAlternativeFood = (e: any) => {
        e.preventDefault()

        router.push(`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/${params.prediction[6]}/${e.target.food_ratio.value}`)
    }

    const handleSeeds = (e: any) => {
        e.preventDefault()

        router.push(`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/${params.prediction[6]}/${params.prediction[7]}/${params.prediction[8]}/${e.target.seeds.value}`)
    }

    const handleBudget = (e: any) => {
        e.preventDefault()

        router.push(`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/${e.target.budget.value}`)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setIsLoading(true)

        if(params.prediction[1]) {
            if(params.prediction[1] === 'catfish') {
                fish_gurame = 0
                fish_nila = 0
                fish_lele = 1
            }
            else if(params.prediction[1] === 'gourame') {
                fish_gurame = 1
                fish_nila = 0
                fish_lele = 0
            }
            else if(params.prediction[1] === 'parrot') {
                fish_gurame = 0
                fish_nila = 1
                fish_lele = 0
            }
            else {
                router.push('/dashboard/prediction')
            }
        }
    
        if(params.prediction[2]) {
            if(params.prediction[2] === 'terpaulin') {
                land_type_beton = 0
                land_type_ember = 0
                land_type_terpal = 1
            }
            else if(params.prediction[2] === 'concrete') {
                land_type_beton = 1
                land_type_ember = 0
                land_type_terpal = 0
            }
            else if(params.prediction[2] === 'bucket') {
                land_type_beton = 0
                land_type_ember = 1
                land_type_terpal = 0
            }
            else {
                router.push('/dashboard/prediction')
            }
        }

        if(params.prediction[3]) {
            land_area = Number(params.prediction[3])
        }
    
        if(params.prediction[4]) {
            total_ponds = Number(params.prediction[4])
        }

        if(params.prediction[5]) {
            poor_water = Number(params.prediction[5])
        }
    
        if(params.prediction[6]) {
            if(params.prediction[6] === 'lp1') {
                food_type_lp1 = 1
            }
            else if(params.prediction[6] === 'lp2') {
                food_type_lp2 = 1
            }
            else if(params.prediction[6] === 'lp3') {
                food_type_lp3 = 1
            }
            else if(params.prediction[6] === 'hi-pro-vite-781') {
                food_type_hiprovite_781 = 1
            }
            else if(params.prediction[6] === 'hi-pro-vite-781-1') {
                food_type_hiprovite_781_1 = 1
            }
            else if(params.prediction[6] === 'hi-pro-vite-781-2') {
                food_type_hiprovite_781_2 = 1
            }
            else if(params.prediction[6] === 'hi-pro-vite-782') {
                food_type_hiprovite_782 = 1
            }
            else {
                router.push('/dashboard/prediction')
            }
        }

        if(params.prediction[7]) {
            food_ratio = Number(params.prediction[7])
        }

        if(params.prediction[8]) {
            feeding_cycle = Number(params.prediction[8])
        }

        if(params.prediction[9]) {
            seeds = Number(params.prediction[9])
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prediction`, {
			method: 'POST',
			body: JSON.stringify({
                email: session.user.email,
                fish_type: params.prediction[1],
                land_type: params.prediction[2],
                land_area: Number(params.prediction[3]),
                food_type: params.prediction[6],

                food_ratio: food_ratio,
                total_seeds: seeds,
                budget: Number(e.target.budget.value),	
                fish_gurame: fish_gurame,
                fish_lele: fish_lele,
                fish_nila: fish_nila,
                land_type_beton: land_type_beton,
                land_type_ember: land_type_ember,
                land_type_terpal: land_type_terpal,
                food_type_lp1: food_type_lp1,
                food_type_lp2: food_type_lp2,
                food_type_lp3: food_type_lp3,
                food_type_hiprovite_781: food_type_hiprovite_781,
                food_type_hiprovite_781_1: food_type_hiprovite_781_1,
                food_type_hiprovite_781_2: food_type_hiprovite_781_2,
                food_type_hiprovite_782: food_type_hiprovite_782,
                total_ponds: total_ponds,
                poor_water: poor_water,
                feeding_cycle: feeding_cycle,
			})
		})
        if(res.status === 200) {
            console.log(res.json().then((data) => {
                console.log(data)

                setPredictionScore(data.data)
                setIsLoading(false)

                // router.push(`/dashboard`)
            }))
        }
        else {
            console.log(res.json().then((data) => {
                console.log(data)
                setIsLoading(false)
            }))
        }
    }

    return (
        <>
            <div className="px-10 gap-3 w-full h-16 flex items-center justify-left font-[Kadwa]">
                <Image alt="banner" src="/pictures/auth-logo.png" width={30} height={30} />
                e-Waku
            </div>
            <div className="flex w-full px-36">
                {/* fish type */}
                {!params.prediction[1] && params.prediction[0] == 'prediction' && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">What fish species are you considering?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The type of fish you choose will affect the size of the pond, the type of pond, the type of feed, and the feeding schedule.</h6>
                        
                        <Link href="/dashboard/prediction/catfish"><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Catfish</div></Link>
                        <Link href="/dashboard/prediction/gourame"><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Gourame fish</div></Link>
                        <Link href="/dashboard/prediction/parrot"><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Parrot fish</div></Link>
                    </div>
                    </>
                )}

                {/* pond type */}
                {!params.prediction[2] && params.prediction[1] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-2.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">What kind of pond are you planning to use?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The type of fish you choose will affect the size of the pond, the type of pond, the type of feed, and the feeding schedule.</h6>
                        
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/terpaulin`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Terpaulin pond</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/concrete`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Concrete pond</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/bucket`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Bucket pond</div></Link>
                    </div>
                    </>
                )}

                {/* pond size */}
                {!params.prediction[3] && params.prediction[2] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-3.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">What is the size of your fish pond?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The size of the pond you choose will determine the number of fish you can cultivate.</h6>
                        
                        <form method="post" onSubmit={(e) => (handleLandArea(e))}>
                            <div className="flex items-center justify-right w-full h-20 bg-[#E3EDF8] font-semibold my-5 pr-5 font-semibold">
                                <input name="land_area" type="text" className="flex items-center justify-left w-full h-20 bg-[#E3EDF8] font-semibold my-5 mr-5 pl-3 font-semibold" placeholder="Pond size (m^2)" />
                                <button type="submit"><Image src="/pictures/kuis-next.png" alt="next button" width={73} height={73} /></button>
                            </div>
                        </form>      
                    </div>
                    </>
                )}

                {/* total ponds */}
                {!params.prediction[4] && params.prediction[3] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-4.png" className="max-w-[400px] max-h-[598px]" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">How many ponds do you have?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The total of your ponds will increase the success rate of your farm.</h6>
                        
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/0`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">None</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/1`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">1</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/2`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">{'>'} 1</div></Link>
                    </div>
                    </>
                )}

                {/* lack of water */}
                {!params.prediction[5] && params.prediction[4] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-5.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">Does your location experience a shortage of water resources?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">Shortage of water will impact to kind of water that good to be chosen.</h6>
                        
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/1`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Yes</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/0`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">No</div></Link>
                    </div>
                    </>
                )}

                {/* food type */}
                {!params.prediction[6] && params.prediction[5] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-6.png" className="max-w-[400px] max-h-[598px]" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">Which type of feed will you use?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The type of feed you choose will determine the cost of fish farming.</h6>
                        
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/lp1`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">LP-1</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/lp2`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">LP-2</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/lp3`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">LP-3</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/hi-pro-vite-781`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Hi Pro Vite 781</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/hi-pro-vite-781-1`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Hi Pro Vite 781-1</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/hi-pro-vite-781-2`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Hi Pro Vite 781-2</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/hi-pro-vite-782`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Hi Pro Vite 782</div></Link>
                    </div>
                    </>
                )}

                {/* alternative food */}
                {!params.prediction[7] && params.prediction[6] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-7.png" className="max-w-[400px] max-h-[598px]" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">How is the ratio of feed?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The ratio of main feed and alternative feed may impact to success rate and budget estimation.</h6>
                        
                        <form method="post" onSubmit={(e) => (handleAlternativeFood(e))}>
                            <div className="flex items-center justify-right w-full h-20 bg-[#E3EDF8] font-semibold my-5 pr-5 font-semibold">
                                <input name="food_ratio" type="text" className="flex items-center justify-left w-full h-20 bg-[#E3EDF8] font-semibold my-5 mr-5 pl-3 font-semibold" placeholder="Percentage of main feed (integer)" />
                                <button type="submit"><Image src="/pictures/kuis-next.png" alt="next button" width={73} height={73} /></button>
                            </div>
                            <h6 className="font-[Poppins] text-sm max-w-lg my-8">Note: if you fill it with 80, then you will use 20% of alternative food.</h6>
                        </form>  
                    </div>
                    </>
                )}

                {/* feeding cycle */}
                {!params.prediction[8] && params.prediction[7] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-8.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">How often do you feed your fish in a day?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The feeding frequency you choose will affect the cost of fish farming.</h6>
                        
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/${params.prediction[6]}/${params.prediction[7]}/2`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">2x</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/${params.prediction[6]}/${params.prediction[7]}/3`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">3x</div></Link>
                    </div>
                    </>
                )}

                {/* seeds */}
                {!params.prediction[9] && params.prediction[8] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-9.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">How many fish seeds would you like for your farm?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The total fish seeds will affect on your feed levels.</h6>
                        
                        <form method="post" onSubmit={(e) => (handleSeeds(e))}>
                            <div className="flex items-center justify-right w-full h-20 bg-[#E3EDF8] font-semibold my-5 pr-5 font-semibold">
                                <input name="seeds" type="text" className="flex items-center justify-left w-full h-20 bg-[#E3EDF8] font-semibold my-5 mr-5 pl-3 font-semibold" placeholder="Total fish seeds (kg)" />
                                <button type="submit"><Image src="/pictures/kuis-next.png" alt="next button" width={73} height={73} /></button>
                            </div>
                        </form>
                    </div>
                    </>
                )}

                {!params.prediction[10] && params.prediction[9] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-10.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">How much money will you spend for this fish farming project?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">Your budget will determine all aspects of your fish farming, from the type of fish to the type of feed.</h6>

                        <form method="post" onSubmit={(e) => (handleSubmit(e))}>
                            <div className="flex items-center justify-right w-full h-20 bg-[#E3EDF8] font-semibold my-5 pl-10 pr-5 font-semibold">Rp 
                                <input name="budget" type="text" className="flex items-center justify-left w-full h-20 bg-[#E3EDF8] font-semibold my-5 ml-7 mr-5 pl-3 font-semibold" placeholder="Your budget here" />
                                <button type="submit"><Image src="/pictures/kuis-next.png" alt="next button" width={73} height={73} /></button>
                            </div>
                        </form>    
                    </div>
                    </>
                )}
            </div>
        </>
    )
}