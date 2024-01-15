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

    const [prediction, setPrediction] = useState(0)

    let fish_gurame, fish_lele, fish_nila,
        land_type_beton, land_type_ember,
        land_type_terpal, food_type_maggot,
        food_type_pelet

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



    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prediction`, {
			method: 'POST',
			body: JSON.stringify({
                land_area: 40,
                total_seeds: 500,
                budget: 500000,	
                feeding_cycle: 2,
                fish_gurame: 0,
                fish_lele: 1,
                fish_nila: 0,
                land_type_beton: 0,
                land_type_ember: 1,
                land_type_terpal: 0,
                food_type_maggot: 0,
                food_type_pelet: 1
				// land_area: e.target.land_area.value,
                // total_seeds: e.target.total_seeds.value,
                // budget: e.target.budget.value,	
                // feeding_cycle: e.target.feeding_cycle.value,
                // fish_gurame: e.target.fish_gurame.value,
                // fish_lele: e.target.fish_lele.value,
                // fish_nila: e.target.fish_nila.value,
                // land_type_beton: e.target.land_type_beton.value,
                // land_type_ember: e.target.land_type_ember.value,
                // land_type_terpal: e.target.land_type_terpal.value,
                // food_type_maggot: e.target.food_type_maggot.value,
                // food_type_pelet: e.target.food_type_pelet.value
			})
		})
        if(res.status === 200) {
            console.log(res.json().then((data) => {
                console.log(data)
                setPrediction(data.data)
            }))
        }
        else {
            console.log(res.json().then((data) => {
                console.log(data)
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
                        
                        <div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">Fill here in (m^2)</div>
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
                        
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/2`}></Link><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">2x</div>
                        <Link href={`/dashboard/prediction/${params.prediction[1]}/${params.prediction[2]}/${params.prediction[3]}/${params.prediction[4]}/3`}></Link><div className="flex items-center justify-center w-full h-20 bg-[#E3EDF8] font-semibold my-5">3x</div>
                    </div>
                    </>
                )}

                {!params.prediction[6] && params.prediction[5] && (
                    <>
                    <Image alt="banner" src="/pictures/kuis-banner-6.png" width={400} height={598} />
                    <div className="w-full py-12 pl-28">
                        <h3 className="font-[Poppins] font-semibold text-xl mb-8">How much money will you spend for this fish farming project?</h3>
                        <h6 className="font-[Poppins] text-sm max-w-lg my-8">Your budget will determine all aspects of your fish farming, from the type of fish to the type of feed.</h6>
                        
                        <div className="flex items-center justify-left w-full h-20 bg-[#E3EDF8] font-semibold my-5 pl-10 font-semibold">Rp</div>
                    </div>
                    </>
                )}
            </div>
        </>
    )
}