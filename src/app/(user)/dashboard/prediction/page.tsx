'use client'

import { useState } from "react"

export default function PredictionPage() {

    const [prediction, setPrediction] = useState(0)

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

    }

    return (
        <>
            <div>
                <button onClick={(e) => (handleSubmit(e))}>Click me</button>
                {prediction && (
                    <div>
                        <p>Prediction:</p>
                        {prediction}
                    </div>
                )}
            </div>
        </>
    )
}