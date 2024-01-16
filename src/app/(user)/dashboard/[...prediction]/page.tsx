'use client'

type PredictionProps = {
    params: {
        prediction: string,
    }
}

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PredictionPage(
    props: PredictionProps,
) {
    const { params } = props
    const router = useRouter()

    const [ predictionScore, setPredictionScore ] = useState<any>()
    const [ isLoading, setIsLoading ] = useState(false)


    let fish_gurame: any, fish_lele: any, fish_nila: any,
        land_type_beton: any, land_type_ember: any,
        land_type_terpal: any, food_type_maggot: any,
        food_type_pelet: any, feeding_cycle: any,
        land_area: any, seeds: any, budget: any

    const handleLandArea = (e: any) => {
        e.preventDefault()

        router.push(`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${e.target.land_area.value}`)
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
            land_area = params.prediction[3]
        }
    
        if(params.prediction[4]) {
            if(params.prediction[4] === 'pellet') {
                food_type_maggot = 0
                food_type_pelet = 1
            }
            else if(params.prediction[4] === 'maggot') {
                food_type_maggot = 1
                food_type_pelet = 0
            }
            else {
                router.push('/dashboard/prediction')
            }
        }
    
        if(params.prediction[5]) {
            if(params.prediction[5] === '2') {
                feeding_cycle = 2
            }
            else if(params.prediction[5] === '3') {
                feeding_cycle = 3
            }
            else {
                router.push('/dashboard/prediction')
            }
        }

        if(params.prediction[6]) {
            budget = params.prediction[6]
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prediction`, {
			method: 'POST',
			body: JSON.stringify({
				land_area: land_area,
                total_seeds: e.target.seeds.value,
                budget: budget,	
                feeding_cycle: feeding_cycle,
                fish_gurame: fish_gurame,
                fish_lele: fish_lele,
                fish_nila: fish_nila,
                land_type_beton: land_type_beton,
                land_type_ember: land_type_ember,
                land_type_terpal: land_type_terpal,
                food_type_maggot: food_type_maggot,
                food_type_pelet: food_type_pelet
			})
		})
        if(res.status === 200) {
            console.log(res.json().then((data) => {
                console.log(data)

                setPredictionScore(data.data)
                setIsLoading(false)

                // router.push(`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/${params.prediction[5]}/${params.prediction[6]}/${e.target.seeds.value}/result`)
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
                <Image alt="banner" src="/pictures/auth-logo.png" width={62} height={53} />
                e-Waku
            </div>
            <div className="flex w-full px-36">
                {!params.prediction[1] && params.prediction[0] && (
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

                {!params.prediction[4] && params.prediction[3] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-4.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">Which type of feed will you use?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The type of feed you choose will determine the cost of fish farming.</h6>
                        
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/pellet`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Pellet</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/maggot`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Maggot</div></Link>
                    </div>
                    </>
                )}

                {!params.prediction[5] && params.prediction[4] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-5.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">How often do you feed your fish in a day?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The feeding frequency you choose will affect the cost of fish farming.</h6>
                        
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/2`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">2x</div></Link>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/3`}><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">3x</div></Link>
                    </div>
                    </>
                )}

                {!params.prediction[6] && params.prediction[5] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-6.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">How much money will you spend for this fish farming project?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">Your budget will determine all aspects of your fish farming, from the type of fish to the type of feed.</h6>

                        <form method="post" onSubmit={(e) => (handleBudget(e))}>
                            <div className="flex items-center justify-right w-full h-20 bg-[#E3EDF8] font-semibold my-5 pl-10 pr-5 font-semibold">Rp 
                                <input name="budget" type="text" className="flex items-center justify-left w-full h-20 bg-[#E3EDF8] font-semibold my-5 ml-7 mr-5 pl-3 font-semibold" placeholder="Your budget here" />
                                <button type="submit"><Image src="/pictures/kuis-next.png" alt="next button" width={73} height={73} /></button>
                            </div>
                        </form>    
                    </div>
                    </>
                )}

                {!params.prediction[7] && params.prediction[6] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-6.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">How many fish seeds would you like for your farm?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">The total fish seeds will affect on your feed levels.</h6>
                        
                        <form method="post" onSubmit={(e) => (handleSubmit(e))}>
                            <div className="flex items-center justify-right w-full h-20 bg-[#E3EDF8] font-semibold my-5 pr-5 font-semibold">
                                <input name="seeds" type="text" className="flex items-center justify-left w-full h-20 bg-[#E3EDF8] font-semibold my-5 mr-5 pl-3 font-semibold" placeholder="Total fish seeds" />
                                <button type="submit"><Image src="/pictures/kuis-next.png" alt="next button" width={73} height={73} /></button>
                            </div>
                        </form>

                        {isLoading ? ('Please wait...') : (predictionScore && 
                        <>
                            <h3 className="font-[Poppins] font-semibold text-xl mt-10">{predictionScore.result && <>Your success probability is: {predictionScore.result.toUpperCase()}</>}</h3>
                            <h6 className="font-[Poppins] text-sm max-w-lg my-1">{predictionScore.score && <>This prediction is {(predictionScore.score * 100).toFixed(2)}% accurate</>}</h6>
                        </>)
                        }
                    </div>
                    </>
                )}
            </div>
        </>
    )
}